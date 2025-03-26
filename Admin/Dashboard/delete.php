<?php
header('Content-Type: application/json');
include("../../Database/db.php");

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || empty($data['id'])) {
    echo json_encode(["success" => false, "error" => "Invalid User ID"]);
    exit;
}

$userId = intval($data['id']); // Sanitize input

// Prevent admin deletion
$checkAdminQuery = "SELECT Admin FROM user_info WHERE userId = ?";
$stmt = $conn->prepare($checkAdminQuery);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && $user['Admin'] == 1) {
    echo json_encode(["success" => false, "error" => "Cannot delete admin users"]);
    exit;
}

// Fetch user pictures BEFORE deleting the user
$getPicturesQuery = "SELECT User_Picture, Card_Picture FROM user_info WHERE userId = ?";
$stmt = $conn->prepare($getPicturesQuery);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$userPictures = $result->fetch_assoc();

// Delete user from the database
$query = "DELETE FROM user_info WHERE userId = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    // If user deletion is successful, delete the images
    if ($userPictures) {
        // Define file paths
        $userPicPath = "../../Database/" . $userPictures['User_Picture'];
        $cardPicPath = "../../Database/" . $userPictures['Card_Picture'];

        // Check if files exist and delete them
        if (!empty($userPictures['User_Picture']) && file_exists($userPicPath)) {
            unlink($userPicPath);
        }
        if (!empty($userPictures['Card_Picture']) && file_exists($cardPicPath)) {
            unlink($cardPicPath);
        }
    }

    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Database error"]);
}

$stmt->close();
$conn->close();
?>