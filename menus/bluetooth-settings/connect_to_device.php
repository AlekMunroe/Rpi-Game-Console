<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Extract the MAC address from POST data
    $macAddress = $_POST['macAddress'] ?? '';

    // Use bluetoothctl to connect to the device
    $command = "bluetoothctl connect {$macAddress}";
    $output = shell_exec($command);

    // Respond with the output of the connection command
    echo json_encode(array(
        'success' => strpos($output, "Connection successful") !== false,
        'output' => $output
    ));
} else {
    // Handle incorrect request method
    echo json_encode(array('success' => false, 'message' => 'Invalid request method.'));
}
