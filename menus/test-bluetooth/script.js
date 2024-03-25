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
        connectModal.style.display = 'block';
        scanForBluetoothDevices(); // Using Web Bluetooth API
    };

    // Open "Delete a Device" Modal
    deleteSavedButton.onclick = function () {
        deleteModal.style.display = 'block'; // Show the modal for deleting devices
        listPairedDevices(); // Call the function to list paired devices
    };

    // Go back to the main menu
    mainMenuButton.onclick = function () {
        window.location.href = '/';
    };

    // Close "Connect a New Device" Modal
    closeConnectModalButton.onclick = function () {
        connectModal.style.display = 'none';
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    // Close "Delete a Device" Modal
    closeDeleteModalButton.onclick = function () {
        deleteModal.style.display = 'none';
    };

    // Close modals if outside click
    window.onclick = function (event) {
        if (event.target == connectModal) {
            connectModal.style.display = 'none';
            if (intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }
    };

    // Global variable to store the interval ID
    var intervalId = null;

    function scanForBluetoothDevices() {
        console.log("Scanning for Bluetooth devices...");

        // Function to fetch devices and update UI
        function fetchAndUpdate() {
            fetch('list_bluetooth_devices.php')
                .then(response => response.json())
                .then(devices => {
                    console.log("Bluetooth devices found:");
                    devices.forEach(device => {
                        console.log(device);
                        updateDeviceListUI(device);
                    });
                })
                .catch(error => {
                    console.error(`Error fetching Bluetooth devices: ${error}`);
                });
        }

        // Call immediately, then set interval
        fetchAndUpdate();
        intervalId = setInterval(fetchAndUpdate, 5000);
    }


    function updateDeviceListUI(device) {
        const bluetoothList = document.getElementById('bluetooth-list');
        if (!bluetoothList) return;

        // Split the device string. This example assumes the format "Device [MAC] [Device Name]".
        // Adjust the parsing logic based on your actual format.
        const deviceParts = device.trim().split(' '); // Trim whitespace and split by spaces.
        if (deviceParts.length < 3) return; // Ensure we have at least three parts: "Device", "MAC", "Name"

        const macAddress = deviceParts[1];
        const deviceName = deviceParts.slice(2).join(' '); // Reconstruct device name from remaining parts.

        // Check if a button for this device already exists to prevent duplicates.
        if (document.querySelector(`button[data-mac='${macAddress}']`)) {
            return; // If a button for this device exists, don't create a new one.
        }

        // Create a button for each device.
        const button = document.createElement('button');
        button.textContent = `${deviceName} (${macAddress})`; // Set button text to "Device Name (MAC)"
        button.dataset.mac = macAddress; // Use a data attribute to store the MAC address for later retrieval.
        button.classList.add('bluetooth-button'); // Add a class for styling.

        // Add click event listener for the button to initiate a connection attempt.
        button.addEventListener('click', () => {
            console.log("Attempting to connect to device:", deviceName, macAddress);

            fetch('connect_to_device.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `macAddress=${encodeURIComponent(macAddress)}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log("Connection successful:", data.output);
                        alert(`Connected to ${deviceName} successfully.`);
                        // Implement additional logic as needed, e.g., updating UI or storing connected device info.
                    } else {
                        console.error("Connection failed:", data.output);
                        alert(`Failed to connect to ${deviceName}.`);
                    }
                })
                .catch(error => {
                    console.error("Error connecting to device:", error);
                    alert(`Error connecting to ${deviceName}.`);
                });
        });

        bluetoothList.appendChild(button);
    }




    function listPairedDevices() {
        fetch('list_paired_devices.php')
            .then(response => response.json())
            .then(devices => {
                const pairedDevicesList = document.getElementById('paired-devices-list');
                pairedDevicesList.innerHTML = ''; // Clear the list before adding new items

                devices.forEach(device => {
                    const button = document.createElement('button');
                    button.textContent = `${device.name} (${device.mac})`;
                    button.classList.add('device-button'); // Add styling class, define this in your CSS
                    button.dataset.mac = device.mac; // Store the MAC address in the button for later use

                    // Event listener for when a device button is clicked
                    button.onclick = function () {
                        const macAddress = this.dataset.mac; // Retrieve the MAC address stored in data-mac attribute
                        if (confirm(`Are you sure you want to unpair ${device.name}?`)) { // Confirm with the user
                            fetch('unpair_device.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: `macAddress=${encodeURIComponent(macAddress)}`
                            })
                                .then(response => response.json())
                                .then(data => {
                                    if (data.success) {
                                        console.log(data.message);
                                        alert(data.message);
                                        // Optionally, refresh the list of paired devices
                                        listPairedDevices();
                                    } else {
                                        console.error(data.message);
                                        alert(data.message);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error unpairing device:', error);
                                });
                        }
                    };


                    pairedDevicesList.appendChild(button); // Add the button to the modal's device list
                });
            })
            .catch(error => {
                console.error('Error fetching paired devices:', error);
            });
    }





    function removeDevice(macAddress) {
        fetch('remove_device.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `macAddress=${encodeURIComponent(macAddress)}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Device removed successfully:", data.output);
                    alert(`Device (${macAddress}) removed successfully.`);
                    // Optionally refresh the list of paired devices
                    listPairedDevices();
                } else {
                    console.error("Failed to remove device:", data.output);
                    alert(`Failed to remove device (${macAddress}).`);
                }
            })
            .catch(error => {
                console.error("Error removing device:", error);
                alert(`Error removing device (${macAddress}).`);
            });
    }



    // More functions can be added here for connecting to and deleting devices
});
