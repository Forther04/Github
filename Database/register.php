<?php 

$host = "localhost";
$user = "root";
$pass = "";
$database = "registration";

//Connect to the database
$conn = new mysqli($host, $user, $pass, $database);
// Check connection
if ($conn->connect_error) {
    die("Failed to Connect: " . $conn->connect_error);
}

// Get text input values
$GivenName = $_POST['GivenName'] ?? "";
$MI = $_POST['MiddleName'] ?? "";
$LastName = $_POST['LastName'] ?? "";
$Suffix = $_POST['Suffix'] ?? "";
$Gender = $_POST['Gender'] ?? "";
$Birthday = $_POST['Birthday'] ?? "";
$Email = $_POST['Email'] ?? "";
$Password = $_POST['Password'] ?? "";
$Address = $_POST['Address'] ?? "";
$Previous_school = $_POST['SchoolName'] ?? "";
$Previous_school_address = $_POST['SchoolAddress'] ?? "";
$Graduated = $_POST['Graduated'] ?? "";
$LRN = $_POST['LRN'] ?? "";
$Strand = $_POST['Strand'] ?? "";

// Hash password
$Hashed_password = password_hash($Password, PASSWORD_DEFAULT);

// Upload directory
$target_dir = "http://localhost/projects/AUPC_Registration%20Version%202/Github/Database/Components/"; // Folder to save images
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true); // Create directory if it doesn't exist
}

// File upload handling
$image_path = ""; // Default empty value
$card_picture = ""; // Default empty value

if (!empty($_FILES["UserPicture"]["name"])) {
    $file_name = uniqid() . "_" . basename($_FILES["UserPicture"]["name"]);
    $target_file = $target_dir . $file_name;
    $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    $allowed_types = ["jpg", "jpeg", "png"];

    if (in_array($file_type, $allowed_types) && $_FILES["UserPicture"]["size"] < 10000000) {
        if (move_uploaded_file($_FILES["UserPicture"]["tmp_name"], $target_file)) {
            $image_path = $target_file; // Store file path
        } else {
            die("Error uploading UserPicture.");
        }
    } else {
        die("Invalid file type or file too large for UserPicture.");
    }
}

if (!empty($_FILES["CardPicture"]["name"])) {
    $file_name = uniqid() . "_" . basename($_FILES["CardPicture"]["name"]);
    $target_file = $target_dir . $file_name;
    $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    $allowed_types = ["jpg", "jpeg", "png"];

    if (in_array($file_type, $allowed_types) && $_FILES["CardPicture"]["size"] < 10000000) {
        if (move_uploaded_file($_FILES["CardPicture"]["tmp_name"], $target_file)) {
            $card_picture = $target_file; // Store file path
        } else {
            die("Error uploading CardPicture.");
        }
    } else {
        die("Invalid file type or file too large for CardPicture.");
    }
}

// Prepare SQL statement
$sql = "INSERT INTO user_info 
    (`GivenName`, `MI`, `LastName`, `Suffix`, `Gender`, `Birthday`, `Email`, `Password`, `Address`, `Previous_school`, `Previous_school_address`, `Lrn`, `Graduated`, `Strand`, `User_Picture`, `Card_Picture`) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Prepare and bind
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die("Error preparing statement: " . $conn->error);
}

// Bind the correct variables
$stmt->bind_param("ssssssssssssssss", 
    $GivenName, 
    $MI, 
    $LastName, 
    $Suffix, 
    $Gender, 
    $Birthday, 
    $Email, 
    $Hashed_password,
    $Address, 
    $Previous_school, 
    $Previous_school_address, 
    $LRN, 
    $Graduated, 
    $Strand, 
    $image_path, // Corrected file path variable
    $card_picture // Corrected file path variable
);

// Execute the query
if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
