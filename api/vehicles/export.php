<?php
/**
 * Export Vehicles to vehicle-data.js
 * GET /api/vehicles/export.php
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

$vehicles_arr = array();

if($num > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        // Only export available vehicles
        if($status === 'available') {
            $vehicle_item = array(
                "id" => (int)$id,
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
                "certified" => (bool)$certified,
                "sale" => (bool)$sale,
                "description" => $description,
                "status" => $status,
                "features" => $features ? json_decode($features, true) : array(),
                "imageUrl" => $imageUrl,
                "images" => $images ? json_decode($images, true) : array()
            );

            array_push($vehicles_arr, $vehicle_item);
        }
    }
}

// Generate JavaScript file content
$js_content = "/**\n";
$js_content .= " * Vehicle Inventory Data\n";
$js_content .= " * Auto-generated from database on " . date('Y-m-d H:i:s') . "\n";
$js_content .= " * A+ Auto Centre - Quality Used Vehicles\n";
$js_content .= " */\n\n";
$js_content .= "const vehicleInventory = " . json_encode($vehicles_arr, JSON_PRETTY_PRINT) . ";\n\n";
$js_content .= "// Export for use in other scripts\n";
$js_content .= "if (typeof module !== 'undefined' && module.exports) {\n";
$js_content .= "    module.exports = vehicleInventory;\n";
$js_content .= "}\n";

// Write to file
$file_path = '../../js/vehicle-data.js';
$result = file_put_contents($file_path, $js_content);

if($result !== false) {
    http_response_code(200);
    echo json_encode(array(
        "message" => "Export successful",
        "count" => count($vehicles_arr),
        "file" => "js/vehicle-data.js"
    ));
} else {
    http_response_code(500);
    echo json_encode(array(
        "message" => "Failed to write export file",
        "error" => error_get_last()
    ));
}
?>
