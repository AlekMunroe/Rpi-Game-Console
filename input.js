document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Keep track of the current service index
    let inTopMenu = false; // Flag to track if the top menu is focused
    const services = document.querySelectorAll('.service'); // Grab all service elements
    const topButtons = document.querySelectorAll('.top-button'); // Grab top menu buttons
    let inputCooldown = false; // Cooldown flag to prevent rapid input
    let buttonReleased = true; // Flag to ensure button release before re-triggering

    // Function to update the hover state on the buttons
    function updateHover(newIndex, inTop) {
        // First, remove the hover class from all buttons
        topButtons.forEach(button => button.classList.remove('hover'));
        services.forEach(service => service.classList.remove('hover'));

        // If we're in the top menu, handle navigation within the top buttons
        if (inTop) {
            // Prevent newIndex from going out of bounds
            newIndex = Math.max(0, Math.min(newIndex, topButtons.length - 1));
            topButtons[newIndex].classList.add('hover');
            currentIndex = newIndex; // Update the current index within the top menu
        } else {
            // Prevent newIndex from going out of bounds for services
            newIndex = Math.max(0, Math.min(newIndex, services.length - 1));
            services[newIndex].classList.add('hover');
            currentIndex = newIndex; // Update the current index within the services
        }
    }

    // Apply hover effect to the first button by default
    updateHover(0, false);

    // Function to simulate a click on the current service
    function selectCurrentService() {
        if (inTopMenu) {
            topButtons[currentIndex].click();
        } else {
            services[currentIndex].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    }

    // Keyboard input
    document.addEventListener('keydown', (event) => {
        let newIndex = currentIndex;
        switch (event.key) {
            case 'ArrowUp':
                if (!inTopMenu && currentIndex === 0) {
                    // Move to the first top button (placeholder) when pressing up on the first service
                    inTopMenu = true;
                    newIndex = 0; // The index for the first top button
                }
                break;
            case 'ArrowDown':
                if (inTopMenu) {
                    // Move back to the first service when pressing down in the top menu
                    inTopMenu = false;
                    newIndex = 0; // The index for the first service
                }
                break;
            case 'ArrowRight':
                if (inTopMenu) {
                    newIndex = (currentIndex + 1) % topButtons.length; // Loop around in the top menu
                } else {
                    newIndex = currentIndex + 1; // Move right in the services
                }
                break;
            case 'ArrowLeft':
                if (inTopMenu) {
                    newIndex = (currentIndex - 1 + topButtons.length) % topButtons.length; // Loop around in the top menu
                } else {
                    newIndex = currentIndex - 1; // Move left in the services
                }
                break;
            case 'Enter':
                selectCurrentService();
                break;
        }
        updateHover(newIndex, inTopMenu);
    });

    topButtons.forEach((button, index) => {
        button.addEventListener('mouseover', () => {
            inTopMenu = true; // Switch focus to top menu on hover
            updateHover(index, inTopMenu);
        });
    });

    // Mouse input - add mouseover event to all service elements
    services.forEach((service, index) => {
        service.addEventListener('mouseover', () => {
            inTopMenu = false; // Switch focus to services on hover
            updateHover(index, inTopMenu);
        });
    });

    // Gamepad input will need to be checked regularly
    function scanGamepads() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if (gamepads[0] && !inputCooldown) {
            let gp = gamepads[0];

            // Vertical movement on the joystick (Axes 1)
            if (gp.axes[1] < -0.5 && !inTopMenu) { // Joystick moved up
                inTopMenu = true; // Move focus to top menu
                currentIndex = 0; // Reset to the first icon
                updateHover(currentIndex, inTopMenu);
                activateCooldown();
            } else if (gp.axes[1] > 0.5 && inTopMenu) { // Joystick moved down
                inTopMenu = false; // Move focus back to services
                currentIndex = 0; // Reset to the first service
                updateHover(currentIndex, inTopMenu);
                activateCooldown();
            }

            // Handle D-pad Up or Left Stick Up to navigate to the top menu
            if (gp.buttons[12].pressed && !inTopMenu) {
                inTopMenu = true;
                currentIndex = 0; // Start from the first top button when moving up
                updateHover(currentIndex, inTopMenu);
                activateCooldown();
            }
            // Handle D-pad Down or Left Stick Down to navigate back to the services
            else if (gp.buttons[13].pressed && inTopMenu) {
                inTopMenu = false;
                currentIndex = 0; // Start from the first service when moving down
                updateHover(currentIndex, inTopMenu);
                activateCooldown();
            }
            // Handle D-pad Right or Left Stick Right
            else if (gp.buttons[15].pressed || gp.axes[0] > 0.5) {
                if (inTopMenu) {
                    // Only move right if we are not at the last top button
                    if (currentIndex < topButtons.length - 1) {
                        currentIndex++;
                        updateHover(currentIndex, inTopMenu);
                        activateCooldown();
                    }
                } else {
                    updateHover(currentIndex + 1, inTopMenu);
                    activateCooldown();
                }
            }
            // Handle D-pad Left or Left Stick Left
            else if (gp.buttons[14].pressed || gp.axes[0] < -0.5) {
                if (inTopMenu) {
                    // Only move left if we are not at the first top button
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateHover(currentIndex, inTopMenu);
                        activateCooldown();
                    }
                } else {
                    updateHover(currentIndex - 1, inTopMenu);
                    activateCooldown();
                }
            }
            // Handle A button on Xbox controller or Cross on PlayStation
            else if (gp.buttons[0].pressed && buttonReleased) {
                selectCurrentService();
                buttonReleased = false; // Button must be released before it can trigger again
                activateCooldown();
            } else if (!gp.buttons[0].pressed) {
                buttonReleased = true; // Button has been released, can trigger action again
            }
        }
        window.requestAnimationFrame(scanGamepads);
    }


    function activateCooldown() {
        inputCooldown = true;
        setTimeout(() => { inputCooldown = false; }, 200); // Cooldown period in milliseconds
    }

    window.addEventListener("gamepadconnected", (event) => {
        console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}. ${event.gamepad.buttons.length} buttons, ${event.gamepad.axes.length} axes.`);
        scanGamepads();
    });

    // Start the gamepad scanning loop
    window.requestAnimationFrame(scanGamepads);

});
