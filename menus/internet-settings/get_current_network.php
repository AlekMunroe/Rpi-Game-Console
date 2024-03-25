<?php
header('Content-Type: application/json');

// Assuming the use of nmcli to get the current network name
$output = shell_exec("nmcli -t -f active,ssid dev wifi | egrep '^yes' | cut -d\: -f2");

if ($output) {
    echo json_encode(['currentNetwork' => trim($output)]);
} else {
    echo json_encode(['currentNetwork' => null]);
}
