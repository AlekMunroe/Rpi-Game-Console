<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the MAC address from POST data
    $macAddress = isset($_POST['macAddress']) ? trim($_POST['macAddress']) : '';

    // Ensure the MAC address is not empty
    if (!empty($macAddress)) {
        // Use bluetoothctl to remove (unpair) the device
        $command = "bluetoothctl remove $macAddress";
        $output = shell_exec($command);

        // Check the output or exit status to determine if the command was successful
        if (strpos($output, "Device has been removed") !== false || strpos($output, "not available") === false) {
            echo json_encode(['success' => true, 'message' => "Device $macAddress has been unpaired successfully."]);
        } else {
            echo json_encode(['success' => false, 'message' => "Failed to unpair device $macAddress."]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'MAC address is required.']);
    }
} else {
    // Handle incorrect request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
