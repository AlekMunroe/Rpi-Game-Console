<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$networkName = $data['networkName'];
$password = $data['password'];

if (empty($networkName) || empty($password)) {
    echo json_encode(['success' => false, 'error' => 'Network name or password is missing.']);
    exit;
}

$command = "sudo nmcli dev wifi connect " . escapeshellarg($networkName) . " password " . escapeshellarg($password);
$output = shell_exec($command . " 2>&1");

if (strpos($output, "successfully activated") !== false) {
    echo json_encode(['success' => true, 'output' => $output]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to connect.', 'output' => $output]);
}
