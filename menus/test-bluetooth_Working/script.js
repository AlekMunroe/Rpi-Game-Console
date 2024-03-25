document.addEventListener('DOMContentLoaded', function () {
    // Correctly reference the "Connect a New Device" Modal
    var connectModal = document.getElementById('bluetooth-connect-modal');
    // Correctly reference the "Delete a Device" Modal
    var deleteModal = document.getElementById('bluetooth-delete-modal');

    // Buttons to open modals
    var connectNewButton = document.getElementById('connect-new');
    var deleteSavedButton = document.getElementById('delete-saved');
    var mainMenuButton = document.getElementById('main-menu');

    // Close buttons inside modals
    var closeConnectModalButton = connectModal.querySelector('.close-button');
    var closeDeleteModalButton = deleteModal.querySelector('.close-button');

    // Open "Connect a New Device" Modal
    connectNewButton.onclick = function () {
        //connectModal.style.display = 'block';
        scanForBluetoothDevices(); // Using Web Bluetooth API
    };

    // Open "Delete a Device" Modal
    deleteSavedButton.onclick = function () {
        deleteModal.style.display = 'block';
        listPairedDevices(); // Placeholder for actual function
    };

    // Go back to the main menu
    mainMenuButton.onclick = function () {
        window.location.href = '/';
    };

    // Close "Connect a New Device" Modal
    closeConnectModalButton.onclick = function () {
        connectModal.style.display = 'none';
    };

    // Close "Delete a Device" Modal
    closeDeleteModalButton.onclick = function () {
        deleteModal.style.display = 'none';
    };

    // Close modals if outside click
    window.onclick = function (event) {
        if (event.target == connectModal) {
            connectModal.style.display = 'none';
        } else if (event.target == deleteModal) {
            deleteModal.style.display = 'none';
        }
    };

    function scanForBluetoothDevices() {
        console.log("Scanning for Bluetooth devices...");
        navigator.bluetooth.requestDevice({
            // Filters for devices you are interested in connecting to
            acceptAllDevices: true,
            optionalServices: ['battery_service'] // Replace with services you are interested in
        })
            .then(device => {
                console.log(`Device found: ${device.name}`);
                // Continue with connecting to the device and setting up GATT communication
            })
            .catch(error => {
                console.log(`Error during Bluetooth device scanning: ${error}`);
            });
    }



    function listPairedDevices() {
        // TODO: Implement listing of paired devices, fetch from a PHP script, and populate the list for deletion
    }

    // More functions can be added here for connecting to and deleting devices
});
