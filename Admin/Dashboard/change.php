<?php
header('Content-Type: application/json');

$host = "sql108.infinityfree.com";
$user = "if0_38406536";
$pass = "4IWh5549dw6mWNz";
$database = "if0_38406536_registration";


$conn = new mysqli($host, $user, $pass, $database);
if ($conn->connect_error) {
    die("Failed to connect: " . $conn->connect_error);
}


$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id']) && isset($data['password'])) {
    $userId = $data['id'];
    $newPassword = password_hash($data['password'], PASSWORD_BCRYPT); // Securely hash the password

    $stmt = $conn->prepare("UPDATE user_info SET Password = ? WHERE userId = ?");
    $stmt->bind_param("si", $newPassword, $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to update password."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid request."]);
}


$conn->close();
?>