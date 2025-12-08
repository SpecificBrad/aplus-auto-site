/**
 * A+ Auto Centre - Vehicle Inventory Data
 * Source: Scraped from NLClassifieds.com/APlusAutoCentre
 * Last Updated: December 8, 2024
 */

const vehicleInventory = [
    {
        id: 1,
        year: 2014,
        make: "Hyundai",
        model: "Elantra",
        price: 4995,
        priceType: "firm",
        mileage: "N/A",
        transmission: "Automatic",
        fuelType: "Gasoline",
        engine: "4-Cylinder",
        bodyType: "Sedan",
        certified: true,
        features: ["Automatic Transmission", "4-Cylinder", "Excellent Gas Mileage", "Fresh Oil Change", "Detailed"],
        description: "In the market for a second car or a car for that special someone attending school or university, well here it is! Car will be sold inspected and fully serviced with a fresh oil and filter change. Car has a automatic transmission with a 4 cylinder engine that provides excellent gas mileage. Car was just detailed inside and out.",
        status: "available",
        imageUrl: "images/vehicles/2014-hyundai-elantra.jpg"
    },
    {
        id: 2,
        year: 2016,
        make: "Hyundai",
        model: "Elantra",
        price: 5995,
        priceType: "obo",
        mileage: "154,000",
        transmission: "Automatic",
        fuelType: "Gasoline",
        engine: "4-Cylinder",
        bodyType: "Sedan",
        certified: true,
        features: ["Automatic Transmission", "4-Cylinder", "Excellent Gas Mileage", "Fresh Oil Change", "Sporty"],
        description: "New to inventory is this little sporty Hyundai Elantra. Car has a automatic transmission with a 4 cylinder engine that provides excellent gas mileage. Car will be sold fully inspected and serviced with a fresh oil change to get you started the right way.",
        status: "available",
        sale: true,
        imageUrl: "images/vehicles/2016-hyundai-elantra.jpg"
    },
    {
        id: 3,
        year: 2012,
        make: "Honda",
        model: "CRV",
        price: 9995,
        priceType: "obo",
        mileage: "135,000",
        transmission: "Automatic",
        fuelType: "Gasoline",
        engine: "4-Cylinder",
        bodyType: "SUV",
        drivetrain: "AWD",
        certified: true,
        features: ["AWD", "4-Cylinder", "Low Mileage", "Excellent Gas Mileage", "Fresh Oil Change", "Detailed"],
        description: "In excellent shape inside and out with low kms with just 135k kms. Comes with a 4 cylinder engine with automatic transmission with AWD that gives you great gas mileage. Will be sold inspected and fully serviced with a great oil and filter change. Just has a detail inside and out, paint and fabric are in awesome shape.",
        status: "available",
        imageUrl: "images/vehicles/2012-honda-crv.jpg"
    },
    {
        id: 4,
        year: 2015,
        make: "BMW",
        model: "X3",
        price: 10995,
        priceType: "obo",
        mileage: "180,523",
        transmission: "Automatic",
        fuelType: "Gasoline",
        bodyType: "SUV",
        drivetrain: "AWD",
        certified: true,
        features: ["AWD", "Heated Leather Seats", "Heated Steering Wheel", "Heated Mirrors", "Premium Package", "Fresh Oil Change", "Fully Loaded"],
        description: "Black Beauty!!! Just arrived is this X3 with 180kms. Selling inspected and fully serviced with a fresh oil and filter change. Has every available option for the year! Beautiful heated leather seats, heated steering wheel, heated mirrors, you name it this BMW has it!",
        status: "available",
        imageUrl: "images/vehicles/2015-bmw-x3.jpg"
    },
    {
        id: 5,
        year: 2013,
        make: "Kia",
        model: "Soul",
        price: 6995,
        priceType: "firm",
        mileage: "Low",
        transmission: "Automatic",
        fuelType: "Gasoline",
        bodyType: "Hatchback",
        certified: true,
        features: ["Low Mileage", "Winter Tires Included", "Fresh Oil Change", "Great Condition"],
        description: "Selling a Kia Soul inspected with a fresh oil change. Car is in great shape inside and out and drives even better. Comes with winter tires already installed to face old man winter.",
        status: "available",
        imageUrl: "images/vehicles/2013-kia-soul.jpg"
    }
];

// Export for use in inventory page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vehicleInventory;
}
