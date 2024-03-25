<?php
// Lists discovered Bluetooth devices
$command = "bluetoothctl devices";
$output = shell_exec($command);
echo json_encode(explode("\n", $output));
