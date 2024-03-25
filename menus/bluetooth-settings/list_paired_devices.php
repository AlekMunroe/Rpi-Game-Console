<?php
// This command lists all known devices (both paired and not paired)
$listDevicesCommand = "bluetoothctl devices";
$devicesOutput = shell_exec($listDevicesCommand);

// Prepare an array to collect paired devices
$pairedDevices = [];

// Split the devices output into lines, each representing a device
$lines = explode("\n", trim($devicesOutput));
foreach ($lines as $line) {
    // Expecting line format: "Device MAC Device_Name"
    preg_match("/Device (\S+) (.+)/", $line, $matches);
    if (count($matches) === 3) {
        $mac = $matches[1];
        $name = $matches[2];

        // For each device, check if it is paired by looking for "Paired: yes" in the info output
        $infoCommand = "bluetoothctl info $mac";
        $infoOutput = shell_exec($infoCommand);
        if (strpos($infoOutput, 'Paired: yes') !== false) {
            $pairedDevices[] = ['mac' => $mac, 'name' => $name];
        }
    }
}

echo json_encode($pairedDevices);
