document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('network-modal');
    var btn = document.getElementById('connect-new');
    var backbtn = document.getElementById('main-menu');
    var span = document.getElementsByClassName('close-button')[0];

    backbtn.onclick = function () {
        window.location.href = '/';
    }

    btn.onclick = function () {
        modal.style.display = 'block';
        fetchAvailableNetworks();
        fetchCurrentNetwork();
    }

    span.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    function fetchAvailableNetworks() {
        fetch('fetch_available_networks.php')
            .then(response => response.json())
            .then(data => {
                const networksList = document.getElementById('networks-list');
                networksList.innerHTML = '';
                data.forEach(ssid => {
                    if (ssid) {
                        const button = document.createElement('button');
                        button.textContent = ssid;
                        button.classList.add('network-button');
                        button.onclick = function () {
                            showPasswordInput(ssid);
                        };
                        networksList.appendChild(button);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching networks:', error);
            });
    }

    function fetchCurrentNetwork() {
        fetch('get_current_network.php')
            .then(response => response.json())
            .then(data => {
                const currentNetworkDisplay = document.getElementById('current-network-name');
                if (data && data.currentNetwork) {
                    currentNetworkDisplay.textContent = data.currentNetwork;
                } else {
                    currentNetworkDisplay.textContent = 'Not connected';
                }
            })
            .catch(error => {
                console.error('Error fetching current network:', error);
                document.getElementById('current-network-name').textContent = 'Error';
            });
    }


    function showPasswordInput(ssid) {
        const passwordInputDiv = document.getElementById('network-password-input');
        const networkNameDisplay = document.getElementById('network-name-display');
        networkNameDisplay.textContent = 'Network: ' + ssid;

        const connectButton = document.getElementById('connect-button');
        const passwordField = document.getElementById('network-password');
        passwordField.value = ''; // Clear previous input

        // Ensure the message display element exists
        let messageDisplay = document.getElementById('network-message-display');
        if (!messageDisplay) {
            messageDisplay = document.createElement('div');
            messageDisplay.id = 'network-message-display';
            passwordInputDiv.appendChild(messageDisplay);
        }

        connectButton.onclick = function () {
            const password = passwordField.value;
            messageDisplay.textContent = ''; // Clear previous messages

            fetch('connect_to_network.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `ssid=${encodeURIComponent(ssid)}&password=${encodeURIComponent(password)}`,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        messageDisplay.textContent = data.message;
                        messageDisplay.style.color = 'green';
                    } else {
                        messageDisplay.textContent = data.message;
                        messageDisplay.style.color = 'red';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    messageDisplay.textContent = 'Connection error. Please try again.';
                    messageDisplay.style.color = 'red';
                });
        };

        passwordInputDiv.style.display = 'block';
    }
});
