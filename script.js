function playAnimationAndLoadContent(serviceId) {
    //URLs
    const urlMap = {
        'service-luna': 'https://luna.amazon.com/',
        'service-retropie': '/menus/emulators-menu/index.php',
        'service-xbox': 'https://xbox.com/play',
        'service-steam': 'https://store.steampowered.com/'
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