<?php
session_start();
$host = "localhost";
$user = "root";
$pass = "";
$database = "registration";

$conn = new mysqli($host, $user, $pass, $database);
if ($conn->connect_error) {
    die("Failed to Connect: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Email = $_POST["Email"];
    $Password = $_POST["Password"];

    $sql = "SELECT `Admin`, GivenName, MI, LastName, Suffix, Gender, Birthday, Email, Password, 
                   Address, Previous_school, Previous_school_address, LRN, Graduated, Strand, 
                   User_Picture, Card_Picture
            FROM user_info WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $Email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        // Bind results to variables
        $stmt->bind_result($Admin, $GivenName, $MI, $LastName, $Suffix, $Gender, $Birthday, $Email, $hashed_password, 
                           $Address, $Previous_school, $Previous_school_address, $LRN, $Graduated, $Strand, 
                           $User_Picture, $Card_Picture);
        $stmt->fetch();

        if (password_verify($Password, $hashed_password)) {
            // Store user details in session (excluding password)
            $_SESSION["user"] = [
                "GivenName" => $GivenName,
                "MI" => $MI,
                "LastName" => $LastName,
                "Suffix" => $Suffix,
                "Gender" => $Gender,
                "Birthday" => $Birthday,
                "Email" => $Email,
                "Address" => $Address,
                "Previous_school" => $Previous_school,
                "Previous_school_address" => $Previous_school_address,
                "LRN" => $LRN,
                "Graduated" => $Graduated,
                "Strand" => $Strand,
                "User_Picture" => $User_Picture,
                "Card_Picture" => $Card_Picture
            ];
            $_SESSION["Admin"] = $Admin;

            //1 = Admin, 0 = User
            if ($Admin == 1) {
                header("Location: ../Admin/Dashboard/dashboard.html"); // ✅ Redirect admin users
            } else {
                echo "User";
                //header("Location: user_dashboard.php"); // ✅ Redirect normal users
            }
            exit();
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No account found with this email.";
    }

    $stmt->close();
}
$conn->close();
?>
