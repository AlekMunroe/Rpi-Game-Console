document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Keep track of the current button index
    const settingsButtons = document.querySelectorAll('.settings-button'); // Grab all settings buttons
    let inputCooldown = false; // Cooldown flag to prevent rapid input

    // Apply initial hover effect to the first button
    updateHover(currentIndex);

    function updateHover(index) {
        // Remove 'hover' class from all buttons
        settingsButtons.forEach(button => button.classList.remove('hover'));

        // Ensure the index is within bounds
        index = Math.max(0, Math.min(index, settingsButtons.length - 1));

        // Add 'hover' class to the button at the new index
        settingsButtons[index].classList.add('hover');
        currentIndex = index; // Update the global index to the new value
    }


    function selectCurrentButton() {
        // Trigger an action for the current button, such as navigating to a new page
        console.log('Button selected:', settingsButtons[currentIndex].textContent.trim());
        // Example: window.location.href = '/path-based-on-button';
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
        }
        updateHover(newIndex);
    });

    let gamepadIndex;

    function scanGamepads() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if (gamepads[gamepadIndex] && !inputCooldown) {
            let gp = gamepads[gamepadIndex];

            // Up (D-pad up or Left Stick Up)
            if ((gp.buttons[12].pressed || gp.axes[1] < -0.5)) {
                updateHover(Math.max(0, currentIndex - 1));
                activateCooldown();
            }
            // Down (D-pad down or Left Stick Down)
            else if ((gp.buttons[13].pressed || gp.axes[1] > 0.5)) {
                updateHover(Math.min(settingsButtons.length - 1, currentIndex + 1));
                activateCooldown();
            }
            // Select (X on PlayStation, A on Xbox)
            else if (gp.buttons[0].pressed) {
                selectCurrentButton();
                activateCooldown();
            }
            // Back (Circle on PlayStation, B on Xbox)
            else if (gp.buttons[1].pressed) {
                goBack();
                activateCooldown();
            }
        }
        window.requestAnimationFrame(scanGamepads);
    }

    function activateCooldown() {
        inputCooldown = true;
        setTimeout(() => { inputCooldown = false; }, 200); // Cooldown period in milliseconds
    }

    window.addEventListener("gamepadconnected", (e) => {
        console.log(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}.`);
        gamepadIndex = e.gamepad.index; // Set the index for the connected gamepad
        scanGamepads(); // Start scanning for gamepad input
    });

    window.requestAnimationFrame(scanGamepads);
});
