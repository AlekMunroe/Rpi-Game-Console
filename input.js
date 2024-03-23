document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; //Keep track of the current service index
    let inTopMenu = false; //Track if the top menu is in focus
    const services = document.querySelectorAll('.service'); //Get all service elements (Bottom row)
    const topButtons = document.querySelectorAll('.top-button'); //Get top menu buttons (Top row)
    let inputCooldown = false; //Cooldown to prevent rapid input
    let buttonReleased = true; //Used to check if the button has bene released (for inputCooldown)

    //Update the hover state on the buttons
    function updateHover(newIndex, inTop) {
        //Remove the hover class from all buttons
        topButtons.forEach(button => button.classList.remove('hover'));
        services.forEach(service => service.classList.remove('hover'));

        //Checking where to handle navigation
        if (inTop) {
            //Stop newIndex from going out of bounds
            newIndex = Math.max(0, Math.min(newIndex, topButtons.length - 1));
            topButtons[newIndex].classList.add('hover');
            currentIndex = newIndex; //Update the current index in the top menu
        } else {
            //Stop newIndex from going out of bounds
            newIndex = Math.max(0, Math.min(newIndex, services.length - 1));
            services[newIndex].classList.add('hover');
            currentIndex = newIndex; //Update the current index in the services
        }
    }

    //Apply hover effect to the first button by default
    updateHover(0, false);

    //Simulate a click on the current service
    function selectCurrentService() {
        if (inTopMenu) {
            topButtons[currentIndex].click();
        } else {
            services[currentIndex].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        }
    }

    //Keyboard input
    document.addEventListener('keydown', (event) => {
        let newIndex = currentIndex;
        switch (event.key) {
            case 'ArrowUp':
                console.log("hi");
                if (!inTopMenu) {
                    //Move to the first top button (placeholder) when pressing up on the first service
                    inTopMenu = true;
                    newIndex = 0; //The index for the first top button
                }
                break;
            case 'ArrowDown':
                if (inTopMenu) {
                    //Move back to the first service when pressing down
                    inTopMenu = false;
                    newIndex = 0; //The index for the first service
                }
                break;
            case 'ArrowRight':
                if (inTopMenu) {
                    newIndex = (currentIndex + 1) % topButtons.length; //Loop around in the top menu
                } else {
                    newIndex = currentIndex + 1; //Move right in the services
                }
                break;
            case 'ArrowLeft':
                if (inTopMenu) {
                    newIndex = (currentIndex - 1 + topButtons.length) % topButtons.length; //Loop around in the top menu
                } else {
                    newIndex = currentIndex - 1; //Move left in the services
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
            inTopMenu = true; //Switch focus to the top menu on hover
            updateHover(index, inTopMenu);
        });
    });

    //Mouse input
    services.forEach((service, index) => {
        service.addEventListener('mouseover', () => {
            inTopMenu = false; //Switch focus to services on hover
            updateHover(index, inTopMenu);
        });
    });

    //Gamepad input
    function scanGamepads() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if (gamepads[0] && !inputCooldown) {
            let gp = gamepads[0];

            //Vertical movement on the left joystick (Axes 1)
            if (gp.axes[1] < -0.5 && !inTopMenu) { //Joystick moved up
                inTopMenu = true; //Move focus to the top menu
                currentIndex = 0; //Reset to the the first icon
                updateHover(currentIndex, inTopMenu);
                activateCooldown();
            } else if (gp.axes[1] > 0.5 && inTopMenu) { //Joystick moved down
                inTopMenu = false; //Move focus back to the services
                currentIndex = 0; //Reset to the first service
                updateHover(currentIndex, inTopMenu);
                activateCooldown();
            }

            //D-pad Up or Left Joystick Up (Go to top menu)
            if (gp.buttons[12].pressed && !inTopMenu) {
                inTopMenu = true;
                currentIndex = 0; //Start from the first top button
                updateHover(currentIndex, inTopMenu);
                activateCooldown();
            }
            //D-pad Down or Left Joystick Down (Go to services)
            else if (gp.buttons[13].pressed && inTopMenu) {
                inTopMenu = false;
                currentIndex = 0; //Start from the first service
                updateHover(currentIndex, inTopMenu);
                activateCooldown();
            }
            //D-pad Right or Left Joystick moving Right
            else if (gp.buttons[15].pressed || gp.axes[0] > 0.5) {
                if (inTopMenu) {
                    //Only move right if we are not at the last top button
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
            //D-pad Left or Left Joystick moving Left
            else if (gp.buttons[14].pressed || gp.axes[0] < -0.5) {
                if (inTopMenu) {
                    //Only move left if we are not at the first top button
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
            //X (playstation) A (xbox)
            else if (gp.buttons[0].pressed && buttonReleased) {
                selectCurrentService();
                buttonReleased = false; //Button must be released before it can be used again
                activateCooldown();
            } else if (!gp.buttons[0].pressed) {
                buttonReleased = true; //Allow the button to be used again
            }
        }
        window.requestAnimationFrame(scanGamepads);
    }


    function activateCooldown() {
        inputCooldown = true;
        setTimeout(() => { inputCooldown = false; }, 200); //Cooldown time
    }

    window.addEventListener("gamepadconnected", (event) => {
        console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}. ${event.gamepad.buttons.length} buttons, ${event.gamepad.axes.length} axes.`);
        scanGamepads();
    });

    //Start scanning for gamepads in a loop
    window.requestAnimationFrame(scanGamepads);

});
