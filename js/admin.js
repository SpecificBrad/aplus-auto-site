/**
 * A+ Auto Centre - Admin Portal JavaScript
 * Handles vehicle management, form submission, and exports
 */

// Initialize
let vehicles = [];
let currentEditId = null;
let uploadedImages = [];

// Load vehicles from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadVehiclesFromStorage();
    initializeImageSlots();
    initializeTabs();
    setupWordCounter();
    loadVehicleList();
});

// Tab Management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            // Reload vehicle list if switching to manage tab
            if (tabId === 'manage-vehicles') {
                loadVehicleList();
            }
        });
    });
}

// Image Upload Management
function initializeImageSlots() {
    const imageGrid = document.getElementById('imageUploads');
    imageGrid.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        const slot = createImageSlot(i);
        imageGrid.appendChild(slot);
    }
}

function createImageSlot(index) {
    const slot = document.createElement('div');
    slot.className = 'image-upload-slot';
    slot.innerHTML = `
        <input type="file" id="image-${index}" accept="image/*" onchange="handleImageUpload(${index}, this)">
        <div class="placeholder">
            <i class="fas fa-camera"></i>
            <div>Image ${index + 1}</div>
        </div>
        <button type="button" class="remove-image" onclick="removeImage(${index})">
            <i class="fas fa-times"></i>
        </button>
    `;

    slot.addEventListener('click', (e) => {
        if (!e.target.classList.contains('remove-image') && !e.target.closest('.remove-image')) {
            slot.querySelector('input').click();
        }
    });

    return slot;
}

function handleImageUpload(index, input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const slot = input.closest('.image-upload-slot');
        slot.innerHTML = `
            <input type="file" id="image-${index}" accept="image/*" onchange="handleImageUpload(${index}, this)" style="display: none;">
            <img src="${e.target.result}" alt="Vehicle image ${index + 1}">
            <button type="button" class="remove-image" onclick="removeImage(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;

        uploadedImages[index] = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removeImage(index) {
    uploadedImages[index] = null;
    const slot = document.querySelector(`#image-${index}`).closest('.image-upload-slot');
    const newSlot = createImageSlot(index);
    slot.replaceWith(newSlot);
}

// Word Counter
function setupWordCounter() {
    const description = document.getElementById('description');
    const wordCount = document.getElementById('wordCount');

    description.addEventListener('input', function() {
        const text = this.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        wordCount.textContent = words;

        if (words > 120) {
            wordCount.style.color = 'var(--color-danger)';
        } else {
            wordCount.style.color = 'var(--color-gray)';
        }
    });
}

// Form Submission
document.getElementById('vehicleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const vehicle = {
        id: currentEditId || Date.now(),
        year: parseInt(document.getElementById('year').value),
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        price: parseInt(document.getElementById('price').value),
        priceType: document.getElementById('priceType').value,
        mileage: document.getElementById('mileage').value || 'N/A',
        vin: document.getElementById('vin').value || '',
        transmission: document.getElementById('transmission').value,
        fuelType: document.getElementById('fuelType').value,
        engine: document.getElementById('engine').value || '',
        bodyType: document.getElementById('bodyType').value || '',
        drivetrain: getDrivetrain(),
        certified: document.getElementById('certified').checked,
        features: getFeatures(),
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
        sale: document.getElementById('saleBadge').checked,
        imageUrl: uploadedImages.filter(img => img)[0] || 'https://via.placeholder.com/400x300?text=No+Image',
        images: uploadedImages.filter(img => img)
    };

    if (currentEditId) {
        // Update existing vehicle
        const index = vehicles.findIndex(v => v.id === currentEditId);
        vehicles[index] = vehicle;
        showAlert('Vehicle updated successfully!', 'success');
        currentEditId = null;
    } else {
        // Add new vehicle
        vehicles.push(vehicle);
        showAlert('Vehicle added successfully!', 'success');
    }

    saveVehiclesToStorage();
    resetForm();
    loadVehicleList();
});

function getDrivetrain() {
    if (document.getElementById('awd').checked) return 'AWD';
    if (document.getElementById('fwd').checked) return 'FWD';
    if (document.getElementById('rwd').checked) return 'RWD';
    if (document.getElementById('fourWD').checked) return '4WD';
    return '';
}

function getFeatures() {
    const features = [];

    if (document.getElementById('certified').checked) features.push('Certified');
    if (document.getElementById('lowMileage').checked) features.push('Low Mileage');
    if (getDrivetrain()) features.push(getDrivetrain());
    if (document.getElementById('transmission').value) features.push(document.getElementById('transmission').value);
    if (document.getElementById('heatedSeats').checked) features.push('Heated Seats');
    if (document.getElementById('leatherSeats').checked) features.push('Leather Seats');
    if (document.getElementById('sunroof').checked) features.push('Sunroof');
    if (document.getElementById('backupCamera').checked) features.push('Backup Camera');
    if (document.getElementById('navigation').checked) features.push('Navigation');
    if (document.getElementById('bluetooth').checked) features.push('Bluetooth');
    if (document.getElementById('cruiseControl').checked) features.push('Cruise Control');
    if (document.getElementById('remoteStart').checked) features.push('Remote Start');
    if (document.getElementById('winterTires').checked) features.push('Winter Tires Included');
    if (document.getElementById('engine').value) features.push(document.getElementById('engine').value);

    return features;
}

// Storage Management
function saveVehiclesToStorage() {
    localStorage.setItem('aplusAutoVehicles', JSON.stringify(vehicles));
}

function loadVehiclesFromStorage() {
    const stored = localStorage.getItem('aplusAutoVehicles');
    if (stored) {
        vehicles = JSON.parse(stored);
    }
}

// Vehicle List Management
function loadVehicleList() {
    const listContainer = document.getElementById('vehicleList');

    if (vehicles.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: var(--color-gray); padding: 2rem;">No vehicles added yet. Add your first vehicle to get started!</p>';
        return;
    }

    listContainer.innerHTML = vehicles.map(vehicle => `
        <div class="vehicle-item">
            <img src="${vehicle.imageUrl}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model}">
            <div class="vehicle-info">
                <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
                <p>$${vehicle.price.toLocaleString()} ${vehicle.priceType.toUpperCase()} | ${vehicle.mileage} km | ${vehicle.status}</p>
            </div>
            <div class="vehicle-actions">
                <button class="btn btn-secondary btn-small" onclick="editVehicle(${vehicle.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-secondary btn-small" onclick="deleteVehicle(${vehicle.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function editVehicle(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) return;

    currentEditId = id;

    // Populate form fields
    document.getElementById('year').value = vehicle.year;
    document.getElementById('make').value = vehicle.make;
    document.getElementById('model').value = vehicle.model;
    document.getElementById('price').value = vehicle.price;
    document.getElementById('priceType').value = vehicle.priceType;
    document.getElementById('mileage').value = vehicle.mileage === 'N/A' ? '' : vehicle.mileage;
    document.getElementById('vin').value = vehicle.vin || '';
    document.getElementById('transmission').value = vehicle.transmission;
    document.getElementById('fuelType').value = vehicle.fuelType || 'Gasoline';
    document.getElementById('engine').value = vehicle.engine || '';
    document.getElementById('bodyType').value = vehicle.bodyType || '';
    document.getElementById('description').value = vehicle.description;
    document.getElementById('status').value = vehicle.status;
    document.getElementById('certified').checked = vehicle.certified;
    document.getElementById('saleBadge').checked = vehicle.sale;

    // Set drivetrain
    if (vehicle.drivetrain === 'AWD') document.getElementById('awd').checked = true;
    if (vehicle.drivetrain === 'FWD') document.getElementById('fwd').checked = true;
    if (vehicle.drivetrain === 'RWD') document.getElementById('rwd').checked = true;
    if (vehicle.drivetrain === '4WD') document.getElementById('fourWD').checked = true;

    // Set features
    if (vehicle.features) {
        document.getElementById('lowMileage').checked = vehicle.features.includes('Low Mileage');
        document.getElementById('heatedSeats').checked = vehicle.features.includes('Heated Seats');
        document.getElementById('leatherSeats').checked = vehicle.features.includes('Leather Seats');
        document.getElementById('sunroof').checked = vehicle.features.includes('Sunroof');
        document.getElementById('backupCamera').checked = vehicle.features.includes('Backup Camera');
        document.getElementById('navigation').checked = vehicle.features.includes('Navigation');
        document.getElementById('bluetooth').checked = vehicle.features.includes('Bluetooth');
        document.getElementById('cruiseControl').checked = vehicle.features.includes('Cruise Control');
        document.getElementById('remoteStart').checked = vehicle.features.includes('Remote Start');
        document.getElementById('winterTires').checked = vehicle.features.includes('Winter Tires Included');
    }

    // Load images
    if (vehicle.images) {
        uploadedImages = [...vehicle.images];
        vehicle.images.forEach((img, index) => {
            if (img) {
                const slot = document.querySelector(`#image-${index}`).closest('.image-upload-slot');
                slot.innerHTML = `
                    <input type="file" id="image-${index}" accept="image/*" onchange="handleImageUpload(${index}, this)" style="display: none;">
                    <img src="${img}" alt="Vehicle image ${index + 1}">
                    <button type="button" class="remove-image" onclick="removeImage(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
            }
        });
    }

    // Switch to add vehicle tab
    document.querySelector('[data-tab="add-vehicle"]').click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showAlert('Editing vehicle. Update and save when ready.', 'success');
}

function deleteVehicle(id) {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    vehicles = vehicles.filter(v => v.id !== id);
    saveVehiclesToStorage();
    loadVehicleList();
    showAlert('Vehicle deleted successfully!', 'success');
}

function resetForm() {
    document.getElementById('vehicleForm').reset();
    uploadedImages = [];
    currentEditId = null;
    initializeImageSlots();
    document.getElementById('wordCount').textContent = '0';
}

// Alert System
function showAlert(message, type) {
    const alertId = type === 'success' ? 'successAlert' : 'errorAlert';
    const alert = document.getElementById(alertId);
    alert.textContent = message;
    alert.classList.add('show');

    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
}

// Export Functions
function exportWebsiteData() {
    if (vehicles.length === 0) {
        showAlert('No vehicles to export!', 'danger');
        return;
    }

    const jsContent = `/**
 * A+ Auto Centre - Vehicle Inventory Data
 * Last Updated: ${new Date().toLocaleDateString()}
 */

const vehicleInventory = ${JSON.stringify(vehicles, null, 4)};

// Export for use in inventory page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vehicleInventory;
}
`;

    downloadFile('vehicle-data.js', jsContent);
    showAlert('Website data file downloaded! Upload it to js/vehicle-data.js', 'success');
}

function exportFacebook() {
    if (vehicles.length === 0) {
        showAlert('No vehicles to export!', 'danger');
        return;
    }

    const fbText = vehicles.map(v => {
        const features = v.features ? v.features.join(' • ') : '';
        return `🚗 ${v.year} ${v.make} ${v.model}
💰 $${v.price.toLocaleString()} ${v.priceType.toUpperCase()}
📊 ${v.mileage} km | ${v.transmission}
${v.drivetrain ? '🔧 ' + v.drivetrain : ''}
${features ? '✨ ' + features : ''}

${v.description}

📍 A+ Auto Centre, St. John's, NL
📞 (709) 722-1315
🌐 Visit our website for more details

#StJohns #NL #UsedCars #AutoSales
-------------------
`}).join('\n');

    copyToClipboard(fbText);
    showAlert('Facebook listings copied to clipboard! Paste into Facebook Marketplace.', 'success');
}

function exportKijiji() {
    if (vehicles.length === 0) {
        showAlert('No vehicles to export!', 'danger');
        return;
    }

    const kijijiText = vehicles.map(v => {
        const features = v.features ? v.features.join(', ') : '';
        return `Title: ${v.year} ${v.make} ${v.model}
Price: $${v.price.toLocaleString()} ${v.priceType.toUpperCase()}
Mileage: ${v.mileage} km
Transmission: ${v.transmission}
Body Type: ${v.bodyType || 'N/A'}
Fuel Type: ${v.fuelType || 'Gasoline'}

Description:
${v.description}

Features: ${features}

Contact: A+ Auto Centre
Phone: (709) 722-1315
Location: 77 Major's Path, St. John's, NL
-------------------
`}).join('\n\n');

    copyToClipboard(kijijiText);
    showAlert('Kijiji listings copied to clipboard! Ready to paste.', 'success');
}

function exportNLClassifieds() {
    if (vehicles.length === 0) {
        showAlert('No vehicles to export!', 'danger');
        return;
    }

    const nlText = vehicles.map(v => {
        const features = v.features ? v.features.join(', ') : '';
        return `${v.year} ${v.make} ${v.model} - $${v.price.toLocaleString()} ${v.priceType.toUpperCase()}

Mileage: ${v.mileage} km
Transmission: ${v.transmission}
${v.drivetrain ? 'Drive: ' + v.drivetrain : ''}
${v.vin ? 'VIN: ' + v.vin : ''}

${v.description}

Features: ${features}

All vehicles sold inspected and fully serviced with fresh oil change!

A+ Auto Centre
(709) 722-1315
77 Major's Path, St. John's
-------------------
`}).join('\n\n');

    copyToClipboard(nlText);
    showAlert('NL Classifieds listings copied! Ready to paste into your ad.', 'success');
}

// Utility Functions
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
