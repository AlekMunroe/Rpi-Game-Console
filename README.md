# RPI Game Console

<!-- ROADMAP -->
## Getting started

This is an incomplete project still in alpha.
Install the chrome extension in "Chrome-Extension" in developer mode and run.

## Getting started - Rpi 4

* Install Raspberry Pi OS
* SSH into the pi
* type "sudo apt-get install php -y"
* type "cd /var/www/html/"
* type "sudo git clone https://github.com/AlekMunroe/Rpi-Game-Console.git ."
* Connect to the pi's IP address in a browser to test if it is working.

* type "sudo raspi-config"
* Choose "System Options"
* Choose "Boot / Auto Login"
* Choose "Console Autologin"

* type "sudo apt install --no-install-recommends chromium-browser matchbox-window-manager xinit xserver-xorg x11-xserver-utils ttf-mscorefonts-installer unclutter"
* type "nano ~/.xinitrc"
* Paste this into the file:

```
#!/bin/sh
xset -dpms # Disable DPMS (Energy Star) features.
xset s off # Disable screen saver.
xset s noblank # Don't blank the video device.
unclutter -idle 0.5 -root & #Hide the mouse by default
matchbox-window-manager &
chromium-browser http://localhost
```

* You could change the last like to "chromium-browser --kiosk --no-sandbox http://localhost" to change the experience

* CTRL + X
* CTRL + Y
* CRTL + S

* type "nano ~/.bash_profile"
* Paste this into the end: [[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx

* CTRL + X
* CTRL + Y
* CRTL + S

* type "sudo vistudio"
* Paste this into the end: www-data ALL=(ALL) NOPASSWD: /usr/bin/nmcli

* type "sudo reboot"

* Open a new tab on the pi
* type "chrome://extensions"
* Click "Developer mode" on the top right
* Click "Load unpacked" on the top left
* Locate the chrome extension in /var/www/html/Chrome-Extension
* Click "Open" on the bottom left

* Go to chrome://flags
* Set "Web Bluetooth" to enabled

* Click on each service and login to your account

* Play


## Versions

## V2.1 - Alpha
* Added a network page which scans networks, it does not currently have full functionality to connect to a network

## V2 - Alpha
* Created a chrome extension which will close any tab not named "Game Console". This only works when you hold down the home button for 2 seconds
* Added a top menu for other buttons (Placeholder button and settings button)
* The settings button will take you to a separate page at /menus/settings/index.php to act like a settings screen
* The settings screen has template buttons setup
* Fixed image capitalisation names

## V1 - Alpha
* The buttons will open sites in new tabs
* Keyboard/mouse and Controller input (PS5 controller tested)