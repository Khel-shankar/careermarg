<?php
require_once __DIR__ . '/db.php';

$pdo = Database::getConnection();
if ($pdo) {
    $pdo->exec("SET NAMES utf8mb4");
}

$sector = $_GET['sector'] ?? 'all';
$query = trim($_GET['q'] ?? '');
$stream = $_GET['stream'] ?? 'all';
$limit = min(200, (int)($_GET['limit'] ?? 60));
$offset = max(0, (int)($_GET['offset'] ?? 0));

if (!$pdo) {
    echo json_encode(["success" => false, "offline" => true, "careers" => []]);
    exit();
}

try {
    $sql = "SELECT id, title, title_hi, sector_id, icon, overview, overview_hi, min_salary_lpa, max_salary_lpa, required_education, required_education_hi, stream_preferred, entrance_exams_json, riasec_weights_json, aptitude_weights_json, interest_tags_json, roadmap_steps_json FROM careers WHERE is_active = 1";
    $params = [];

    if ($sector !== 'all' && !empty($sector)) {
        $sql .= " AND sector_id = ?";
        $params[] = $sector;
    }

    if ($stream !== 'all' && !empty($stream)) {
        $sql .= " AND (stream_preferred = ? OR stream_preferred = 'general')";
        $params[] = $stream;
    }

    if (!empty($query)) {
        $sql .= " AND (title LIKE ? OR title_hi LIKE ? OR overview LIKE ? OR overview_hi LIKE ?)";
        $searchTerm = "%{$query}%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    $sql .= " ORDER BY title ASC LIMIT $limit OFFSET $offset";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $careers = [];
    foreach ($rows as $r) {
        $careers[] = [
            "id" => $r['id'],
            "title" => $r['title'],
            "hi" => $r['title_hi'],
            "sectorId" => $r['sector_id'],
            "icon" => $r['icon'],
            "overview" => $r['overview'],
            "overviewHi" => $r['overview_hi'],
            "salary" => "₹" . number_format($r['min_salary_lpa'], 1) . " - " . number_format($r['max_salary_lpa'], 1) . " LPA",
            "education" => $r['required_education'],
            "educationHi" => $r['required_education_hi'],
            "stream" => $r['stream_preferred'],
            "entranceExams" => json_decode($r['entrance_exams_json'] ?? '[]', true),
            "riasec" => json_decode($r['riasec_weights_json'] ?? '{}', true),
            "aptitude" => json_decode($r['aptitude_weights_json'] ?? '{}', true),
            "interestTags" => json_decode($r['interest_tags_json'] ?? '[]', true),
            "roadmap" => json_decode($r['roadmap_steps_json'] ?? '[]', true),
        ];
    }

    echo json_encode([
        "success" => true,
        "count" => count($careers),
        "careers" => $careers
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
