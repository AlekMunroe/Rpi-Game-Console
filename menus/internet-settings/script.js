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
                        if (network) { // Ensure the network name isn't empty
                            const networkDiv = document.createElement('div');
                            networkDiv.className = 'network-name';
                            networkDiv.textContent = network;
                            networkDiv.addEventListener('click', () => {
                                selectedNetwork = network;
                                networkNameDisplay.textContent = `Connect to ${selectedNetwork}`;
                                networkPassword.value = ''; // Clear password input
                                networkPasswordInput.style.display = 'block'; // Show password input
                            });
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

    connectNewButton.addEventListener('click', () => toggleModal(true));
    closeButton.addEventListener('click', () => toggleModal(false));

    // Close the modal if the user clicks anywhere outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    // Connect button logic
    connectButton.addEventListener('click', () => {
        const password = networkPassword.value;
        if (selectedNetwork && password) {
            console.log(`Attempting to connect to ${selectedNetwork}...`);
            // Here you would add the fetch request to connect to the selected network
            // For demonstration, we're just logging to the console
            console.log(`Connecting to ${selectedNetwork} with password ${password}`);
            // Reset UI elements
            selectedNetwork = '';
            toggleModal(false);
        } else {
            console.error('Network name or password is missing.');
        }
    });

    // Periodic network scanning
    const scanInterval = 30000; // 30 seconds
    setInterval(fetchAndDisplayNetworks, scanInterval);
});
