<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Console - Emulators</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dashboard">
    <?php
    $services = ['SNES', 'NES', 'N64', 'MAME', 'Arcade', 'GB', 'GBA', 'NDS', 'PSX'];
    foreach ($services as $service) {
        echo "<div class='service' id='service-" . strtolower($service) . "' onclick='playAnimationAndLoadContent(this.id)'>";
        echo "<img src='/img/emulators/" . strtolower($service) . "_logo.png' alt='" . $service . " Logo'>";
        echo "</div>";
    }
    ?>
</div>
<script src="script.js"></script>
<script src="input.js"></script>
</body>
</html>
