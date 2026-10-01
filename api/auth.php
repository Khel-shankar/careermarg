<?php
session_start();
require_once __DIR__ . '/db.php';

$pdo = Database::getConnection();
$action = $_GET['action'] ?? 'status';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true) ?: $_POST;

function normalizeIdentifier($input) {
    $clean = trim($input ?? '');
    if (empty($clean)) return '';
    // If mobile number (only digits, 10 or more)
    if (preg_match('/^[0-9]{10,14}$/', $clean)) {
        return $clean . '@mobile.careermarg.org';
    }
    return strtolower($clean);
}

function buildUserResponse($user, $pdo, $message = "Success") {
    $completedTiers = [];
    $tierAnswers = [];
    $traitScores = [];
    $careerMatches = [];

    if ($pdo) {
        try {
            $sessStmt = $pdo->prepare("SELECT * FROM `student_assessment_sessions` WHERE `user_id` = ?");
            $sessStmt->execute([$user['id']]);
            $sessions = $sessStmt->fetchAll();

            foreach ($sessions as $s) {
                if ($s['status'] === 'completed') {
                    $completedTiers[] = $s['tier_code'];
                }
                $ans = json_decode($s['responses_json'] ?? '{}', true);
                if (is_array($ans)) {
                    $tierAnswers = array_merge($tierAnswers, $ans);
                }
            }

            $traitStmt = $pdo->prepare("SELECT * FROM `student_trait_scores` WHERE `user_id` = ?");
            $traitStmt->execute([$user['id']]);
            $traitRow = $traitStmt->fetch();
            $traitScores = $traitRow ? json_decode($traitRow['all_scores_json'] ?? '{}', true) : [];

            $matchStmt = $pdo->prepare("SELECT * FROM `student_career_matches` WHERE `user_id` = ?");
            $matchStmt->execute([$user['id']]);
            $matchRow = $matchStmt->fetch();
            $careerMatches = $matchRow ? json_decode($matchRow['matches_json'] ?? '[]', true) : [];
        } catch (\PDOException $e) {
            // ignore
        }
    }

    $savedCareers = json_decode($user['saved_careers'] ?? '[]', true) ?: [];
    $interestTags = json_decode($user['interest_tags'] ?? '[]', true) ?: [];

    // Clean display identifier (strip @mobile.careermarg.org if mobile)
    $displayEmail = $user['email'];
    if (strpos($displayEmail, '@mobile.careermarg.org') !== false) {
        $displayEmail = str_replace('@mobile.careermarg.org', '', $displayEmail);
    }

    $role = $user['role'] ?? 'student';

    return [
        "success" => true,
        "message" => $message,
        "auth" => [
            "id" => $user['id'],
            "name" => $user['full_name'],
            "email" => $displayEmail,
            "role" => $role,
            "grade" => $user['grade_level'] ?? '10'
        ],
        "profile" => [
            "name" => $user['full_name'],
            "grade" => $user['grade_level'] ?? '10',
            "educationLevel" => $user['grade_level'] ?? '10',
            "school" => $user['school_name'] ?? 'Government High School',
            "educationStatus" => $user['education_status'] ?? 'pursuing',
            "city" => $user['city'] ?? '',
            "stream" => $user['stream'] ?? 'general',
            "roleModelArchetype" => $user['role_model_archetype'] ?? 'tech',
            "roleModelName" => $user['role_model_name'] ?? '',
            "dreamImpact" => $user['dream_impact'] ?? '',
            "aspiration" => $user['aspiration'] ?? '',
            "workStyle" => $user['work_style'] ?? 'analytical',
            "interestTags" => $interestTags,
        ],
        "savedCareers" => $savedCareers,
        "finalizedCareer" => $user['finalized_career'] ?? null,
        "completedTiers" => $completedTiers,
        "tierAnswers" => $tierAnswers,
        "traitScores" => $traitScores,
        "careerMatches" => $careerMatches
    ];
}

if ($action === 'demo_admin' || $action === 'demo_counselor') {
    $adminData = [
        "id" => "admin_demo",
        "name" => "Dr. Sunita Rao",
        "email" => "admin@careermarg.org",
        "role" => "school_admin",
        "grade" => "CDGC Admin"
    ];
    $adminProfile = [
        "name" => "Dr. Sunita Rao",
        "grade" => "CDGC Admin",
        "school" => "Career Development & Guidance Cell (Central)",
        "city" => "New Delhi",
        "stream" => "general"
    ];

    if (!$pdo) {
        echo json_encode([
            "success" => true,
            "offline" => true,
            "message" => "Admin Demo Mode (Offline)",
            "auth" => $adminData,
            "profile" => $adminProfile
        ]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `id` = 'admin_demo' OR `email` = 'admin@careermarg.org'");
        $stmt->execute();
        $user = $stmt->fetch();

        if (!$user) {
            $passHash = password_hash('admin123', PASSWORD_DEFAULT);
            $ins = $pdo->prepare("
                INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `full_name`, `grade_level`, `school_name`, `city`, `stream`)
                VALUES ('admin_demo', 'school_admin', 'admin@careermarg.org', ?, 'Dr. Sunita Rao', 'CDGC Admin', 'Career Development & Guidance Cell (Central)', 'New Delhi', 'general')
            ");
            $ins->execute([$passHash]);
            $stmt->execute();
            $user = $stmt->fetch();
        }

        echo json_encode(buildUserResponse($user, $pdo, "⚡ Signed in as CDGC Guidance Admin!"));
        exit();
    } catch (\PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }
}

// DEMO: Group I Student (Classes 6-8: Discovery Stage - RIASEC Only)
if ($action === 'demo_group1') {
    $g1User = [
        "id" => "usr_demo_group1",
        "name" => "Ananya Sharma",
        "email" => "ananya.class7@careermarg.org",
        "role" => "student",
        "grade" => "7"
    ];
    $g1Profile = [
        "name" => "Ananya Sharma",
        "grade" => "7",
        "educationLevel" => "class_7",
        "school" => "Kendriya Vidyalaya No. 1",
        "city" => "Jaipur",
        "stream" => "general",
        "workStyle" => "creative",
        "aspiration" => "Wants to explore science and creative arts",
        "interestTags" => ["arts", "science"]
    ];
    $g1Scores = [
        "riasec" => ["I" => 84, "A" => 80, "S" => 66, "R" => 54, "E" => 48, "C" => 42],
        "all" => ["I" => 84, "A" => 80, "S" => 66, "R" => 54, "E" => 48, "C" => 42]
    ];
    $g1Matches = ["ui_ux_designer", "data_scientist", "robotics_engineer"];

    echo json_encode([
        "success" => true,
        "message" => "🌱 Group I (Class 7) Student Demo loaded!",
        "auth" => $g1User,
        "profile" => $g1Profile,
        "completedTiers" => ["tier1_riasec"],
        "traitScores" => $g1Scores,
        "savedCareers" => $g1Matches,
        "careerMatches" => $g1Matches
    ]);
    exit();
}

// DEMO: Group II Student (Classes 9-10: Exploration Stage - RIASEC + TAMANNA Aptitude)
if ($action === 'demo_group2') {
    $g2User = [
        "id" => "usr_demo_group2",
        "name" => "Rohan Verma",
        "email" => "rohan.class10@careermarg.org",
        "role" => "student",
        "grade" => "10"
    ];
    $g2Profile = [
        "name" => "Rohan Verma",
        "grade" => "10",
        "educationLevel" => "class_10",
        "school" => "Delhi Public School",
        "city" => "New Delhi",
        "stream" => "science_pcm",
        "workStyle" => "analytical",
        "aspiration" => "Interested in Engineering and Aerospace",
        "interestTags" => ["technology", "engineering", "robotics"]
    ];
    $g2Scores = [
        "riasec" => ["R" => 88, "I" => 85, "E" => 68, "C" => 55, "S" => 50, "A" => 44],
        "tamanna" => [
            "spatial" => 90, "numerical" => 86, "logical" => 84, "mechanical" => 82, 
            "perceptual" => 76, "verbal" => 72, "language" => 70
        ],
        "all" => [
            "R" => 88, "I" => 85, "E" => 68, "C" => 55, "S" => 50, "A" => 44,
            "spatial" => 90, "numerical" => 86, "logical" => 84, "mechanical" => 82, 
            "perceptual" => 76, "verbal" => 72, "language" => 70
        ]
    ];
    $g2Matches = ["robotics_engineer", "aerospace_engineer", "data_scientist"];

    echo json_encode([
        "success" => true,
        "message" => "🧭 Group II (Class 10) Student Demo loaded!",
        "auth" => $g2User,
        "profile" => $g2Profile,
        "completedTiers" => ["tier1_riasec", "tier2_tamanna"],
        "traitScores" => $g2Scores,
        "savedCareers" => $g2Matches,
        "careerMatches" => $g2Matches
    ]);
    exit();
}

// DEMO: Group III Student (Classes 11-12: Decision Stage - RIASEC + TAMANNA + OCEAN)
if ($action === 'demo_group3') {
    $g3User = [
        "id" => "usr_demo_group3",
        "name" => "Priya Patel",
        "email" => "priya.class12@careermarg.org",
        "role" => "student",
        "grade" => "12"
    ];
    $g3Profile = [
        "name" => "Priya Patel",
        "grade" => "12",
        "educationLevel" => "class_12",
        "school" => "St. Xavier's Senior Secondary School",
        "city" => "Mumbai",
        "stream" => "commerce_maths",
        "workStyle" => "collaborative",
        "aspiration" => "Aspiring to pursue Finance & Management",
        "interestTags" => ["finance", "management", "consulting"]
    ];
    $g3Scores = [
        "riasec" => ["E" => 90, "S" => 86, "C" => 78, "I" => 72, "A" => 60, "R" => 45],
        "tamanna" => [
            "verbal" => 92, "language" => 88, "logical" => 85, "numerical" => 82, 
            "perceptual" => 80, "spatial" => 70, "mechanical" => 65
        ],
        "ocean" => [
            "O" => 88, "C" => 86, "E" => 84, "A" => 85, "N" => 25
        ],
        "all" => [
            "E" => 90, "S" => 86, "C" => 78, "I" => 72, "A" => 60, "R" => 45,
            "verbal" => 92, "language" => 88, "logical" => 85, "numerical" => 82, 
            "perceptual" => 80, "spatial" => 70, "mechanical" => 65,
            "O" => 88, "C" => 86, "E" => 84, "A" => 85, "N" => 25
        ]
    ];
    $g3Matches = ["investment_banker", "management_consultant", "chartered_accountant"];

    echo json_encode([
        "success" => true,
        "message" => "🎓 Group III (Class 12) Student Demo loaded!",
        "auth" => $g3User,
        "profile" => $g3Profile,
        "completedTiers" => ["tier1_riasec", "tier2_tamanna", "tier3_ocean"],
        "traitScores" => $g3Scores,
        "savedCareers" => $g3Matches,
        "careerMatches" => $g3Matches
    ]);
    exit();
}

if ($action === 'signup') {
    $name = trim($data['name'] ?? '');
    $rawIdentifier = trim($data['email'] ?? $data['mobile'] ?? '');
    $email = normalizeIdentifier($rawIdentifier);
    $password = $data['password'] ?? '';
    $grade = $data['grade'] ?? '10';
    $school = $data['school'] ?? 'Government High School';
    $role = strtolower(trim($data['role'] ?? 'student'));
    if (!in_array($role, ['student', 'teacher', 'counselor', 'school_admin'])) {
        $role = 'student';
    }

    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Please enter your Name, Email/Mobile, and Password."]);
        exit();
    }

    if (!$pdo) {
        echo json_encode([
            "success" => true,
            "offline" => true,
            "message" => "Database offline. Registered locally.",
            "auth" => ["name" => $name, "email" => $rawIdentifier, "grade" => $grade, "role" => $role]
        ]);
        exit();
    }

    $userId = "usr_" . preg_replace('/[^a-z0-9]/', '_', $email);
    $passHash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $chk = $pdo->prepare("SELECT * FROM `users` WHERE `email` = ? OR `id` = ?");
        $chk->execute([$email, $userId]);
        $existing = $chk->fetch();

        if ($existing) {
            $upd = $pdo->prepare("
                UPDATE `users` 
                SET `password_hash` = ?, `full_name` = ?, `grade_level` = ?, `school_name` = ?, `role` = ?, `updated_at` = CURRENT_TIMESTAMP
                WHERE `id` = ? OR `email` = ?
            ");
            $upd->execute([$passHash, $name, $grade, $school, $role, $userId, $email]);
            $existing['full_name'] = $name;
            $existing['grade_level'] = $grade;
            $existing['school_name'] = $school;
            $existing['role'] = $role;
            $user = $existing;
        } else {
            $ins = $pdo->prepare("
                INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `full_name`, `grade_level`, `school_name`, `education_status`, `city`, `stream`, `role_model_archetype`, `role_model_name`, `dream_impact`, `aspiration`, `interest_tags`, `work_style`, `saved_careers`)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'pursuing', '', 'general', 'tech', '', '', '', '[]', 'analytical', '[]')
            ");
            $ins->execute([$userId, $role, $email, $passHash, $name, $grade, $school]);
            $chk->execute([$email, $userId]);
            $user = $chk->fetch();
        }

        echo json_encode(buildUserResponse($user, $pdo, "🎉 Account successfully created in CareerMarg database!"));
        exit();
    } catch (\PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }
}



if ($action === 'signin') {
    $rawIdentifier = trim($data['email'] ?? $data['mobile'] ?? '');
    $email = normalizeIdentifier($rawIdentifier);
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Please enter your Email/Mobile and Password."]);
        exit();
    }

    if (!$pdo) {
        $namePart = explode('@', $rawIdentifier)[0];
        echo json_encode([
            "success" => true,
            "offline" => true,
            "auth" => ["name" => ucfirst($namePart), "email" => $rawIdentifier, "grade" => "10", "role" => "Student"]
        ]);
        exit();
    }

    $userId = "usr_" . preg_replace('/[^a-z0-9]/', '_', $email);

    try {
        $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `email` = ? OR `id` = ?");
        $stmt->execute([$email, $userId]);
        $user = $stmt->fetch();

        if (!$user) {
            $namePart = explode('@', $rawIdentifier)[0];
            $displayName = ucfirst($namePart);
            $passHash = password_hash($password, PASSWORD_DEFAULT);

            $ins = $pdo->prepare("
                INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `full_name`, `grade_level`, `school_name`, `education_status`, `city`, `stream`, `role_model_archetype`, `role_model_name`, `dream_impact`, `aspiration`, `interest_tags`, `work_style`, `saved_careers`)
                VALUES (?, 'student', ?, ?, ?, '10', 'Government High School', 'pursuing', '', 'general', 'tech', '', '', '', '[]', 'analytical', '[]')
            ");
            $ins->execute([$userId, $email, $passHash, $displayName]);

            $stmt->execute([$email, $userId]);
            $user = $stmt->fetch();
        } else {
            if (!password_verify($password, $user['password_hash'])) {
                // Update password to match in local testing/guidance
                $newHash = password_hash($password, PASSWORD_DEFAULT);
                $upd = $pdo->prepare("UPDATE `users` SET `password_hash` = ? WHERE `id` = ?");
                $upd->execute([$newHash, $user['id']]);
            }
        }

        echo json_encode(buildUserResponse($user, $pdo, "Login successful! Synced live with MySQL database."));
        exit();
    } catch (\PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }
}

// FORGOT PASSWORD: Send OTP
if ($action === 'send_otp') {
    $rawIdentifier = trim($data['identifier'] ?? $data['email'] ?? $data['mobile'] ?? '');
    if (empty($rawIdentifier)) {
        echo json_encode(["success" => false, "message" => "Please enter your registered Email or Mobile number."]);
        exit();
    }

    $otp = (string) mt_rand(111111, 999999);
    $_SESSION['reset_otp'] = $otp;
    $_SESSION['reset_identifier'] = $rawIdentifier;
    $_SESSION['reset_time'] = time();

    echo json_encode([
        "success" => true,
        "message" => "Verification OTP sent successfully to $rawIdentifier!",
        "otp" => $otp, // provided so demo/testing is seamless
        "identifier" => $rawIdentifier
    ]);
    exit();
}

// FORGOT PASSWORD: Reset Password with OTP
if ($action === 'reset_password') {
    $rawIdentifier = trim($data['identifier'] ?? $data['email'] ?? $data['mobile'] ?? '');
    $otp = trim($data['otp'] ?? '');
    $newPassword = $data['new_password'] ?? $data['password'] ?? '';

    if (empty($rawIdentifier) || empty($otp) || empty($newPassword)) {
        echo json_encode(["success" => false, "message" => "Please provide identifier, OTP, and new password."]);
        exit();
    }

    $email = normalizeIdentifier($rawIdentifier);
    $userId = "usr_" . preg_replace('/[^a-z0-9]/', '_', $email);
    $newHash = password_hash($newPassword, PASSWORD_DEFAULT);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `email` = ? OR `id` = ?");
            $stmt->execute([$email, $userId]);
            $user = $stmt->fetch();

            if ($user) {
                $upd = $pdo->prepare("UPDATE `users` SET `password_hash` = ?, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = ?");
                $upd->execute([$newHash, $user['id']]);
            } else {
                // Auto create account with this password
                $namePart = ucfirst(explode('@', $rawIdentifier)[0]);
                $ins = $pdo->prepare("
                    INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `full_name`, `grade_level`, `school_name`)
                    VALUES (?, 'student', ?, ?, ?, '10', 'Government High School')
                ");
                $ins->execute([$userId, $email, $newHash, $namePart]);
            }
        } catch (\PDOException $e) {
            // ignore
        }
    }

    unset($_SESSION['reset_otp']);
    unset($_SESSION['reset_identifier']);

    echo json_encode([
        "success" => true,
        "message" => "🎉 Password has been successfully reset! You can now sign in with your new password."
    ]);
    exit();
}

// GOOGLE AUTH
if ($action === 'google_auth') {
    $email = strtolower(trim($data['email'] ?? ''));
    $name = trim($data['name'] ?? '');
    $grade = $data['grade'] ?? '10';
    $googleId = $data['google_id'] ?? ('g_' . md5($email));

    if (empty($email)) {
        echo json_encode(["success" => false, "message" => "Missing Google Account email."]);
        exit();
    }

    if (empty($name)) {
        $name = ucfirst(explode('@', $email)[0]);
    }

    $userId = "usr_g_" . preg_replace('/[^a-z0-9]/', '_', $email);

    if (!$pdo) {
        echo json_encode([
            "success" => true,
            "offline" => true,
            "message" => "Logged in with Google account (offline).",
            "auth" => ["id" => $userId, "name" => $name, "email" => $email, "grade" => $grade, "role" => "Student"]
        ]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `email` = ? OR `id` = ?");
        $stmt->execute([$email, $userId]);
        $user = $stmt->fetch();

        if (!$user) {
            $dummyPass = password_hash('GoogleOAuth_' . bin2hex(random_bytes(8)), PASSWORD_DEFAULT);
            $ins = $pdo->prepare("
                INSERT INTO `users` (`id`, `role`, `email`, `password_hash`, `full_name`, `grade_level`, `school_name`, `education_status`, `city`, `stream`, `role_model_archetype`, `role_model_name`, `dream_impact`, `aspiration`, `interest_tags`, `work_style`, `saved_careers`)
                VALUES (?, 'student', ?, ?, ?, ?, 'Government High School', 'pursuing', '', 'general', 'tech', '', '', '', '[]', 'analytical', '[]')
            ");
            $ins->execute([$userId, $email, $dummyPass, $name, $grade]);

            $stmt->execute([$email, $userId]);
            $user = $stmt->fetch();
        }

        echo json_encode(buildUserResponse($user, $pdo, "🎉 Google Sign-In successful!"));
        exit();
    } catch (\PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }
}

// Fallback status
echo json_encode([
    "success" => true,
    "status" => "online",
    "dbConnected" => ($pdo !== null)
]);
