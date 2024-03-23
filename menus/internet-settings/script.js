// script.js

document.addEventListener('DOMContentLoaded', () => {
    const connectNewButton = document.getElementById('connect-new');
    const modal = document.getElementById('network-modal');
    const closeButton = document.querySelector('.close-button');
    const networkListDiv = document.getElementById('networks-list');
    let fetchInterval; // To store the interval ID

    // Function to fetch and display networks
    function fetchAndDisplayNetworks() {
        fetch('fetch_networks.php')
            .then(response => response.json())
            .then(data => {
                networkListDiv.innerHTML = ''; // Clear current list
                if (data.error) {
                    console.error('Error fetching networks:', data.error);
                    networkListDiv.textContent = 'Error fetching networks.';
                } else {
                    data.forEach(network => {
                        if (network) { // Make sure the network name is not empty
                            const networkDiv = document.createElement('div');
                            networkDiv.className = 'network-name';
                            networkDiv.textContent = network;
                            networkListDiv.appendChild(networkDiv);
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                networkListDiv.textContent = 'Error fetching networks.';
            });
    }

    // Function to display password input and connect button
    function showPasswordInput(networkName) {
        // You might have a separate modal or input area for this
        const passwordInputArea = document.getElementById('password-input-area');
        document.getElementById('network-name-display').textContent = networkName; // Display the selected network name
        passwordInputArea.style.display = 'block'; // Show the input area

        // Save the selected network name for use when connecting
        document.getElementById('connect-button').onclick = () => connectToNetwork(networkName);
    }

    // Function to connect to the selected network
    function connectToNetwork(networkName) {
        const password = document.getElementById('network-password').value; // Get the password from the input field

        // Send the network name and password to the backend for connection
        fetch('connect_to_network.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ networkName, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Connection successful
                    alert('Connected to ' + networkName);
                } else {
                    // Failed to connect
                    alert('Failed to connect to ' + networkName + '. ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error connecting to network:', error);
            });
    }

    connectNewButton.addEventListener('click', () => {
        modal.style.display = 'block';
        fetchAndDisplayNetworks(); // Initial fetch
        // Start periodically updating networks every 10 seconds
        fetchInterval = setInterval(fetchAndDisplayNetworks, 10000);
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        clearInterval(fetchInterval); // Stop updating when modal is closed
    });

    // Close the modal if the user clicks anywhere outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            clearInterval(fetchInterval);
        }
    });
});
