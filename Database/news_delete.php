<?php
header('Content-Type: application/json');
include("db.php");

// Read the JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["status" => "error", "message" => "No news ID provided."]);
    exit;
}

$newsId = $data['id'];

try {
    // Connect to the database using PDO
    $pdo = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Retrieve the news item to get the image path
    $stmt = $pdo->prepare("SELECT image_path FROM news WHERE id = :id");
    $stmt->execute([':id' => $newsId]);
    $news = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$news) {
        echo json_encode(["status" => "error", "message" => "News item not found."]);
        exit;
    }
    
    // Delete the image file if it exists and if image_path is not empty
    if (!empty($news['image_path'])) {
        // Adjust file path if necessary. Here we assume it's relative.
        $filePath = $news['image_path'];
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }
    
    // Delete the news row from the database
    $stmt = $pdo->prepare("DELETE FROM news WHERE id = :id");
    $stmt->execute([':id' => $newsId]);
    
    echo json_encode(["status" => "success", "message" => "News item deleted."]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
