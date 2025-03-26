<?php
include("db.php"); 

// Count number of students in each strand, excluding admins
$sql = "SELECT Strand, COUNT(*) as count FROM user_info WHERE Admin != 1 GROUP BY Strand";
$result = $conn->query($sql);

$strandData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $strandData[] = $row;
    }
}

// Send data as JSON
header('Content-Type: application/json');
echo json_encode($strandData);
?>
