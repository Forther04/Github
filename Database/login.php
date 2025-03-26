<?php
session_start();
include("db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Email = $_POST["Email"];
    $Password = $_POST["Password"];

    $sql = "SELECT `Admin`, GivenName, MI, LastName, Suffix, Gender, Birthday, Password, 
                   Address, Previous_school, Previous_school_address, LRN, Graduated, Strand, 
                   User_Picture, Card_Picture
            FROM user_info WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $Email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        // Bind results to variables
        $stmt->bind_result($Admin, $GivenName, $MI, $LastName, $Suffix, $Gender, $Birthday, $hashed_password, 
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

            // Redirect based on role
            $redirectPage = ($Admin == 1) ? "../Admin/Dashboard/dashboard.html" : "../Main/Dashboard/index.php";
            header("Location: $redirectPage");
            exit();
        } else {
            echo "<script>alert('Invalid password.'); window.history.back();</script>";
            exit();
        }
    } else {
        echo "<script>alert('No account found with this email.'); window.history.back();</script>";
        exit();
    }

    $stmt->close();
}
$conn->close();
?>
