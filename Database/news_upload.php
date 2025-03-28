<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set the content type to JSON
header('Content-Type: application/json');

$response = [];

if (isset($_POST['createnews'])) {

    if (
        empty($_POST['titletext']) ||
        empty($_POST['description']) ||
        !isset($_FILES['fileInput']) ||
        $_FILES['fileInput']['error'] !== UPLOAD_ERR_OK
    ) {
        $response['status'] = 'error';
        $response['message'] = 'Error: Please fill in all required fields.';
        echo json_encode($response);
        exit;
    }

    $title = $_POST['titletext'];
    $description = $_POST['description'];
    $fileTmpPath = $_FILES['fileInput']['tmp_name'];
    $fileName = $_FILES['fileInput']['name'];

    $uniqueFileName = uniqid() . '-' . $fileName;
    $uploadFileDir = 'news/';

    if (!is_dir($uploadFileDir)) {
        mkdir($uploadFileDir, 0777, true);
    }
 
    $dest_path = $uploadFileDir . $uniqueFileName;

    if (move_uploaded_file($fileTmpPath, $dest_path)) {

        include("db.php");

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            $sql = "INSERT INTO news (title, description, image_path) 
                    VALUES (:title, :description, :image_path)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':title'       => $title,
                ':description' => $description,
                ':image_path'  => $dest_path
            ]);
        
            $response['status'] = 'success';
            $response['message'] = 'News Created Succefully!';
        } catch (PDOException $e) {
            $response['status'] = 'error';
            $response['message'] = 'Database error: ' . $e->getMessage();
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error moving the uploaded file.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Form not submitted.';
}

echo json_encode($response);
?>