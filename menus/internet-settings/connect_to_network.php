<?php
// Get SSID and password from the request
$ssid = $_POST['ssid'] ?? '';
$password = $_POST['password'] ?? '';

// Prepare the command to connect to the network
$command = escapeshellcmd("sudo nmcli dev wifi connect '".escapeshellarg($ssid)."' password '".escapeshellarg($password)."'");

// Execute the command
$output = shell_exec($command);

// Check the output for success or failure
if (strpos($output, "successfully activated") !== false) {
    $response = ['success' => true, 'message' => "Connected to $ssid successfully."];
} else {
    $response = ['success' => false, 'message' => "Failed to connect to $ssid."];
}

// Return the response as JSON
echo json_encode($response);
