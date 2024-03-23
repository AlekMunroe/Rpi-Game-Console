<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$networkName = $data['networkName'];
$password = $data['password'];

// Command to connect to a Wi-Fi network using nmcli
// This example assumes a WPA2 network; adjust as needed for your network type
$command = "nmcli dev wifi connect '".escapeshellarg($networkName)."' password '".escapeshellarg($password)."'";

$output = shell_exec($command." 2>&1");

if (strpos($output, "successfully activated") !== false) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to connect.']);
}
