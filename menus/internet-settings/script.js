// script.js

document.addEventListener('DOMContentLoaded', () => {
    const connectNewButton = document.getElementById('connect-new');
    const modal = document.getElementById('network-modal');
    const closeButton = document.querySelector('.close-button');
    const networkListDiv = document.getElementById('networks-list');

    // Function to fetch and display networks
    function fetchAndDisplayNetworks() {
        fetch('fetch_networks.php')
            .then(response => response.json())
            .then(data => {
                networkListDiv.innerHTML = ''; // Clear current list
                if (data.error) {
                    // If the PHP script returned an error, log it
                    console.error('Error fetching networks:', data.error);
                    networkListDiv.textContent = 'Error fetching networks.';
                } else {
                    // Iterate over the network data and append it to the list
                    data.forEach(network => {
                        const networkDiv = document.createElement('div');
                        networkDiv.className = 'network-name';
                        networkDiv.textContent = network;
                        networkListDiv.appendChild(networkDiv);
                    });
                }
            })
            .catch(error => {
                // Log any fetch errors
                console.error('Fetch error:', error);
                networkListDiv.textContent = 'Error fetching networks.';
            });
    }

    connectNewButton.addEventListener('click', () => {
        modal.style.display = 'block';
        fetchAndDisplayNetworks(); // Fetch and display networks when modal is shown
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal if the user clicks anywhere outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
