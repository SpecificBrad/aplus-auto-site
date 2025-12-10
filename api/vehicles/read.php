<?php
/**
 * Read All Vehicles
 * GET /api/vehicles/read.php
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once '../config/database.php';
include_once '../models/Vehicle.php';

$database = new Database();
$db = $database->getConnection();

$vehicle = new Vehicle($db);
$stmt = $vehicle->readAll();
$num = $stmt->rowCount();

if($num > 0) {
    $vehicles_arr = array();
    $vehicles_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $vehicle_item = array(
            "id" => $id,
            "year" => (int)$year,
            "make" => $make,
            "model" => $model,
            "price" => (int)$price,
            "priceType" => $priceType,
            "mileage" => $mileage,
            "vin" => $vin,
            "transmission" => $transmission,
            "fuelType" => $fuelType,
            "engine" => $engine,
            "bodyType" => $bodyType,
            "drivetrain" => $drivetrain,
            "certified" => (int)$certified,
            "sale" => (int)$sale,
            "description" => $description,
            "status" => $status,
            "features" => $features,
            "imageUrl" => $imageUrl,
            "images" => $images,
            "createdAt" => $createdAt,
            "updatedAt" => $updatedAt
        );

        array_push($vehicles_arr["records"], $vehicle_item);
    }

    http_response_code(200);
    echo json_encode($vehicles_arr["records"]);
} else {
    http_response_code(200);
    echo json_encode(array());
}
?>
