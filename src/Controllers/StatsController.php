<?php
require_once '../Services/RiotApiService.php';
require_once '../Config/endpoints.php';

class StatsController{
    private ApiClient $client;
    public function __construct($region)
    {
        $this->client = new ApiClient($region);
    }
    public function getPlayerData
    (
    $user=null, 
    $tagLine=null, 
    )
    {
        $account = $this->client->getRegional(getEndpoint("puuid", user: $user, tagLine : $tagLine));
        $puuid = $account["data"]["puuid"];
        $matchesID = $this->client->getRegional(getEndpoint("matchesID",puuid: $puuid));

        $summoner = $this->client->getServer(getEndpoint("summoner",puuid: $puuid));
        $rankedStats = $this->client->getServer(getEndpoint("rankedStats",puuid: $puuid));
        
        return[
            "puuid"       => $puuid,
            "matchesID"   => $matchesID,
            "profileIcon" => $summoner["data"]["profileIconId"],
            "level"       => $summoner["data"]["summonerLevel"],
            "rankedStats" => $rankedStats["data"]
        ];
    }
}
?>