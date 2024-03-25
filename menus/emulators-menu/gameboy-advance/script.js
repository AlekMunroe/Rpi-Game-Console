function playAnimationAndLoadContent(serviceId) {
    //URLs
    const urlMap = {
        'EmuJS': '/menus/emulators/emujs/index.html',
        'JSMAME': '/menus/emulators/jsmame/',
    };

    window.urlMap = urlMap; //Make the URLs public

    //Open the URL in a new tab (So we can go back later)
    const newTab = window.open(urlMap[serviceId], '_blank');

    //Save the reference to the new tab globally if needed later
    window.lastOpenedTab = newTab;
}

function openSettings() {
    window.location.href = "menus/settings/index.php";
}

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.querySelector('.dashboard');
    const gameButtons = document.querySelectorAll('.game-button');

    // Centers the selected button in the dashboard's view
    window.scrollToButton = function (index) {
        if (gameButtons.length === 0) return; // Check if there are any game buttons

        const selectedButton = gameButtons[index];
        // Calculate the scroll position to center the button
        const scrollPosition = selectedButton.offsetLeft + selectedButton.offsetWidth / 2 - dashboard.offsetWidth / 2;
        // Scroll the dashboard horizontally to center the selected button
        dashboard.scrollLeft = scrollPosition;
    };

    // Initial call to scrollToButton to center the first game button if it exists
    if (gameButtons.length > 0) {
        setTimeout(() => scrollToButton(0), 100); // Timeout to ensure layout is stable
    }

    // Attach click event listeners to game buttons
    gameButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const gamePath = this.getAttribute('data-game-path');
            const gameName = this.textContent;

            // Construct URL with query parameters for the game path and name
            const runGameUrl = `rungame.php?gamePath=${encodeURIComponent(gamePath)}&gameName=${encodeURIComponent(gameName)}`;

            // Navigate to the URL to load the game
            window.location.href = runGameUrl;
        });
    });
});
