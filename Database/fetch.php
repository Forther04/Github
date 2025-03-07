<?php
$host = "localhost";
$user = "root";
$pass = "";
$database = "registration";

$conn = new mysqli($host, $user, $pass, $database);
if ($conn->connect_error) {
    die("Failed to connect: " . $conn->connect_error);
}

// Fetch all users
$sql = "SELECT userId, `Admin`, GivenName, MI, LastName, Suffix, Gender, Birthday, Email, Password, 
                   Address, Previous_school, Previous_school_address, Graduated, Lrn, Strand, 
                   User_picture, Card_picture
            FROM user_info";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Send data as JSON
header('Content-Type: application/json');
echo json_encode($users);
?>
