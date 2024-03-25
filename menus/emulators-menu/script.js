function playAnimationAndLoadContent(serviceId) {
    // Updated URLs
    const urlMap = {
        'service-snes': '/menus/emulators-menu/snes',
        'service-nes': '/menus/emulators-menu/nes',
        'service-n64': '/menus/emulators-menu/n64',
        'service-mame': '/menus/emulators-menu/mame',
        'service-arcade': '/menus/emulators-menu/arcade',
        'service-gb': '/menus/emulators-menu/gameboy',
        'service-gba': '/menus/emulators-menu/gameboy-advance',
        'service-nds': '/menus/emulators-menu/nds',
        'service-psx': '/menus/emulators-menu/playstation',
    };

    // Check if the serviceId exists in the urlMap and open it in a new tab
    if (urlMap[serviceId]) {
        const newTab = window.open(urlMap[serviceId], '_blank');
        // Save the reference to the new tab globally if needed later
        window.lastOpenedTab = newTab;
    } else {
        console.error('Service ID not found in URL map:', serviceId);
    }
}

function openSettings() {
    window.location.href = "menus/settings/index.php";
}
