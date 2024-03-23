<?php
header('Content-Type: application/json');

// Execute nmcli to fetch WiFi SSIDs, appending 2>&1 to also capture command errors
$output = shell_exec("nmcli -t -f SSID dev wifi | sort -u 2>&1");

// Convert the command output into an array, splitting by new line
$networkList = explode("\n", trim($output));

// Check if the output contains a common error message or is empty
if (empty($networkList[0]) || strpos($output, 'command not found') !== false) {
    // Command failed or nmcli is not installed, return an error message
    echo json_encode(['error' => 'Failed to fetch networks or nmcli not found.']);
} else {
    // Return the list of networks
    echo json_encode($networkList);
}
