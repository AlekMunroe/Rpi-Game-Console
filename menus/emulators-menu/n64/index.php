<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Console - Emulators - N64</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dashboard">
    <?php
    // Define the path to the ROM files relative to the document root
    $dir = '/menus/emulators/roms/n64/';

    // Ensure this path is accessible via the server filesystem
    // $_SERVER['DOCUMENT_ROOT'] provides the absolute path to the document root
    $absolutePath = $_SERVER['DOCUMENT_ROOT'] . '/' . $dir;

    // Scan the directory for files, excluding '.' and '..'
    $games = array_diff(scandir($absolutePath), array('..', '.'));

    // Iterate over the games array to create a button for each game
    foreach ($games as $game) {
        // Skip files starting with ._
        if (strpos($game, '._') === 0) {
            continue;
        }

        // Extract the game name without the file extension for display
        $gameName = pathinfo($game, PATHINFO_FILENAME);

        // Generate a button for each game, excluding those starting with ._ 
        echo "<button class='game-button' data-game-path='" . htmlspecialchars($dir . $game) . "'>" . htmlspecialchars($gameName) . "</button>";
    }
    ?>
</div>
<script src="script.js"></script>
<script src="input.js"></script>
</body>
</html>
