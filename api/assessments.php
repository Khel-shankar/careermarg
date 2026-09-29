<?php
require_once __DIR__ . '/db.php';

$pdo = Database::getConnection();
if ($pdo) {
    $pdo->exec("SET NAMES utf8mb4");
}

$tier = $_GET['tier'] ?? 'all';

if (!$pdo) {
    echo json_encode(["success" => false, "offline" => true]);
    exit();
}

try {
    // 1. Fetch assessments
    $assessments = $pdo->query("SELECT * FROM assessments WHERE is_active = 1 ORDER BY display_order ASC")->fetchAll();

    // 2. Fetch traits
    $traits = $pdo->query("SELECT * FROM assessment_traits")->fetchAll();
    $traitsMap = [];
    foreach ($traits as $tr) {
        $traitsMap[$tr['code']] = $tr;
    }

    // 3. Fetch questions
    $qSql = "SELECT * FROM assessment_questions";
    $params = [];
    if ($tier !== 'all' && !empty($tier)) {
        $qSql .= " WHERE tier_code = ?";
        $params[] = $tier;
    }
    $qSql .= " ORDER BY id ASC";
    $qStmt = $pdo->prepare($qSql);
    $qStmt->execute($params);
    $qRows = $qStmt->fetchAll();

    $questions = [];
    foreach ($qRows as $q) {
        $questions[] = [
            "id" => $q['id'],
            "tier" => $q['tier_code'],
            "traitCode" => $q['trait_code'],
            "submodule" => $q['submodule'],
            "submoduleTitle" => $q['submodule_title'],
            "submoduleTitleHi" => $q['submodule_title_hi'],
            "questionText" => $q['question_text_en'],
            "questionTextHi" => $q['question_text_hi'],
            "options" => json_decode($q['options_json'] ?? '[]', true)
        ];
    }

    echo json_encode([
        "success" => true,
        "assessments" => $assessments,
        "traits" => $traitsMap,
        "questions" => $questions
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
