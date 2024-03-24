document.addEventListener('DOMContentLoaded', () => {
    const connectNewButton = document.getElementById('connect-new');
    const modal = document.getElementById('network-modal');
    const closeButton = document.querySelector('.close-button');
    const networkListDiv = document.getElementById('networks-list');
    const networkPasswordInput = document.getElementById('network-password-input');
    const connectButton = document.getElementById('connect-button');
    const networkPassword = document.getElementById('network-password');
    const networkNameDisplay = document.getElementById('network-name-display');
    let selectedNetwork = '';

    function toggleModal(show) {
        modal.style.display = show ? 'block' : 'none';
        if (show) {
            networkPasswordInput.style.display = 'none'; // Hide password input initially
            fetchAndDisplayNetworks();
        }
    }

    // Function to fetch and display networks
    function fetchAndDisplayNetworks() {
        console.log('Scanning for networks...');
        fetch('fetch_networks.php')
            .then(response => response.json())
            .then(data => {
                networkListDiv.innerHTML = ''; // Clear current list
                if (data.error) {
                    console.error('Error fetching networks:', data.error);
                    networkListDiv.textContent = 'Error fetching networks.';
                } else {
                    data.forEach(network => {
                        const networkDiv = document.createElement('div');
                        networkDiv.className = 'network-name';
                        networkDiv.textContent = network;
                        networkDiv.addEventListener('click', () => {
                            selectedNetwork = network;
                            networkNameDisplay.textContent = `Connect to ${selectedNetwork}`;
                            networkPassword.value = ''; // Clear password input
                            networkPasswordInput.style.display = 'block'; // Show password input for selected network
                        });
                        networkListDiv.appendChild(networkDiv);
                    });
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                networkListDiv.textContent = 'Error fetching networks.';
            });
    }

    // Function to attempt network connection
    function attemptConnection(networkName, password) {
        fetch('connect_to_network.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ networkName: networkName, password: password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Connected successfully to', networkName);
                } else {
                    console.error('Failed to connect to', networkName, ':', data.error);
                }
            })
            .catch(error => console.error('Error connecting to network:', error));
    }

    connectNewButton.addEventListener('click', () => toggleModal(true));
    closeButton.addEventListener('click', () => toggleModal(false));
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    // Connect button logic
    connectButton.addEventListener('click', () => {
        const password = networkPassword.value;
        if (selectedNetwork && password) {
            // Prevent the modal from closing
            // modal.style.display = 'none'; // Remove or comment out this line

            // Perform the network connection attempt
            console.log(`Attempting to connect to ${selectedNetwork}...`);

            // Send the connection request to the server
            fetch('connect_to_network.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    networkName: selectedNetwork,
                    password: password,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log("Connected successfully to " + selectedNetwork);
                    } else {
                        console.error("Failed to connect to " + selectedNetwork + ". Error: " + data.error);
                    }
                })
                .catch(error => {
                    console.error('Connection error:', error);
                });
        } else {
            console.error('Network name or password is missing.');
        }
    });

    // Periodic network scanning
    const scanInterval = 30000; // 30 seconds
    setInterval(fetchAndDisplayNetworks, scanInterval);
});
