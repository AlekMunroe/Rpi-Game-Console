let lastButtonStates = []; //Last state of all buttons
let buttonHoldTimers = []; //Timers for holding the home button down (For each controller)

function scanGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let gp of gamepads) {
        if (gp && gp.buttons[16]) { //Button 16 is the home button
            if (gp.buttons[16].pressed !== lastButtonStates[gp.index]?.[16]) {
                console.log(`Gamepad ${gp.index} Home Button: ${gp.buttons[16].pressed ? 'Pressed' : 'Released'}`);
                if (!lastButtonStates[gp.index]) {
                    lastButtonStates[gp.index] = [];
                }
                lastButtonStates[gp.index][16] = gp.buttons[16].pressed; //Update the last state

                //If the Home button is pressed, start the timer
                if (gp.buttons[16].pressed) {
                    //Clear any timers that have already started
                    clearTimeout(buttonHoldTimers[gp.index]);
                    buttonHoldTimers[gp.index] = setTimeout(() => {
                        chrome.runtime.sendMessage({ action: "checkAndCloseTab" });
                    }, 2000); //Time
                } else {
                    //If the button is released early, clear the timer
                    clearTimeout(buttonHoldTimers[gp.index]);
                }
            }
        }
    }
    window.requestAnimationFrame(scanGamepads);
}

//Initialise the button states array when a gamepad is connected
window.addEventListener("gamepadconnected", function (event) {
    console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}.`);
    if (!lastButtonStates[event.gamepad.index]) {
        lastButtonStates[event.gamepad.index] = new Array(event.gamepad.buttons.length).fill(false);
        buttonHoldTimers[event.gamepad.index] = null; //Initialize timer slot for this gamepad
    }
    scanGamepads(); //Start scanning gamepads
});

window.requestAnimationFrame(scanGamepads);
