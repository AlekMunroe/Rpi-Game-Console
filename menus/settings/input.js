document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const settingsButtons = document.querySelectorAll('.settings-button');
    let inputCooldown = false;

    updateHover(currentIndex);

    function updateHover(index) {

        settingsButtons.forEach(button => button.classList.remove('hover'));

        index = Math.max(0, Math.min(index, settingsButtons.length - 1));

        settingsButtons[index].classList.add('hover');
        currentIndex = index;
    }

    function selectCurrentButton() {

        console.log('Button selected:', settingsButtons[currentIndex].textContent.trim());

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