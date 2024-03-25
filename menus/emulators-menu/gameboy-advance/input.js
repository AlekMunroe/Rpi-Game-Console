document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Track the current game button index
    const gameButtons = document.querySelectorAll('.game-button'); // Get all game buttons
    let inputCooldown = false; // Cooldown to prevent rapid input
    let buttonReleased = false; // Used to check if the button has been released (for inputCooldown)

    // Function to update the hover state on the buttons
    function updateHover(newIndex) {
        // Remove the hover class from all buttons
        gameButtons.forEach(button => button.classList.remove('hover'));

        // Add the hover class to the new index
        gameButtons[newIndex].classList.add('hover');
        currentIndex = newIndex; // Update the current index
    }

    // Function to simulate a click on the current game button
    function selectCurrentGame() {
        gameButtons[currentIndex].click();
    }

    // Keyboard input for navigation and selection
    document.addEventListener('keydown', (event) => {
        if (inputCooldown) return;

        let newIndex = currentIndex;
        switch (event.key) {
            case 'ArrowRight':
                newIndex = (currentIndex + 1) % gameButtons.length; // Move right
                break;
            case 'ArrowLeft':
                newIndex = (currentIndex - 1 + gameButtons.length) % gameButtons.length; // Move left
                break;
            case 'Enter':
                selectCurrentGame();
                return; // No need to scroll if game is selected
        }
        updateHover(newIndex);
        scrollToButton(newIndex); // Call to scroll the view
        activateCooldown();
    });

    // Mouse input for direct selection
    gameButtons.forEach((button, index) => {
        button.addEventListener('mouseover', () => {
            updateHover(index);
        });

        button.addEventListener('click', () => {
            selectCurrentGame();
        });
    });

    // Gamepad input for navigation and selection
    // Gamepad input for navigation and selection
function scanGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    if (gamepads[0] && !inputCooldown) {
        let gp = gamepads[0];

        if (gp.buttons[15].pressed || gp.axes[0] > 0.5) { // D-pad Right or Left Joystick moving Right
            if (buttonReleased) {
                currentIndex = (currentIndex + 1) % gameButtons.length;
                updateHover(currentIndex);
                scrollToButton(currentIndex); // Call to scroll the view
                buttonReleased = false; // Prevent further input until released
                activateCooldown();
            }
        } else if (gp.buttons[14].pressed || gp.axes[0] < -0.5) { // D-pad Left or Left Joystick moving Left
            if (buttonReleased) {
                currentIndex = (currentIndex - 1 + gameButtons.length) % gameButtons.length;
                updateHover(currentIndex);
                scrollToButton(currentIndex); // Call to scroll the view
                buttonReleased = false; // Prevent further input until released
                activateCooldown();
            }
        } else if (gp.buttons[0].pressed && buttonReleased) { // 'X' on PlayStation or 'A' on Xbox
            selectCurrentGame();
            buttonReleased = false; // Prevent further input until released
            activateCooldown();
        } else if (!gp.buttons[0].pressed && !gp.buttons[14].pressed && !gp.buttons[15].pressed && gp.axes[0] >= -0.5 && gp.axes[0] <= 0.5) {
            // Reset the buttonReleased flag if all relevant buttons are released
            buttonReleased = true;
        }
    }
    window.requestAnimationFrame(scanGamepads);
}



    function activateCooldown() {
        inputCooldown = true;
        setTimeout(() => { inputCooldown = false; }, 200); // Cooldown time
    }

    window.addEventListener("gamepadconnected", (event) => {
        console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}. ${event.gamepad.buttons.length} buttons, ${event.gamepad.axes.length} axes.`);
        scanGamepads();
    });

    // Initialize
    updateHover(0); // Highlight the first game button by default
    window.requestAnimationFrame(scanGamepads);
});
