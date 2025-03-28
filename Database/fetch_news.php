<?php
header('Content-Type: application/json');
include("db.php");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT id, title, description, image_path, created_at FROM news ORDER BY created_at DESC");
    $newsData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($newsData);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
