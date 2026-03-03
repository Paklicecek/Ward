<?php
require_once '../src/Services/RiotApiService.php';

$client = new ApiClient('https://europe.api.riotgames.com');
$result = $client->get('/riot/account/v1/accounts/by-riot-id/Paklicek/rizz');

echo '<pre>';
print_r($result);
echo '</pre>';
?>