<?php
header('Content-Type: application/json');

// Attempt to fetch the list of Wi-Fi networks using the 'nmcli' command
$output = shell_exec("nmcli -t -f SSID dev wifi | sort -u");

if ($output === null) {
    // If the shell_exec command fails, return an empty array as JSON
    echo json_encode([]);
} else {
    // If the command succeeds, split the output by line breaks to create an array
    $networkList = explode("\n", trim($output));
    // Return the array as JSON
    echo json_encode($networkList);
}
