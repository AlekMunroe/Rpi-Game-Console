<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Console</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="top-menu">
    <!-- Placeholder button -->
    <div class="top-button placeholder">
        <img src="img/icons/placeholder.png" alt="Placeholder">
    </div>
    <!-- Settings button -->
    <div class="top-button" id="settings-button" onclick="openSettings()">
        <img src="img/icons/settings-cog.png" alt="Settings">
    </div>
</div>
<div class="dashboard">
    <?php
    $services = ['Luna', 'RetroPie', 'Xbox', 'Steam'];
    foreach ($services as $service) {
        echo "<div class='service' id='service-" . strtolower($service) . "' onclick='playAnimationAndLoadContent(this.id)'>";
        echo "<img src='/img/services/" . strtolower($service) . "_logo.png' alt='" . $service . " Logo'>";
        echo "</div>";
    }
    ?>
</div>
<script src="script.js"></script>
<script src="input.js"></script>
</body>
</html>
