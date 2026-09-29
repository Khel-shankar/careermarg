<?php
require_once __DIR__ . '/db.php';

$pdo = Database::getConnection();
$action = $_GET['action'] ?? 'sync';

// Set UTF-8 encoding
if ($pdo) {
    $pdo->exec("SET NAMES utf8mb4");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    if (!$data) {
        echo json_encode(["success" => false, "message" => "Invalid JSON payload"]);
        exit();
    }

    if (!$pdo) {
        echo json_encode([
            "success" => true,
            "offline" => true,
            "message" => "MySQL connection unavailable. Data safely saved in LocalStorage."
        ]);
        exit();
    }

    try {
        $userId = $data['userId'] ?? 'usr-demo-1';
        $userEmail = $data['email'] ?? "student_{$userId}@careermarg.org";
        $userName = $data['name'] ?? 'Student';
        $grade = $data['grade'] ?? '10';
        $school = $data['school'] ?? 'Government High School';
        $educationStatus = $data['educationStatus'] ?? 'pursuing';
        $city = $data['city'] ?? '';
        $stream = $data['stream'] ?? 'general';
        $roleModelArchetype = $data['roleModelArchetype'] ?? 'tech';
        $roleModelName = $data['roleModelName'] ?? '';
        $dreamImpact = $data['dreamImpact'] ?? '';
        $aspiration = $data['aspiration'] ?? '';
        $workStyle = $data['workStyle'] ?? 'analytical';
        $interests = json_encode($data['interestTags'] ?? [], JSON_UNESCAPED_UNICODE);
        $savedCareers = json_encode($data['savedCareers'] ?? [], JSON_UNESCAPED_UNICODE);
        $finalizedCareer = $data['finalizedCareer'] ?? null;

        // 1. Upsert User Profile (1 row per student in `users`)
        $stmt = $pdo->prepare("
            INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `full_name`, `grade_level`, `school_name`, `education_status`, `city`, `stream`, `role_model_archetype`, `role_model_name`, `dream_impact`, `aspiration`, `interest_tags`, `work_style`, `saved_careers`, `finalized_career`)
            VALUES (?, 'student', ?, '\$2y\$10\$demoHashPlaceholder', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                full_name = VALUES(full_name),
                grade_level = VALUES(grade_level),
                school_name = VALUES(school_name),
                education_status = VALUES(education_status),
                city = VALUES(city),
                stream = VALUES(stream),
                role_model_archetype = VALUES(role_model_archetype),
                role_model_name = VALUES(role_model_name),
                dream_impact = VALUES(dream_impact),
                aspiration = VALUES(aspiration),
                interest_tags = VALUES(interest_tags),
                work_style = VALUES(work_style),
                saved_careers = VALUES(saved_careers),
                finalized_career = VALUES(finalized_career)
        ");
        $stmt->execute([
            $userId, $userEmail, $userName, $grade, $school, $educationStatus, $city, $stream,
            $roleModelArchetype, $roleModelName, $dreamImpact, $aspiration, $interests, $workStyle, $savedCareers, $finalizedCareer
        ]);

        // 2. Upsert Assessment Sessions (1 row per tier in `student_assessment_sessions` with all responses JSON)
        $completedTiers = $data['completedTiers'] ?? [];
        $tierAnswers = $data['tierAnswers'] ?? [];

        $tierMetadata = [
            'tier1_riasec' => [
                'title' => 'Interest Inventory (RIASEC)',
                'prefix' => 'ria-',
                'total' => 42,
                'traitKeys' => ['R', 'I', 'A', 'S', 'E', 'C']
            ],
            'tier1_quick_riasec' => [
                'title' => 'Interest Inventory (Quick RIASEC)',
                'prefix' => 'qria-',
                'total' => 24,
                'traitKeys' => ['R', 'I', 'A', 'S', 'E', 'C']
            ],
            'tier2_tamanna' => [
                'title' => 'Aptitude Test [NCERT TAMANNA]',
                'prefix' => 'tam-',
                'total' => 28,
                'traitKeys' => ['TAMANNA_LA', 'TAMANNA_VA', 'TAMANNA_NA', 'TAMANNA_SA', 'TAMANNA_PA', 'TAMANNA_MA', 'TAMANNA_AR']
            ],
            'tier3_ocean' => [
                'title' => 'Personality Test [The Big Five (OCEAN)]',
                'prefix' => 'oce-',
                'total' => 20,
                'traitKeys' => ['OCEAN_O', 'OCEAN_C', 'OCEAN_E', 'OCEAN_A', 'OCEAN_N']
            ],
            'mental_health' => [
                'title' => 'Emotional Resilience & Well-being',
                'prefix' => 'str-',
                'total' => 12,
                'traitKeys' => ['ENABLER_ANXIETY', 'ENABLER_SELF_EFFICACY', 'ENABLER_RESILIENCE']
            ]
        ];

        $sessionStmt = $pdo->prepare("
            INSERT INTO `student_assessment_sessions` 
            (`id`, `user_id`, `tier_code`, `tier_title`, `status`, `total_questions`, `answered_questions`, `score_percentage`, `responses_json`, `tier_scores_json`, `completed_at`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                tier_title = VALUES(tier_title),
                status = VALUES(status),
                total_questions = VALUES(total_questions),
                answered_questions = VALUES(answered_questions),
                score_percentage = VALUES(score_percentage),
                responses_json = VALUES(responses_json),
                tier_scores_json = VALUES(tier_scores_json),
                completed_at = VALUES(completed_at)
        ");

        $allTraitScores = $data['traitScores'] ?? [];

        foreach ($tierMetadata as $tierCode => $meta) {
            $sessionId = "ses_{$userId}_{$tierCode}";
            $isDone = in_array($tierCode, $completedTiers, true);
            $totalQ = $meta['total'];
            $prefix = $meta['prefix'];

            // Extract all answers for this tier into a clean JSON map
            $tierResponses = [];
            if (!empty($tierAnswers) && is_array($tierAnswers)) {
                foreach ($tierAnswers as $qId => $val) {
                    if (str_starts_with($qId, $prefix) && $val !== null && $val !== '') {
                        $tierResponses[$qId] = (string)$val;
                    }
                }
            }

            $answeredCount = count($tierResponses);

            // Extract sub-scores for this tier
            $tierScores = [];
            foreach ($meta['traitKeys'] as $tk) {
                if (isset($allTraitScores[$tk])) {
                    $tierScores[$tk] = (int)$allTraitScores[$tk];
                }
            }

            if ($isDone) {
                $status = 'completed';
                $completedAt = date('Y-m-d H:i:s');
                $scorePct = 100;
            } else if ($answeredCount > 0) {
                $status = 'in_progress';
                $completedAt = null;
                $scorePct = (int)round(($answeredCount / $totalQ) * 100);
            } else {
                continue; // no data yet for this tier
            }

            $sessionStmt->execute([
                $sessionId,
                $userId,
                $tierCode,
                $meta['title'],
                $status,
                $totalQ,
                $answeredCount,
                $scorePct,
                json_encode($tierResponses, JSON_UNESCAPED_UNICODE),
                !empty($tierScores) ? json_encode($tierScores, JSON_UNESCAPED_UNICODE) : null,
                $completedAt
            ]);
        }

        // 3. Upsert Student Trait Scores (1 row per student in `student_trait_scores`)
        if (!empty($allTraitScores) && is_array($allTraitScores)) {
            $riasecGroup = [];
            $tamannaGroup = [];
            $oceanGroup = [];
            $resilienceGroup = [];
            $cleanAllScores = [];

            foreach (['R', 'I', 'A', 'S', 'E', 'C'] as $k) {
                if (isset($allTraitScores[$k])) {
                    $val = (int)$allTraitScores[$k];
                    $riasecGroup[$k] = $val;
                    $cleanAllScores[$k] = $val;
                }
            }

            foreach (['TAMANNA_LA', 'TAMANNA_VA', 'TAMANNA_NA', 'TAMANNA_SA', 'TAMANNA_PA', 'TAMANNA_MA', 'TAMANNA_AR'] as $k) {
                if (isset($allTraitScores[$k])) {
                    $val = (int)$allTraitScores[$k];
                    $tamannaGroup[$k] = $val;
                    $cleanAllScores[$k] = $val;
                }
            }

            foreach (['OCEAN_O', 'OCEAN_C', 'OCEAN_E', 'OCEAN_A', 'OCEAN_N'] as $k) {
                if (isset($allTraitScores[$k])) {
                    $val = (int)$allTraitScores[$k];
                    $oceanGroup[$k] = $val;
                    $cleanAllScores[$k] = $val;
                }
            }

            foreach (['ENABLER_ANXIETY', 'ENABLER_SELF_EFFICACY', 'ENABLER_RESILIENCE'] as $k) {
                if (isset($allTraitScores[$k])) {
                    $val = (int)$allTraitScores[$k];
                    $resilienceGroup[$k] = $val;
                    $cleanAllScores[$k] = $val;
                }
            }

            // Calculate Holland Code from top 3 RIASEC
            arsort($riasecGroup);
            $hollandCode = substr(implode('', array_keys($riasecGroup)), 0, 3);
            if (strlen($hollandCode) < 3) $hollandCode = 'RIA';

            // Top 3 Traits
            arsort($cleanAllScores);
            $topTraits = array_keys($cleanAllScores);
            $top1 = $topTraits[0] ?? '';
            $top2 = $topTraits[1] ?? '';
            $top3 = $topTraits[2] ?? '';

            $scoreStmt = $pdo->prepare("
                INSERT INTO `student_trait_scores` 
                (`user_id`, `holland_code`, `top_trait_1`, `top_trait_2`, `top_trait_3`, `riasec_scores_json`, `tamanna_scores_json`, `ocean_scores_json`, `resilience_scores_json`, `all_scores_json`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    holland_code = VALUES(holland_code),
                    top_trait_1 = VALUES(top_trait_1),
                    top_trait_2 = VALUES(top_trait_2),
                    top_trait_3 = VALUES(top_trait_3),
                    riasec_scores_json = VALUES(riasec_scores_json),
                    tamanna_scores_json = VALUES(tamanna_scores_json),
                    ocean_scores_json = VALUES(ocean_scores_json),
                    resilience_scores_json = VALUES(resilience_scores_json),
                    all_scores_json = VALUES(all_scores_json)
            ");

            $scoreStmt->execute([
                $userId,
                $hollandCode,
                $top1,
                $top2,
                $top3,
                json_encode($riasecGroup, JSON_UNESCAPED_UNICODE),
                json_encode($tamannaGroup, JSON_UNESCAPED_UNICODE),
                json_encode($oceanGroup, JSON_UNESCAPED_UNICODE),
                json_encode($resilienceGroup, JSON_UNESCAPED_UNICODE),
                json_encode($cleanAllScores, JSON_UNESCAPED_UNICODE)
            ]);
        }

        // 4. Upsert Student Career Matches (1 row per student in `student_career_matches`)
        if (!empty($data['careerMatches']) && is_array($data['careerMatches'])) {
            $matches = $data['careerMatches'];
            $totalMatches = count($matches);

            $m1 = $matches[0] ?? null;
            $m2 = $matches[1] ?? null;
            $m3 = $matches[2] ?? null;

            $top1Title = $m1 ? ($m1['title'] ?? '') : '';
            $top1Hi = $m1 ? ($m1['hi'] ?? $m1['title_hi'] ?? $top1Title) : '';
            $top1Fit = $m1 ? (int)($m1['fit'] ?? $m1['match_percentage'] ?? 0) : 0;
            $top1Sector = $m1 ? ($m1['sectorId'] ?? $m1['sector'] ?? 'general') : '';

            $top2Title = $m2 ? ($m2['title'] ?? '') : '';
            $top2Hi = $m2 ? ($m2['hi'] ?? $m2['title_hi'] ?? $top2Title) : '';
            $top2Fit = $m2 ? (int)($m2['fit'] ?? $m2['match_percentage'] ?? 0) : 0;

            $top3Title = $m3 ? ($m3['title'] ?? '') : '';
            $top3Hi = $m3 ? ($m3['hi'] ?? $m3['title_hi'] ?? $top3Title) : '';
            $top3Fit = $m3 ? (int)($m3['fit'] ?? $m3['match_percentage'] ?? 0) : 0;

            // Normalize full matches structure
            $formattedMatches = [];
            $rank = 1;
            foreach ($matches as $m) {
                $cId = $m['id'] ?? $m['career_id'] ?? '';
                if (!$cId) continue;
                $formattedMatches[] = [
                    'rank' => $rank++,
                    'career_id' => $cId,
                    'career_title' => $m['title'] ?? '',
                    'career_title_hi' => $m['hi'] ?? $m['title_hi'] ?? ($m['title'] ?? ''),
                    'sector_id' => $m['sectorId'] ?? $m['sector'] ?? 'general',
                    'match_percentage' => (int)($m['fit'] ?? $m['match_percentage'] ?? 70),
                    'why_reasons' => $m['reasons'] ?? $m['why_reasons'] ?? []
                ];
            }

            $matchesStmt = $pdo->prepare("
                INSERT INTO `student_career_matches` 
                (`user_id`, `top_career_1`, `top_career_1_hi`, `top_career_1_fit`, `top_career_1_sector`, `top_career_2`, `top_career_2_hi`, `top_career_2_fit`, `top_career_3`, `top_career_3_hi`, `top_career_3_fit`, `matches_json`, `total_matches`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    top_career_1 = VALUES(top_career_1),
                    top_career_1_hi = VALUES(top_career_1_hi),
                    top_career_1_fit = VALUES(top_career_1_fit),
                    top_career_1_sector = VALUES(top_career_1_sector),
                    top_career_2 = VALUES(top_career_2),
                    top_career_2_hi = VALUES(top_career_2_hi),
                    top_career_2_fit = VALUES(top_career_2_fit),
                    top_career_3 = VALUES(top_career_3),
                    top_career_3_hi = VALUES(top_career_3_hi),
                    top_career_3_fit = VALUES(top_career_3_fit),
                    matches_json = VALUES(matches_json),
                    total_matches = VALUES(total_matches)
            ");

            $matchesStmt->execute([
                $userId,
                $top1Title, $top1Hi, $top1Fit, $top1Sector,
                $top2Title, $top2Hi, $top2Fit,
                $top3Title, $top3Hi, $top3Fit,
                json_encode($formattedMatches, JSON_UNESCAPED_UNICODE),
                $totalMatches
            ]);
        }

        // 5. Upsert Student Diagnostic Report (1 row per student in `student_reports`)
        if (!empty($data['report']) && is_array($data['report'])) {
            $rep = $data['report'];
            $reportId = "rep_{$userId}";
            $reportCode = "CMR-" . strtoupper(substr(md5($userId . date('Ymd')), 0, 8));
            $hollandCode = $rep['hollandCode'] ?? 'RIA';
            $riasecSummary = json_encode($rep['riasecSummary'] ?? [], JSON_UNESCAPED_UNICODE);
            $tamannaSummary = json_encode($rep['tamannaSummary'] ?? [], JSON_UNESCAPED_UNICODE);
            $oceanSummary = json_encode($rep['oceanSummary'] ?? [], JSON_UNESCAPED_UNICODE);
            $resilienceSummary = json_encode($rep['resilienceSummary'] ?? [], JSON_UNESCAPED_UNICODE);
            $topCareers = json_encode($rep['topCareers'] ?? [], JSON_UNESCAPED_UNICODE);

            $repStmt = $pdo->prepare("
                INSERT INTO `student_reports` (`id`, `user_id`, `report_code`, `holland_code`, `riasec_summary`, `tamanna_summary`, `ocean_summary`, `resilience_summary`, `top_careers`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    report_code = VALUES(report_code),
                    holland_code = VALUES(holland_code),
                    riasec_summary = VALUES(riasec_summary),
                    tamanna_summary = VALUES(tamanna_summary),
                    ocean_summary = VALUES(ocean_summary),
                    resilience_summary = VALUES(resilience_summary),
                    top_careers = VALUES(top_careers),
                    generated_at = CURRENT_TIMESTAMP
            ");
            $repStmt->execute([
                $reportId, $userId, $reportCode, $hollandCode, $riasecSummary, $tamannaSummary, $oceanSummary, $resilienceSummary, $topCareers
            ]);
        }

        echo json_encode([
            "success" => true,
            "offline" => false,
            "message" => "All data synchronized live to optimized MySQL database!"
        ], JSON_UNESCAPED_UNICODE);

    } catch (\Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "Database sync error: " . $e->getMessage()
        ]);
    }
    exit();
}

// GET request: retrieve full student data from optimized tables
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'status') {
        if (!$pdo) {
            echo json_encode(["success" => false, "connected" => false, "message" => "MySQL Offline"]);
            exit();
        }
        $stats = [
            "users" => (int)$pdo->query("SELECT COUNT(*) FROM users")->fetchColumn(),
            "assessments" => (int)$pdo->query("SELECT COUNT(*) FROM assessments")->fetchColumn(),
            "questions" => (int)$pdo->query("SELECT COUNT(*) FROM assessment_questions")->fetchColumn(),
            "careers" => (int)$pdo->query("SELECT COUNT(*) FROM careers")->fetchColumn(),
            "assessment_sessions" => (int)$pdo->query("SELECT COUNT(*) FROM student_assessment_sessions")->fetchColumn(),
            "trait_scores" => (int)$pdo->query("SELECT COUNT(*) FROM student_trait_scores")->fetchColumn(),
            "career_matches" => (int)$pdo->query("SELECT COUNT(*) FROM student_career_matches")->fetchColumn(),
            "reports" => (int)$pdo->query("SELECT COUNT(*) FROM student_reports")->fetchColumn(),
        ];
        echo json_encode(["success" => true, "connected" => true, "stats" => $stats], JSON_UNESCAPED_UNICODE);
        exit();
    }

    $userId = $_GET['userId'] ?? 'usr-demo-1';

    if (!$pdo) {
        echo json_encode(["success" => false, "offline" => true, "message" => "Database offline"]);
        exit();
    }

    try {
        // 1. Fetch user
        $uStmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $uStmt->execute([$userId]);
        $user = $uStmt->fetch();

        // 2. Fetch trait scores from single student row
        $sStmt = $pdo->prepare("SELECT all_scores_json FROM student_trait_scores WHERE user_id = ?");
        $sStmt->execute([$userId]);
        $scoreRow = $sStmt->fetch();
        $scores = [];
        if ($scoreRow && !empty($scoreRow['all_scores_json'])) {
            $scores = json_decode($scoreRow['all_scores_json'], true) ?: [];
        }

        // 3. Fetch test sessions & merge all question answers
        $sesStmt = $pdo->prepare("SELECT tier_code, status, score_percentage, responses_json FROM student_assessment_sessions WHERE user_id = ?");
        $sesStmt->execute([$userId]);
        $sessionRows = $sesStmt->fetchAll();
        $completedTiers = [];
        $tierAnswers = [];
        foreach ($sessionRows as $sr) {
            if ($sr['status'] === 'completed') {
                $completedTiers[] = $sr['tier_code'];
            }
            if (!empty($sr['responses_json'])) {
                $answers = json_decode($sr['responses_json'], true) ?: [];
                foreach ($answers as $qId => $val) {
                    $tierAnswers[$qId] = (string)$val;
                }
            }
        }

        // 4. Fetch career matches from single student row
        $cmStmt = $pdo->prepare("SELECT matches_json FROM student_career_matches WHERE user_id = ?");
        $cmStmt->execute([$userId]);
        $cmRow = $cmStmt->fetch();
        $careerMatches = [];
        if ($cmRow && !empty($cmRow['matches_json'])) {
            $careerMatches = json_decode($cmRow['matches_json'], true) ?: [];
        }

        // 5. Fetch report from single student row
        $repStmt = $pdo->prepare("SELECT * FROM student_reports WHERE user_id = ? ORDER BY generated_at DESC LIMIT 1");
        $repStmt->execute([$userId]);
        $report = $repStmt->fetch();

        // 6. Decode saved careers
        $savedCareers = [];
        if ($user && !empty($user['saved_careers'])) {
            $savedCareers = is_array($user['saved_careers']) ? $user['saved_careers'] : (json_decode($user['saved_careers'], true) ?: []);
        }

        echo json_encode([
            "success" => true,
            "user" => $user,
            "savedCareers" => $savedCareers,
            "finalizedCareer" => $user['finalized_career'] ?? null,
            "scores" => $scores,
            "completedTiers" => $completedTiers,
            "tierAnswers" => $tierAnswers,
            "careerMatches" => $careerMatches,
            "report" => $report
        ], JSON_UNESCAPED_UNICODE);

    } catch (\Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
    exit();
}
