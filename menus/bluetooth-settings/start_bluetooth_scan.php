<?php
// Starts Bluetooth device scanning
$command = "bluetoothctl scan on";
shell_exec($command);
echo json_encode(["status" => "Scanning started"]);
