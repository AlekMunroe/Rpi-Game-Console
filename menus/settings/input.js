document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const settingsButtons = document.querySelectorAll('.settings-button');
    let inputCooldown = true; //Default to true as button will be pressed upon switching pages

    activateCooldown(); //Activating at start to disable

    updateHover(currentIndex);
    settingsButtons.forEach((button, index) => {
        button.addEventListener('click', () => navigateTo(button.id)); // Attach click listener
        button.addEventListener('mouseover', () => updateHover(index)); // Update hover on mouseover
    })

    function updateHover(index) {
        settingsButtons.forEach(button => button.classList.remove('hover'));
        index = Math.max(0, Math.min(index, settingsButtons.length - 1));
        settingsButtons[index].classList.add('hover');
        currentIndex = index;
    }

    function navigateTo(selectedButtonId) {
        let url = '/'; // Default URL
        switch (selectedButtonId) {
            case 'internet':
                url = '/menus/internet-settings/index.php';
                break;
            case 'bluetooth':
                url = '/menus/bluetooth-settings/index.php';
                break;
            case 'developer':
                url = '/menus/developer-settings/index.php';
                break;
        }
        window.location.href = url;
    }

    function selectCurrentButton() {
        navigateTo(settingsButtons[currentIndex].id);
    }


    function goBack() {
        window.location.href = '/';
    }

    document.addEventListener('keydown', (event) => {
        let newIndex = currentIndex;
        switch (event.key) {
            case 'ArrowUp':
                newIndex = Math.max(0, currentIndex - 1);
                break;
            case 'ArrowDown':
                newIndex = Math.min(settingsButtons.length - 1, currentIndex + 1);
                break;
            case 'Enter': // Bind the Enter key to select the current button
                selectCurrentButton();
                return; // Prevent further processing
        }
        updateHover(newIndex);
    });

    let gamepadIndex;

    function scanGamepads() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if (gamepads[gamepadIndex] && !inputCooldown) {
            let gp = gamepads[gamepadIndex];

            if ((gp.buttons[12].pressed || gp.axes[1] < -0.5)) {
                updateHover(Math.max(0, currentIndex - 1));
                activateCooldown();
            }

            else if ((gp.buttons[13].pressed || gp.axes[1] > 0.5)) {
                updateHover(Math.min(settingsButtons.length - 1, currentIndex + 1));
                activateCooldown();
            }

            else if (gp.buttons[0].pressed) {
                selectCurrentButton();
                activateCooldown();
            }

            else if (gp.buttons[1].pressed) {
                goBack();
                activateCooldown();
            }
        }
        window.requestAnimationFrame(scanGamepads);
    }

    function activateCooldown() {
        inputCooldown = true;
        setTimeout(() => { inputCooldown = false; }, 200);
    }

    window.addEventListener("gamepadconnected", (e) => {
        console.log(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}.`);
        gamepadIndex = e.gamepad.index;
        scanGamepads();
    });

    window.requestAnimationFrame(scanGamepads);
});