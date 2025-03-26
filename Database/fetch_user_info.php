<?php
header("Content-Type: application/json"); // Ensure JSON output
error_reporting(E_ALL); // Show all errors
ini_set('display_errors', 1); // Display errors

include("db.php"); 

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
    $user['User_picture'] = "../../Database/Components/". basename($user['User_picture']);
}

if (!empty($user['Card_picture'])) {
    $user['Card_picture'] = "../../Database/Components/" . basename($user['Card_picture']);
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