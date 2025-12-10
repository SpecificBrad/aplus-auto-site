<?php
/**
 * Database Configuration
 * A+ Auto Centre - Vehicle Inventory API
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Database {
    // Database credentials
    private $host = "localhost";
    private $db_name = "u948234398_inventory";
    private $username = "u948234398_admin";
    private $password = "YOUR_PASSWORD_HERE"; // Replace with actual password
    public $conn;

    // Get database connection
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8mb4");
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            echo json_encode([
                "error" => "Database connection failed",
                "message" => $exception->getMessage()
            ]);
        }

        return $this->conn;
    }
}
?>
