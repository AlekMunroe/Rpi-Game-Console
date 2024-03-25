<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Console - Internet Settings</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="gamepad-unsupported-notice">
    Warning: Gamepad unsupported in settings
</div>

<div class="settings-menu">
    <button class="settings-button" id="connect-new">Connect to a new network</button>
    <!--TODO: ADD SAVED NETWORKS-->
    <!--<button class="settings-button" id="join-saved">Join a saved network</button>
    <button class="settings-button" id="delete-saved">Delete a saved network</button>-->
    <button class="settings-button" id="main-menu">Main Menu</button>
</div>

<div id="network-modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Available Networks</h2>
        <!-- Add current network display here -->
        <div id="current-network-display">Current Network: <span id="current-network-name">Loading...</span></div>
        <div id="networks-list">
            <!-- Dynamically populated list of networks will go here -->
        </div>
        <!-- Rest of your modal content -->
    </div>
</div>


<script src="script.js"></script>
</body>
</html>
