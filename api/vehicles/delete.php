<?php
/**
 * Delete Vehicle
 * DELETE /api/vehicles/delete.php
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Vehicle.php';

$database = new Database();
$db = $database->getConnection();

$vehicle = new Vehicle($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Set ID to delete
$vehicle->id = $data->id;

// Delete the vehicle
if($vehicle->delete()) {
    http_response_code(200);
    echo json_encode(array("message" => "Vehicle was deleted."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to delete vehicle."));
}
?>
