<?php
/**
 * Vehicle Model
 * A+ Auto Centre - Vehicle Inventory API
 */

class Vehicle {
    private $conn;
    private $table_name = "vehicles";

    // Vehicle properties
    public $id;
    public $year;
    public $make;
    public $model;
    public $price;
    public $priceType;
    public $mileage;
    public $vin;
    public $transmission;
    public $fuelType;
    public $engine;
    public $bodyType;
    public $drivetrain;
    public $certified;
    public $sale;
    public $description;
    public $status;
    public $features;
    public $imageUrl;
    public $images;
    public $createdAt;
    public $updatedAt;

    // Constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all vehicles
    public function readAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY createdAt DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Read single vehicle
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->year = $row['year'];
            $this->make = $row['make'];
            $this->model = $row['model'];
            $this->price = $row['price'];
            $this->priceType = $row['priceType'];
            $this->mileage = $row['mileage'];
            $this->vin = $row['vin'];
            $this->transmission = $row['transmission'];
            $this->fuelType = $row['fuelType'];
            $this->engine = $row['engine'];
            $this->bodyType = $row['bodyType'];
            $this->drivetrain = $row['drivetrain'];
            $this->certified = $row['certified'];
            $this->sale = $row['sale'];
            $this->description = $row['description'];
            $this->status = $row['status'];
            $this->features = $row['features'];
            $this->imageUrl = $row['imageUrl'];
            $this->images = $row['images'];
            $this->createdAt = $row['createdAt'];
            $this->updatedAt = $row['updatedAt'];
            return true;
        }

        return false;
    }

    // Create vehicle
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET year=:year, make=:make, model=:model, price=:price,
                    priceType=:priceType, mileage=:mileage, vin=:vin,
                    transmission=:transmission, fuelType=:fuelType, engine=:engine,
                    bodyType=:bodyType, drivetrain=:drivetrain, certified=:certified,
                    sale=:sale, description=:description, status=:status,
                    features=:features, imageUrl=:imageUrl, images=:images";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->year = htmlspecialchars(strip_tags($this->year));
        $this->make = htmlspecialchars(strip_tags($this->make));
        $this->model = htmlspecialchars(strip_tags($this->model));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->priceType = htmlspecialchars(strip_tags($this->priceType));
        $this->mileage = htmlspecialchars(strip_tags($this->mileage));
        $this->vin = htmlspecialchars(strip_tags($this->vin));
        $this->transmission = htmlspecialchars(strip_tags($this->transmission));
        $this->fuelType = htmlspecialchars(strip_tags($this->fuelType));
        $this->engine = htmlspecialchars(strip_tags($this->engine));
        $this->bodyType = htmlspecialchars(strip_tags($this->bodyType));
        $this->drivetrain = htmlspecialchars(strip_tags($this->drivetrain));
        $this->status = htmlspecialchars(strip_tags($this->status));

        // Bind values
        $stmt->bindParam(":year", $this->year);
        $stmt->bindParam(":make", $this->make);
        $stmt->bindParam(":model", $this->model);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":priceType", $this->priceType);
        $stmt->bindParam(":mileage", $this->mileage);
        $stmt->bindParam(":vin", $this->vin);
        $stmt->bindParam(":transmission", $this->transmission);
        $stmt->bindParam(":fuelType", $this->fuelType);
        $stmt->bindParam(":engine", $this->engine);
        $stmt->bindParam(":bodyType", $this->bodyType);
        $stmt->bindParam(":drivetrain", $this->drivetrain);
        $stmt->bindParam(":certified", $this->certified);
        $stmt->bindParam(":sale", $this->sale);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":features", $this->features);
        $stmt->bindParam(":imageUrl", $this->imageUrl);
        $stmt->bindParam(":images", $this->images);

        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    // Update vehicle
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET year=:year, make=:make, model=:model, price=:price,
                    priceType=:priceType, mileage=:mileage, vin=:vin,
                    transmission=:transmission, fuelType=:fuelType, engine=:engine,
                    bodyType=:bodyType, drivetrain=:drivetrain, certified=:certified,
                    sale=:sale, description=:description, status=:status,
                    features=:features, imageUrl=:imageUrl, images=:images
                WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->year = htmlspecialchars(strip_tags($this->year));
        $this->make = htmlspecialchars(strip_tags($this->make));
        $this->model = htmlspecialchars(strip_tags($this->model));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->priceType = htmlspecialchars(strip_tags($this->priceType));
        $this->mileage = htmlspecialchars(strip_tags($this->mileage));
        $this->vin = htmlspecialchars(strip_tags($this->vin));
        $this->transmission = htmlspecialchars(strip_tags($this->transmission));
        $this->fuelType = htmlspecialchars(strip_tags($this->fuelType));
        $this->engine = htmlspecialchars(strip_tags($this->engine));
        $this->bodyType = htmlspecialchars(strip_tags($this->bodyType));
        $this->drivetrain = htmlspecialchars(strip_tags($this->drivetrain));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind values
        $stmt->bindParam(":year", $this->year);
        $stmt->bindParam(":make", $this->make);
        $stmt->bindParam(":model", $this->model);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":priceType", $this->priceType);
        $stmt->bindParam(":mileage", $this->mileage);
        $stmt->bindParam(":vin", $this->vin);
        $stmt->bindParam(":transmission", $this->transmission);
        $stmt->bindParam(":fuelType", $this->fuelType);
        $stmt->bindParam(":engine", $this->engine);
        $stmt->bindParam(":bodyType", $this->bodyType);
        $stmt->bindParam(":drivetrain", $this->drivetrain);
        $stmt->bindParam(":certified", $this->certified);
        $stmt->bindParam(":sale", $this->sale);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":features", $this->features);
        $stmt->bindParam(":imageUrl", $this->imageUrl);
        $stmt->bindParam(":images", $this->images);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete vehicle
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
