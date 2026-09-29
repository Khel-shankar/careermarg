<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db.php';

$pdo = Database::getConnection();
$action = $_GET['action'] ?? 'dashboard_stats';

$raw = file_get_contents("php://input");
$data = json_decode($raw, true) ?: $_POST;

if (!$pdo) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection unavailable."
    ]);
    exit();
}

// 1. DASHBOARD STATS & COHORT OVERVIEW
if ($action === 'dashboard_stats') {
    try {
        // Total Students
        $stmtStudents = $pdo->query("SELECT COUNT(*) AS total FROM `users` WHERE `role` = 'student'");
        $totalStudents = (int) ($stmtStudents->fetch()['total'] ?? 0);

        // Completed Assessments Count
        $stmtCompleted = $pdo->query("
            SELECT COUNT(DISTINCT user_id) AS total 
            FROM `student_assessment_sessions` 
            WHERE `status` = 'completed'
        ");
        $completedCount = (int) ($stmtCompleted->fetch()['total'] ?? 0);

        // Sessions Count
        $stmtSessions = $pdo->query("
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN `status` = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
                SUM(CASE WHEN `status` = 'completed' THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN `status` = 'follow_up_needed' THEN 1 ELSE 0 END) as follow_up
            FROM `counseling_records`
        ");
        $sessionStats = $stmtSessions->fetch();

        // Stream Distribution
        $stmtStreams = $pdo->query("
            SELECT `stream`, COUNT(*) as count 
            FROM `users` 
            WHERE `role` = 'student' AND `stream` IS NOT NULL AND `stream` != ''
            GROUP BY `stream`
            ORDER BY count DESC
        ");
        $streamDist = $stmtStreams->fetchAll();

        // Grade / Class Distribution
        $stmtGrades = $pdo->query("
            SELECT `grade_level`, COUNT(*) as count 
            FROM `users` 
            WHERE `role` = 'student'
            GROUP BY `grade_level`
            ORDER BY count DESC
        ");
        $gradeDist = $stmtGrades->fetchAll();

        // RIASEC Average Distribution across assessed students
        $stmtTraitRows = $pdo->query("SELECT `riasec_scores_json` FROM `student_trait_scores` WHERE `riasec_scores_json` IS NOT NULL");
        $riasecSums = ['R' => 0, 'I' => 0, 'A' => 0, 'S' => 0, 'E' => 0, 'C' => 0];
        $riasecCount = 0;
        while ($row = $stmtTraitRows->fetch()) {
            $scores = json_decode($row['riasec_scores_json'] ?? '{}', true);
            if (is_array($scores) && count($scores) > 0) {
                $riasecCount++;
                foreach ($riasecSums as $k => $v) {
                    $riasecSums[$k] += floatval($scores[$k] ?? 50);
                }
            }
        }
        $riasecAverages = [];
        foreach ($riasecSums as $k => $v) {
            $riasecAverages[$k] = $riasecCount > 0 ? round($v / $riasecCount) : 70;
        }

        // Recent Counseling Records
        $stmtRecent = $pdo->query("
            SELECT cr.*, u.full_name as student_name, u.email as student_email, u.grade_level as student_grade, u.school_name
            FROM `counseling_records` cr
            LEFT JOIN `users` u ON cr.student_id = u.id
            ORDER BY cr.session_date DESC
            LIMIT 6
        ");
        $recentSessions = $stmtRecent->fetchAll();

        // Students Needing Follow-up or at-risk (no assessments done or status follow_up_needed)
        $stmtNeedsAttention = $pdo->query("
            SELECT u.id, u.full_name, u.email, u.grade_level, u.school_name, u.created_at,
                   (SELECT COUNT(*) FROM `student_assessment_sessions` s WHERE s.user_id = u.id AND s.status = 'completed') as completed_tests
            FROM `users` u
            WHERE u.role = 'student'
            HAVING completed_tests = 0
            ORDER BY u.created_at DESC
            LIMIT 5
        ");
        $needsAttention = $stmtNeedsAttention->fetchAll();

        echo json_encode([
            "success" => true,
            "data" => [
                "totalStudents" => max($totalStudents, 1),
                "completedAssessments" => $completedCount,
                "pendingAssessments" => max(0, $totalStudents - $completedCount),
                "counselingSessions" => [
                    "total" => (int)($sessionStats['total'] ?? 0),
                    "scheduled" => (int)($sessionStats['scheduled'] ?? 0),
                    "completed" => (int)($sessionStats['completed'] ?? 0),
                    "followUp" => (int)($sessionStats['follow_up'] ?? 0),
                ],
                "streamDistribution" => $streamDist,
                "gradeDistribution" => $gradeDist,
                "riasecAverages" => $riasecAverages,
                "recentSessions" => $recentSessions,
                "needsAttention" => $needsAttention
            ]
        ]);
        exit();
    } catch (\PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }
}

// 2. STUDENTS ROSTER (List with search, filtering, and psychometric summaries)
if ($action === 'students_roster') {
    $search = trim($_GET['search'] ?? '');
    $grade = trim($_GET['grade'] ?? 'all');
    $status = trim($_GET['status'] ?? 'all');

    try {
        $sql = "
            SELECT 
                u.id, u.full_name, u.email, u.grade_level, u.school_name, u.stream, u.city,
                u.role_model_name, u.aspiration, u.saved_careers, u.finalized_career, u.created_at,
                t.holland_code, t.riasec_scores_json, t.tamanna_scores_json,
                (SELECT COUNT(*) FROM `student_assessment_sessions` s WHERE s.user_id = u.id AND s.status = 'completed') as completed_tests_count,
                (SELECT cr.status FROM `counseling_records` cr WHERE cr.student_id = u.id ORDER BY cr.session_date DESC LIMIT 1) as latest_counsel_status,
                (SELECT cr.session_date FROM `counseling_records` cr WHERE cr.student_id = u.id ORDER BY cr.session_date DESC LIMIT 1) as latest_counsel_date,
                (SELECT cr.counselor_notes FROM `counseling_records` cr WHERE cr.student_id = u.id ORDER BY cr.session_date DESC LIMIT 1) as latest_counsel_note,
                (SELECT cm.matches_json FROM `student_career_matches` cm WHERE cm.user_id = u.id LIMIT 1) as career_matches_json
            FROM `users` u
            LEFT JOIN `student_trait_scores` t ON u.id = t.user_id
            WHERE u.role = 'student'
        ";
        $params = [];

        if (!empty($search)) {
            $sql .= " AND (u.full_name LIKE ? OR u.email LIKE ? OR u.school_name LIKE ? OR u.city LIKE ?)";
            $term = "%$search%";
            $params[] = $term;
            $params[] = $term;
            $params[] = $term;
            $params[] = $term;
        }

        if ($grade !== 'all' && !empty($grade)) {
            $sql .= " AND (u.grade_level = ? OR u.grade_level = ?)";
            $params[] = $grade;
            $params[] = "class_" . $grade;
        }

        $sql .= " ORDER BY u.created_at DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $students = [];
        foreach ($rows as $r) {
            $saved = json_decode($r['saved_careers'] ?? '[]', true) ?: [];
            $matches = json_decode($r['career_matches_json'] ?? '[]', true) ?: [];
            $riasec = json_decode($r['riasec_scores_json'] ?? '{}', true) ?: [];
            $tamanna = json_decode($r['tamanna_scores_json'] ?? '{}', true) ?: [];

            $completedTests = (int)($r['completed_tests_count'] ?? 0);
            $assessmentStatus = ($completedTests >= 2) ? 'Completed (RIASEC + Aptitude)' : (($completedTests === 1) ? 'RIASEC Done (In Progress)' : 'Not Started');

            // Clean display email
            $dispEmail = $r['email'];
            if (strpos($dispEmail, '@mobile.careermarg.org') !== false) {
                $dispEmail = str_replace('@mobile.careermarg.org', '', $dispEmail);
            }

            $students[] = [
                "id" => $r['id'],
                "name" => $r['full_name'],
                "email" => $dispEmail,
                "grade" => $r['grade_level'],
                "school" => $r['school_name'] ?: 'Government High School',
                "stream" => $r['stream'] ?: 'general',
                "city" => $r['city'] ?: '',
                "aspiration" => $r['aspiration'] ?: '',
                "roleModel" => $r['role_model_name'] ?: '',
                "hollandCode" => $r['holland_code'] ?: ($completedTests > 0 ? 'IES' : '—'),
                "riasecScores" => $riasec,
                "tamannaScores" => $tamanna,
                "completedTestsCount" => $completedTests,
                "assessmentStatus" => $assessmentStatus,
                "savedCareersCount" => count($saved),
                "savedCareers" => $saved,
                "finalizedCareer" => $r['finalized_career'],
                "topCareerMatches" => array_slice($matches, 0, 3),
                "latestCounselStatus" => $r['latest_counsel_status'] ?: 'No Session Logged',
                "latestCounselDate" => $r['latest_counsel_date'] ?: null,
                "latestCounselNote" => $r['latest_counsel_note'] ?: '',
                "createdAt" => $r['created_at']
            ];
        }

        echo json_encode([
            "success" => true,
            "count" => count($students),
            "students" => $students
        ]);
        exit();
    } catch (\PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }
}

// 3. STUDENT DETAIL (Full diagnostic deep-dive for counselor view)
if ($action === 'student_detail') {
    $studentId = trim($_GET['student_id'] ?? $data['student_id'] ?? '');
    if (empty($studentId)) {
        echo json_encode(["success" => false, "message" => "student_id parameter required."]);
        exit();
    }

    try {
        // User profile
        $stmtUser = $pdo->prepare("SELECT * FROM `users` WHERE `id` = ? OR `email` = ?");
        $stmtUser->execute([$studentId, $studentId]);
        $user = $stmtUser->fetch();

        if (!$user) {
            echo json_encode(["success" => false, "message" => "Student not found in database."]);
            exit();
        }

        // Sessions
        $stmtSessions = $pdo->prepare("SELECT * FROM `student_assessment_sessions` WHERE `user_id` = ?");
        $stmtSessions->execute([$user['id']]);
        $sessions = $stmtSessions->fetchAll();

        // Traits
        $stmtTraits = $pdo->prepare("SELECT * FROM `student_trait_scores` WHERE `user_id` = ?");
        $stmtTraits->execute([$user['id']]);
        $traits = $stmtTraits->fetch();

        // Career matches
        $stmtMatches = $pdo->prepare("SELECT * FROM `student_career_matches` WHERE `user_id` = ?");
        $stmtMatches->execute([$user['id']]);
        $matches = $stmtMatches->fetch();

        // Counseling records
        $stmtCounsel = $pdo->prepare("SELECT * FROM `counseling_records` WHERE `student_id` = ? ORDER BY `session_date` DESC");
        $stmtCounsel->execute([$user['id']]);
        $counselingHistory = $stmtCounsel->fetchAll();

        echo json_encode([
            "success" => true,
            "student" => [
                "id" => $user['id'],
                "name" => $user['full_name'],
                "email" => $user['email'],
                "grade" => $user['grade_level'],
                "school" => $user['school_name'],
                "city" => $user['city'],
                "stream" => $user['stream'],
                "educationStatus" => $user['education_status'],
                "roleModelArchetype" => $user['role_model_archetype'],
                "roleModelName" => $user['role_model_name'],
                "dreamImpact" => $user['dream_impact'],
                "aspiration" => $user['aspiration'],
                "interestTags" => json_decode($user['interest_tags'] ?? '[]', true),
                "workStyle" => $user['work_style'],
                "savedCareers" => json_decode($user['saved_careers'] ?? '[]', true),
                "finalizedCareer" => $user['finalized_career'],
                "createdAt" => $user['created_at']
            ],
            "traits" => $traits ? [
                "hollandCode" => $traits['holland_code'],
                "riasec" => json_decode($traits['riasec_scores_json'] ?? '{}', true),
                "tamanna" => json_decode($traits['tamanna_scores_json'] ?? '{}', true),
                "ocean" => json_decode($traits['ocean_scores_json'] ?? '{}', true),
                "resilience" => json_decode($traits['resilience_scores_json'] ?? '{}', true),
                "allScores" => json_decode($traits['all_scores_json'] ?? '{}', true)
            ] : null,
            "careerMatches" => $matches ? json_decode($matches['matches_json'] ?? '[]', true) : [],
            "counselingHistory" => $counselingHistory,
            "assessmentSessions" => $sessions
        ]);
        exit();
    } catch (\PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }
}

// 4. SAVE COUNSELOR NOTE & RECOMMENDATIONS
if ($action === 'save_note' || $action === 'schedule_session') {
    $studentId = trim($data['student_id'] ?? '');
    $counselorId = trim($data['counselor_id'] ?? 'counselor_demo');
    $counselorName = trim($data['counselor_name'] ?? 'Dr. Sunita Sharma');
    $sessionDate = trim($data['session_date'] ?? date('Y-m-d H:i:s'));
    $sessionTopic = trim($data['session_topic'] ?? 'Career Guidance & Stream Selection');
    $status = trim($data['status'] ?? 'completed');
    $notes = trim($data['counselor_notes'] ?? $data['notes'] ?? '');
    $recommendedStream = trim($data['recommended_stream'] ?? '');
    $actionItems = trim($data['action_items'] ?? '');
    $parentContacted = !empty($data['parent_contacted']) ? 1 : 0;
    $recordId = !empty($data['id']) ? (int)$data['id'] : null;

    if (empty($studentId)) {
        echo json_encode(["success" => false, "message" => "Student ID is required."]);
        exit();
    }

    try {
        if ($recordId) {
            $upd = $pdo->prepare("
                UPDATE `counseling_records` 
                SET `session_date` = ?, `session_topic` = ?, `status` = ?, `counselor_notes` = ?, 
                    `recommended_stream` = ?, `action_items` = ?, `parent_contacted` = ?, `updated_at` = CURRENT_TIMESTAMP
                WHERE `id` = ? AND (`student_id` = ? OR `counselor_id` = ?)
            ");
            $upd->execute([$sessionDate, $sessionTopic, $status, $notes, $recommendedStream, $actionItems, $parentContacted, $recordId, $studentId, $counselorId]);
            $msg = "🎉 Counseling record updated successfully!";
        } else {
            $ins = $pdo->prepare("
                INSERT INTO `counseling_records` 
                (`student_id`, `counselor_id`, `counselor_name`, `session_date`, `session_topic`, `status`, `counselor_notes`, `recommended_stream`, `action_items`, `parent_contacted`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $ins->execute([$studentId, $counselorId, $counselorName, $sessionDate, $sessionTopic, $status, $notes, $recommendedStream, $actionItems, $parentContacted]);
            $msg = ($status === 'scheduled') 
                ? "📅 1:1 Counseling session scheduled successfully!" 
                : "🎉 Counseling notes & recommendations saved live to database!";
        }

        // Fetch refreshed counseling history for this student
        $stmtHistory = $pdo->prepare("SELECT * FROM `counseling_records` WHERE `student_id` = ? ORDER BY `session_date` DESC");
        $stmtHistory->execute([$studentId]);
        $history = $stmtHistory->fetchAll();

        echo json_encode([
            "success" => true,
            "message" => $msg,
            "counselingHistory" => $history
        ]);
        exit();
    } catch (\PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }
}

// Fallback
echo json_encode([
    "success" => true,
    "status" => "Counselor API Active"
]);
