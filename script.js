function playAnimationAndLoadContent(serviceId) {
    // Define your URL map as before
    const urlMap = {
        'service-luna': 'https://luna.amazon.com/',
        'service-retropie': 'http://retropie.local/',
        'service-xbox': 'https://xbox.com/play',
        'service-steam': 'https://store.steampowered.com/'
    };

    window.urlMap = urlMap; // Make it accessible globally

    // Use window.open to open the new tab
    const newTab = window.open(urlMap[serviceId], '_blank');

    // Save the reference to the new tab globally if needed for later
    window.lastOpenedTab = newTab;
}

function openSettings() {
    window.location.href = "menus/settings/index.php";
}