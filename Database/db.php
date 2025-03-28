<?php 
// $host = "sql307.infinityfree.com";
// $user = "if0_38621174";
// $pass = "WoyPLdJxOUPcRN";
// $database = "if0_38621174_registration";


$host = "localhost";
$user = "root";
$pass = "";
$database = "registration";

$conn = new mysqli($host, $user, $pass, $database);
if ($conn->connect_error) {
    die("Failed to connect: " . $conn->connect_error);
}
?>