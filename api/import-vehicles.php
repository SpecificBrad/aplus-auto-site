<?php
/**
 * One-Time Vehicle Import Script
 * Import existing 5 vehicles into MySQL database
 *
 * SECURITY: Delete this file after running!
 */

header("Content-Type: application/json; charset=UTF-8");

require_once 'config/database.php';
require_once 'models/Vehicle.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$vehicle = new Vehicle($db);

// Vehicle data to import
$vehicles = [
    [
        'year' => 2014,
        'make' => 'Hyundai',
        'model' => 'Elantra',
        'price' => 4995,
        'priceType' => 'firm',
        'mileage' => 'N/A',
        'vin' => '',
        'transmission' => 'Automatic',
        'fuelType' => 'Gasoline',
        'engine' => '4-Cylinder',
        'bodyType' => 'Sedan',
        'drivetrain' => '',
        'certified' => 1,
        'sale' => 0,
        'description' => 'In the market for a second car or a car for that special someone attending school or university, well here it is! Car will be sold inspected and fully serviced with a fresh oil and filter change. Car has a automatic transmission with a 4 cylinder engine that provides excellent gas mileage. Car was just detailed inside and out.',
        'status' => 'available',
        'features' => json_encode(['Automatic Transmission', '4-Cylinder', 'Excellent Gas Mileage', 'Fresh Oil Change', 'Detailed']),
        'imageUrl' => 'https://dn74k69h2p3fn.cloudfront.net/2025/12/01/1764614620177_3477369_sm.jpg',
        'images' => json_encode([])
    ],
    [
        'year' => 2016,
        'make' => 'Hyundai',
        'model' => 'Elantra',
        'price' => 5995,
        'priceType' => 'obo',
        'mileage' => '154,000',
        'vin' => '',
        'transmission' => 'Automatic',
        'fuelType' => 'Gasoline',
        'engine' => '4-Cylinder',
        'bodyType' => 'Sedan',
        'drivetrain' => '',
        'certified' => 1,
        'sale' => 1,
        'description' => 'New to inventory is this little sporty Hyundai Elantra. Car has a automatic transmission with a 4 cylinder engine that provides excellent gas mileage. Car will be sold fully inspected and serviced with a fresh oil change to get you started the right way.',
        'status' => 'available',
        'features' => json_encode(['Automatic Transmission', '4-Cylinder', 'Excellent Gas Mileage', 'Fresh Oil Change', 'Sporty']),
        'imageUrl' => 'https://dn74k69h2p3fn.cloudfront.net/2024/06/06/1717682473208_3539292_md.jpg',
        'images' => json_encode([])
    ],
    [
        'year' => 2012,
        'make' => 'Honda',
        'model' => 'CRV',
        'price' => 9995,
        'priceType' => 'obo',
        'mileage' => '135,000',
        'vin' => '',
        'transmission' => 'Automatic',
        'fuelType' => 'Gasoline',
        'engine' => '4-Cylinder',
        'bodyType' => 'SUV',
        'drivetrain' => 'AWD',
        'certified' => 1,
        'sale' => 0,
        'description' => 'In excellent shape inside and out with low kms with just 135k kms. Comes with a 4 cylinder engine with automatic transmission with AWD that gives you great gas mileage. Will be sold inspected and fully serviced with a great oil and filter change. Just has a detail inside and out, paint and fabric are in awesome shape.',
        'status' => 'available',
        'features' => json_encode(['AWD', '4-Cylinder', 'Low Mileage', 'Excellent Gas Mileage', 'Fresh Oil Change', 'Detailed']),
        'imageUrl' => 'https://dn74k69h2p3fn.cloudfront.net/2025/06/23/1750679465523_3645862_lg.jpg',
        'images' => json_encode([])
    ],
    [
        'year' => 2015,
        'make' => 'BMW',
        'model' => 'X3',
        'price' => 10995,
        'priceType' => 'obo',
        'mileage' => '180,523',
        'vin' => '',
        'transmission' => 'Automatic',
        'fuelType' => 'Gasoline',
        'engine' => '',
        'bodyType' => 'SUV',
        'drivetrain' => 'AWD',
        'certified' => 1,
        'sale' => 0,
        'description' => 'Black Beauty!!! Just arrived is this X3 with 180kms. Selling inspected and fully serviced with a fresh oil and filter change. Has every available option for the year! Beautiful heated leather seats, heated steering wheel, heated mirrors, you name it this BMW has it!',
        'status' => 'available',
        'features' => json_encode(['AWD', 'Heated Leather Seats', 'Heated Steering Wheel', 'Heated Mirrors', 'Premium Package', 'Fresh Oil Change', 'Fully Loaded']),
        'imageUrl' => 'https://dn74k69h2p3fn.cloudfront.net/2025/12/04/1764868531827_3685733_md.jpg',
        'images' => json_encode([])
    ],
    [
        'year' => 2013,
        'make' => 'Kia',
        'model' => 'Soul',
        'price' => 6995,
        'priceType' => 'firm',
        'mileage' => 'Low',
        'vin' => '',
        'transmission' => 'Automatic',
        'fuelType' => 'Gasoline',
        'engine' => '',
        'bodyType' => 'Hatchback',
        'drivetrain' => '',
        'certified' => 1,
        'sale' => 0,
        'description' => 'Selling a Kia Soul inspected with a fresh oil change. Car is in great shape inside and out and drives even better. Comes with winter tires already installed to face old man winter.',
        'status' => 'available',
        'features' => json_encode(['Low Mileage', 'Winter Tires Included', 'Fresh Oil Change', 'Great Condition']),
        'imageUrl' => 'https://dn74k69h2p3fn.cloudfront.net/2025/01/02/1735835236574_3603720_md.jpg',
        'images' => json_encode([])
    ]
];

$imported = 0;
$errors = [];

foreach ($vehicles as $index => $data) {
    // Set vehicle properties
    $vehicle->year = $data['year'];
    $vehicle->make = $data['make'];
    $vehicle->model = $data['model'];
    $vehicle->price = $data['price'];
    $vehicle->priceType = $data['priceType'];
    $vehicle->mileage = $data['mileage'];
    $vehicle->vin = $data['vin'];
    $vehicle->transmission = $data['transmission'];
    $vehicle->fuelType = $data['fuelType'];
    $vehicle->engine = $data['engine'];
    $vehicle->bodyType = $data['bodyType'];
    $vehicle->drivetrain = $data['drivetrain'];
    $vehicle->certified = $data['certified'];
    $vehicle->sale = $data['sale'];
    $vehicle->description = $data['description'];
    $vehicle->status = $data['status'];
    $vehicle->features = $data['features'];
    $vehicle->imageUrl = $data['imageUrl'];
    $vehicle->images = $data['images'];

    // Create the vehicle
    if ($vehicle->create()) {
        $imported++;
    } else {
        $errors[] = "Failed to import vehicle #" . ($index + 1) . ": {$data['year']} {$data['make']} {$data['model']}";
    }
}

echo json_encode([
    'success' => true,
    'imported' => $imported,
    'total' => count($vehicles),
    'errors' => $errors,
    'message' => "Successfully imported {$imported} of " . count($vehicles) . " vehicles"
]);
?>
