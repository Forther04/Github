<?php
include("db.php"); 

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
