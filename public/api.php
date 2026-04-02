<?php

use App\Controllers\StatsController;

require_once __DIR__ . '/../src/Controllers/StatsController.php';

$user = $_GET["user"];
$tagLine = $_GET["tagLine"];
$region = $_GET["region"];

$controller = new StatsController($region);
$data = $controller->getPlayerData(user: $user, tagLine: $tagLine);

header("Content-Type: application/json");
echo json_encode($data);
