<?php 
// $host = "sql108.infinityfree.com";
// $user = "if0_38406536";
// $pass = "4IWh5549dw6mWNz";
// $database = "if0_38406536_registration";


$host = "localhost";
$user = "root";
$pass = "";
$database = "registration";

$conn = new mysqli($host, $user, $pass, $database);
if ($conn->connect_error) {
    die("Failed to connect: " . $conn->connect_error);
}
?>