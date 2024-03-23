// script.js

document.addEventListener('DOMContentLoaded', () => {
    const connectNewButton = document.getElementById('connect-new');
    const modal = document.getElementById('network-modal');
    const closeButton = document.querySelector('.close-button');
    const networkListDiv = document.getElementById('networks-list');

    connectNewButton.addEventListener('click', () => {
        modal.style.display = 'block';
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

    function fetchNetworks() {
        fetch('scan.php')
            .then(response => response.json())
            .then(networks => {
                // Clear the current list
                const networkListDiv = document.getElementById('networks-list');
                networkListDiv.innerHTML = '';

                // Add networks to the list
                networks.forEach(network => {
                    const networkDiv = document.createElement('div');
                    networkDiv.className = 'network-name';
                    networkDiv.textContent = network;
                    networkListDiv.appendChild(networkDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching networks:', error);
            });
    }

    // Function to display networks, now using AJAX to get the data
    function displayNetworks() {
        fetch('fetch_networks.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // It's an array, proceed as expected
                    displayNetworks(data);
                } else {
                    // It's not an array, handle error or unexpected format
                    console.error('Received data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching networks:', error));
    }



    connectNewButton.addEventListener('click', () => {
        modal.style.display = 'block';
        fetchNetworks();
    });

    connectNewButton.addEventListener('click', () => {
        modal.style.display = 'block';
        displayNetworks(); // Call this function to populate the list
    });
});
