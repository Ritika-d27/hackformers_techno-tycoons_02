<?php
$server = "localhost:3307";
$user = "root";
$password = "";
$database = "farmers_hackathon_system";
$conn = mysqli_connect($server, $user, $password, $database);

if (!$conn) {
    echo "Error in accessing database";
}
