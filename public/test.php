<?php
require_once '../src/Services/RiotApiService.php';
require_once '../src/Config/endpoints.php';

$client = new ApiClient("EUN");
$account = $client->getRegional(getEndpoint("puuid", user: "Paklicek", tagLine : "rizz"));
$puuid = $account["data"]["puuid"];

$summoner = $client->getServer(getEndpoint("summoner",puuid: $puuid));
$rankedStats = $client->getServer(getEndpoint("rankedStats",puuid: $puuid));
$matchesID = $client->getRegional(getEndpoint("matchesID",puuid: $puuid));

echo '<pre>';
print_r($account);
print_r($puuid);
print_r($summoner);
print_r($rankedStats);
print_r($matchesID);
echo '</pre>';
?>