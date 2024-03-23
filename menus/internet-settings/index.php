<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Console - Internet Settings</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="settings-menu">
    <button class="settings-button" id="connect-new">Connect to a new network</button>
    <button class="settings-button" id="join-saved">Join a saved network</button>
    <button class="settings-button" id="delete-saved">Delete a saved network</button>
</div>

<div id="network-modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Available Networks</h2>
        <div id="networks-list">
            <!-- Dynamically populated list of networks will go here -->
        </div>
        <div id="network-password-input">
            <input type="password" placeholder="Enter Password">
            <button id="connect-button">Connect</button>
        </div>
    </div>
</div>

<script src="script.js"></script>
<script src="input.js"></script>
</body>
</html>