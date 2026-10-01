<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): ?PDO {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '3306';
            $db   = getenv('DB_NAME') ?: 'career_guidance_db';
            $user = getenv('DB_USER') ?: 'root';
            $pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';
            $charset = 'utf8mb4';

            $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
            ];

            // Enable SSL if cloud database requires it
            if (getenv('DB_SSL') === 'true' || getenv('DB_SSL') === '1' || strpos($host, 'tidbcloud') !== false || strpos($host, 'aivencloud') !== false) {
                $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
            }

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (\PDOException $e) {
                // Return null so frontend can show helpful status and fall back if needed
                return null;
            }
        }
        return self::$instance;
    }
}

// Quick health test endpoint
if (isset($_GET['health'])) {
    $conn = Database::getConnection();
    if ($conn) {
        echo json_encode([
            "status" => "connected",
            "database" => getenv('DB_NAME') ?: 'career_guidance_db',
            "host" => getenv('DB_HOST') ?: '127.0.0.1',
            "message" => "MySQL Database successfully connected and live!"
        ]);
    } else {
        echo json_encode([
            "status" => "offline",
            "message" => "MySQL Database connection could not be established with current environment variables."
        ]);
    }
    exit();
}
