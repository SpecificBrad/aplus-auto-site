/**
 * Import existing vehicles from vehicle-data.js into database
 */

const vehicleData = require('../js/vehicle-data.js');
const { getDatabase } = require('./database');

const db = getDatabase();

console.log(`\n📦 Importing ${vehicleData.length} vehicles into database...\n`);

const sql = `
    INSERT INTO vehicles (
        year, make, model, price, priceType, mileage, vin,
        transmission, fuelType, engine, bodyType, drivetrain,
        certified, sale, description, status, features, imageUrl, images
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

let imported = 0;
let errors = 0;

vehicleData.forEach((vehicle, index) => {
    const params = [
        vehicle.year,
        vehicle.make,
        vehicle.model,
        vehicle.price,
        vehicle.priceType || 'obo',
        vehicle.mileage || 'N/A',
        vehicle.vin || '',
        vehicle.transmission,
        vehicle.fuelType || 'Gasoline',
        vehicle.engine || '',
        vehicle.bodyType || '',
        vehicle.drivetrain || '',
        vehicle.certified ? 1 : 0,
        vehicle.sale ? 1 : 0,
        vehicle.description || '',
        vehicle.status || 'available',
        JSON.stringify(vehicle.features || []),
        vehicle.imageUrl || '',
        JSON.stringify(vehicle.images || [vehicle.imageUrl])
    ];

    db.run(sql, params, function(err) {
        if (err) {
            console.error(`❌ Error importing ${vehicle.year} ${vehicle.make} ${vehicle.model}:`, err.message);
            errors++;
        } else {
            imported++;
            console.log(`✅ Imported: ${vehicle.year} ${vehicle.make} ${vehicle.model} - $${vehicle.price.toLocaleString()}`);
        }

        // Close database after last vehicle
        if (index === vehicleData.length - 1) {
            setTimeout(() => {
                db.close((err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log(`\n✨ Import complete: ${imported} vehicles imported, ${errors} errors`);
                    process.exit(0);
                });
            }, 100);
        }
    });
});
