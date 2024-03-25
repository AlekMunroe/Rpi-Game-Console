<!DOCTYPE html>
<html>
<head>
    <title>Play Game</title>
    <link rel="icon" href="docs/favicon.ico" sizes="16x16 32x32 48x48 64x64" type="image/vnd.microsoft.icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden; /* Prevent scrolling */
        }
        #top {
            display: none; /* Hide or adjust this as needed */
        }
        #emulator {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
    <div id="top">
        <!-- Top Content -->
    </div>
    <div id="emulator">
        <!-- Emulator will render here -->
    </div>

    <script>
        <?php
        // Retrieve gamePath and gameName from the query parameters
        $gamePath = $_GET['gamePath'] ?? '';
        $gameName = $_GET['gameName'] ?? '';

        // Ensure the values are properly sanitized to prevent security issues
        // This example lacks sanitization for simplicity. Implement as needed.
        ?>

        const gameUrl = '<?php echo htmlspecialchars($gamePath); ?>';

        window.EJS_player = "#emulator";
        window.EJS_gameName = "<?php echo htmlspecialchars($gameName); ?>";
        window.EJS_gameUrl = gameUrl;
        window.EJS_core = "nds";
        window.EJS_pathtodata = "/menus/emulators/emujs/data/";
        window.EJS_startOnLoaded = true;
        window.EJS_disableDatabases = true;

        const script = document.createElement("script");
        script.src = "/menus/emulators/emujs/data/loader.js";
        document.body.appendChild(script);
    </script>
</body>
</html>
