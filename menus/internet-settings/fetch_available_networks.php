<?php
// Command to list available Wi-Fi networks
$command = "nmcli -t -f SSID dev wifi | sort -u 2>&1";
// Execute the command
$output = shell_exec($command);
// Split the output into an array of SSIDs
$ssids = explode("\n", trim($output));
// Return the array of SSIDs as a JSON object
echo json_encode($ssids);
