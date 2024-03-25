<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Console - Bluetooth Settings</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="gamepad-unsupported-notice">
    Warning: Gamepad unsupported in settings
</div>

<div class="settings-menu">
    <!--TODO: Make bluetooth work in the site rather than with google's API-->
    <button class="settings-button" id="connect-new">Connect a new device</button>
    <!--<button class="settings-button" id="delete-saved">Delete a device</button>-->
    <button class="settings-button" id="main-menu">Main Menu</button>
</div>

<div id="bluetooth-connect-modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Available Devices</h2>
        <div id="bluetooth-list">
            <!-- Dynamically populated list of Bluetooth devices will go here -->
        </div>
        <!-- Additional modal content for connecting devices -->
    </div>
</div>

<div id="bluetooth-delete-modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Delete Paired Device</h2>
        <div id="paired-devices-list">
            <!-- Dynamically populated list of paired devices will go here -->
        </div>
        <!-- Additional modal content for deleting devices -->
    </div>
</div>

<script src="script.js"></script>
</body>
</html>
