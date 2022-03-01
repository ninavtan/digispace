<?php

$img = $_POST['data'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);
//saving
$fileName = 'photo.png';
file_put_contents($fileName, $fileData);

// $sendOutputToNodejs = "<html><body><h1>This html is sent from PHP to Node JS. Try and experiment!</h1>";

// $sendOutputToNodejs = "This is the output from PHP Script : : <br /><br />";

// $sendOutputToNodejs = "First name: " . $argv[1] . " <br /><br />";

// $sendOutputToNodejs = "Last name: " . $argv[2] / " <br /><br />";

// $sendOutputToNodejs = "</body></html>";

// echo $sendOutputToNodejs;

