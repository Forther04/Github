<?php

header("Content-Type: application/json"); 
error_reporting(E_ALL);
ini_set('display_errors', 1);

ob_clean();

header("Content-Type: application/json"); // Ensure JSON output
error_reporting(E_ALL); // Show all errors
ini_set('display_errors', 1); // Display errors

require "fetch.php"; // Ensure this file exists and works

if (!$conn || $conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Validate user ID input
if (!isset($_GET['id']) || empty($_GET['id'])) {
    exit;
}

$id = intval($_GET['id']); // Convert to integer

// Prepare the query
$query = "SELECT * FROM user_info WHERE userId = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(["error" => "Database query preparation failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();


if (!empty($user['User_picture'])) {
    $user['User_Picture'] = "http://localhost/projects/AUPC_Registration%20Version%202/Github/Components/" . basename($user['User_picture']);
}

if (!empty($user['Card_picture'])) {
    $user['Card_Picture'] = "http://localhost/projects/AUPC_Registration%20Version%202/Github/Components/" . basename($user['Card_picture']);
}


if ($user) {
    ob_end_clean();
    echo json_encode($user);
}


// Close everything
$stmt->close();
$conn->close();
exit;
?>
