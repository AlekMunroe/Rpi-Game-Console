<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $macAddress = $_POST['macAddress'] ?? '';

    // Command to remove (unpair) the Bluetooth device
    $command = "bluetoothctl remove {$macAddress}";
    $output = shell_exec($command);

    echo json_encode(array(
        'success' => strpos($output, "successfully removed") !== false,
        'output' => $output
    ));
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid request method.'));
}
