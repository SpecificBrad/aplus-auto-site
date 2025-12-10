<?php
/**
 * Create Vehicle
 * POST /api/vehicles/create.php
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Vehicle.php';

$database = new Database();
$db = $database->getConnection();

$vehicle = new Vehicle($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(
    !empty($data->year) &&
    !empty($data->make) &&
    !empty($data->model) &&
    !empty($data->price) &&
    !empty($data->priceType) &&
    !empty($data->transmission)
) {
    // Set vehicle property values
    $vehicle->year = $data->year;
    $vehicle->make = $data->make;
    $vehicle->model = $data->model;
    $vehicle->price = $data->price;
    $vehicle->priceType = $data->priceType;
    $vehicle->mileage = $data->mileage ?? '';
    $vehicle->vin = $data->vin ?? '';
    $vehicle->transmission = $data->transmission;
    $vehicle->fuelType = $data->fuelType ?? '';
    $vehicle->engine = $data->engine ?? '';
    $vehicle->bodyType = $data->bodyType ?? '';
    $vehicle->drivetrain = $data->drivetrain ?? '';
    $vehicle->certified = $data->certified ?? 0;
    $vehicle->sale = $data->sale ?? 0;
    $vehicle->description = $data->description ?? '';
    $vehicle->status = $data->status ?? 'available';
    $vehicle->features = $data->features ?? '';
    $vehicle->imageUrl = $data->imageUrl ?? '';
    $vehicle->images = $data->images ?? '';

    // Create the vehicle
    if($vehicle->create()) {
        http_response_code(201);
        echo json_encode(array(
            "message" => "Vehicle was created.",
            "id" => $vehicle->id
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create vehicle."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create vehicle. Data is incomplete."));
}
?>
