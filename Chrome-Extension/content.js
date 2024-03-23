let lastButtonStates = []; // Track the last state of all buttons
let buttonHoldTimers = []; // Timers for holding the button down, one for each gamepad

function scanGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let gp of gamepads) {
        if (gp && gp.buttons[16]) {
            if (gp.buttons[16].pressed !== lastButtonStates[gp.index]?.[16]) {
                console.log(`Gamepad ${gp.index} Home Button: ${gp.buttons[16].pressed ? 'Pressed' : 'Released'}`);
                if (!lastButtonStates[gp.index]) {
                    lastButtonStates[gp.index] = [];
                }
                lastButtonStates[gp.index][16] = gp.buttons[16].pressed; // Update the last state

                // If the Home button is pressed, start the timer
                if (gp.buttons[16].pressed) {
                    // Clear any existing timer to avoid duplicates
                    clearTimeout(buttonHoldTimers[gp.index]);
                    buttonHoldTimers[gp.index] = setTimeout(() => {
                        chrome.runtime.sendMessage({ action: "checkAndCloseTab" });
                    }, 2000); // 2000 milliseconds = 2 seconds
                } else {
                    // If the button is released before 3 seconds, clear the timer
                    clearTimeout(buttonHoldTimers[gp.index]);
                }
            }
        }
    }
    window.requestAnimationFrame(scanGamepads);
}

// Initialize the button states array when a gamepad is connected
window.addEventListener("gamepadconnected", function (event) {
    console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}.`);
    if (!lastButtonStates[event.gamepad.index]) {
        lastButtonStates[event.gamepad.index] = new Array(event.gamepad.buttons.length).fill(false);
        buttonHoldTimers[event.gamepad.index] = null; // Initialize timer slot for this gamepad
    }
    scanGamepads(); // Start scanning gamepads
});

window.requestAnimationFrame(scanGamepads);
