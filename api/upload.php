<?php
/**
 * Image Upload Handler
 * POST /api/upload.php
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = array();

// Check if file was uploaded
if(isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {

    $file = $_FILES['image'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];

    // Get file extension
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    // Allowed file types
    $allowed = array('jpg', 'jpeg', 'png', 'gif', 'webp');

    if(in_array($fileExt, $allowed)) {
        // Check file size (max 5MB)
        if($fileSize < 5242880) {

            // Generate unique filename
            $newFileName = uniqid('vehicle_', true) . '.' . $fileExt;
            $uploadPath = '../uploads/' . $newFileName;

            // Create uploads directory if it doesn't exist
            if(!file_exists('../uploads')) {
                mkdir('../uploads', 0755, true);
            }

            // Move uploaded file
            if(move_uploaded_file($fileTmpName, $uploadPath)) {
                http_response_code(200);
                $response = array(
                    "success" => true,
                    "message" => "File uploaded successfully",
                    "filename" => $newFileName,
                    "url" => "uploads/" . $newFileName
                );
            } else {
                http_response_code(500);
                $response = array(
                    "success" => false,
                    "message" => "Failed to move uploaded file"
                );
            }

        } else {
            http_response_code(400);
            $response = array(
                "success" => false,
                "message" => "File size exceeds 5MB limit"
            );
        }
    } else {
        http_response_code(400);
        $response = array(
            "success" => false,
            "message" => "Invalid file type. Allowed: jpg, jpeg, png, gif, webp"
        );
    }

} else {
    http_response_code(400);
    $response = array(
        "success" => false,
        "message" => "No file uploaded or upload error occurred"
    );
}

echo json_encode($response);
?>
