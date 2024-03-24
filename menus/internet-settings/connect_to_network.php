<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$networkName = $data['networkName'];
$password = $data['password'];

// Ensure that data is not empty
if (empty($networkName) || empty($password)) {
    echo json_encode(['success' => false, 'error' => 'Network name or password is missing.']);
    exit;
}

// Command to connect to a Wi-Fi network using nmcli with sudo for required permissions
// Remember to configure sudoers to allow executing this command without a password for your web server's user
$command = "sudo nmcli dev wifi connect " . escapeshellarg($networkName) . " password " . escapeshellarg($password);

// Execute the command and capture its output
$output = shell_exec($command . " 2>&1");

// Check the command output for success message
if (strpos($output, "successfully activated") !== false) {
    echo json_encode(['success' => true]);
} else {
    // If connection was not successful, include output for debugging
    echo json_encode(['success' => false, 'error' => 'Failed to connect.', 'output' => $output]);
}
