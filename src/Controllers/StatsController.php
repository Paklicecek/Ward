<?php

namespace App\Controllers;

use App\Services\ApiClient;

require_once __DIR__ . '/../Services/ApiClient.php';
require_once __DIR__ . '/../Config/endpoints.php';

class StatsController
{
    private ApiClient $client;

    public function __construct($region)
    {
        $this->client = new ApiClient($region);
    }

    public function getPlayerData
    (
        $user = null,
        $tagLine = null
    ): array
    {
        $account = $this->client->getRegional(getEndpoint("puuid", user: $user, tagLine: $tagLine));
        $puuid = $account["data"]["puuid"];
        $matchesID = $this->client->getRegional(getEndpoint("matchesID", puuid: $puuid));
        $matchesID = $matchesID["data"];

        $summoner = $this->client->getServer(getEndpoint("summoner", puuid: $puuid));
        $rankedStats = $this->client->getServer(getEndpoint("rankedStats", puuid: $puuid));

        $match = $this->client->getServer(getEndpoint("match", matchId: $matchesID));
        $match = $match["data"]["info"];
        $matches = [
            "match1" => [
                "generalInfo" => [
                    "gameMode" => $match["gameMode"],
                    "queueID" => $match["queueID"],
                    "duration" => $match["gameDuration"],
                ],
                "playerTeam" => [
                ],
                "enemyTeam" => [

                ],
            ]
        ];


        return [
            "puuid" => $puuid,
            "matchesID" => $matchesID,
            "profileIcon" => $summoner["data"]["profileIconId"],
            "level" => $summoner["data"]["summonerLevel"],
            "rankedStats" => $rankedStats["data"]
        ];
    }
}

