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

        foreach ($matchesID as $matchID) {
            $match = $this->client->getServer(getEndpoint("match", matchId: $matchID));
            $match = $match["data"];
            $stats = $this->userStats($puuid, $match);

        }


        return [
            "puuid" => $puuid,
            "matchesID" => $matchesID,
            "profileIcon" => $summoner["data"]["profileIconId"],
            "level" => $summoner["data"]["summonerLevel"],
            "rankedStats" => $rankedStats["data"]
        ];
    }

    private function userStats
    (
        $puuid = null,
        $match = null
    ): array|null
    {
        $participants = $match["info"]["participants"];
        foreach ($participants as $participant) if ($participant["puuid"] == $puuid) {
            return [
                "kills" => $participant["kills"],
                "deaths" => $participant["deaths"],
                "assists" => $participant["assists"],
                "kda" => ($participant["kills"] + $participant["assists"]) / $participant["deaths"],
                "cs" => $participant["totalMinionsKilled"] + $participant["neutralMinionsKilled"],
                "vision" => $participant["visionScore"],
                "champion" => $participant["championId"],
                "mainSummoner" => $participant["summoner1Id"],
                "secondSummoner" => $participant["summoner2Id"],
                "mainRune" => $participant["perks"]["styles"][0]["selections"][0]["perk"],
                "secondRune" => $participant["perks"]["styles"][1]["style"],
            ];
        }
        return [];
    }
}

