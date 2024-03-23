<?php
// scan.php - PHP script to scan for WiFi networks
$output = [];
$return_var = 0;
// Execute the command to scan networks. This requires root privileges.
exec('sudo iwlist wlan0 scan | grep "ESSID"', $output, $return_var);

$networks = [];
if ($return_var === 0) { // Check if command was successful
    foreach ($output as $line) {
        if (preg_match('/ESSID:"([^"]+)"/', $line, $matches)) {
            $networks[] = $matches[1]; // Capture the ESSID value
        }
    }
}

header('Content-Type: application/json');
echo json_encode($networks);
