<?php

$db_hostname = "127.0.0.1";
$username = "root";
$password = "";
$db_name = "tourism";

$conn = mysqli_connect($db_hostname,$username,$password,$db_name);

if(!$conn) {
    die("Connection Failed:".mysqli_connect_error());
}

?>