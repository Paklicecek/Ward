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
        // ACCOUNT INFO
        $account = $this->client->getRegional(getEndpoint("puuid", user: $user, tagLine: $tagLine));
        $puuid = $account["data"]["puuid"];
        // MATCHES
        $matchesID = $this->client->getRegional(getEndpoint("matchesID", puuid: $puuid));
        $matchesID = $matchesID["data"];
        // RANKED
        $rankedStatsResponse = $this->client->getServer(getEndpoint("rankedStats", puuid: $puuid));
        $rankedStats = $rankedStatsResponse["data"];

        $soloRanked = null;
        $flexRanked = null;

        foreach ($rankedStats as $rank) {
            $rankData = [
                "tier" => $rank["tier"],
                "rank" => $rank["rank"],
                "lp" => $rank["leaguePoints"],
                "wins" => $rank["wins"],
                "losses" => $rank["losses"]
            ];
            if ($rank["queueType"] === "RANKED_SOLO_5x5") {
                $soloRanked = $rankData;
            } elseif ($rank["queueType"] === "RANKED_FLEX_SR") {
                $flexRanked = $rankData;
            }
        }
        // SUMMONER INFO
        $summoner = $this->client->getServer(getEndpoint("summoner", puuid: $puuid));
        $summoner = $summoner["data"];
        // MATCH HISTORY ARRAY
        $matchHistory = [];
        $i = 1;
        foreach ($matchesID as $matchID) {
            $match = $this->client->getServer(getEndpoint("match", matchId: $matchID));
            $match = $match["data"];

            $matchHistory[] = [
                "matchId" => $i,
                "gameMode" => $match["info"]["gameMode"],
                "stats" => $this->userStats($puuid, $match)
            ];
            $i++;
        }


        return [
            "puuid" => $puuid,
            "profileIcon" => $summoner["data"]["profileIconId"],
            "level" => $summoner["data"]["summonerLevel"],
            "soloRanked" => $soloRanked,
            "flexRanked" => $flexRanked,
            "matchHistory" => $matchHistory
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
            $kills = $participant["kills"];
            $deaths = $participant["deaths"];
            $assists = $participant["assists"];
            if ($deaths == 0) $kda = $kills + $assists;
            else $kda = round(($kills + $assists) / $deaths);

            return [
                "win" => $participant["win"],
                "kills" => $participant["kills"],
                "deaths" => $participant["deaths"],
                "assists" => $participant["assists"],
                "kda" => $kda,
                "cs" => $participant["totalMinionsKilled"] + $participant["neutralMinionsKilled"],
                "vision" => $participant["visionScore"],
                "champion" => $participant["championId"],
                "mainSummoner" => $participant["summoner1Id"],
                "secondSummoner" => $participant["summoner2Id"],
                "mainRune" => $participant["perks"]["styles"][0]["selections"][0]["perk"],
                "secondRune" => $participant["perks"]["styles"][1]["style"],
                "items" => [
                    $participant["item0"], $participant["item1"], $participant["item2"],
                    $participant["item3"], $participant["item4"], $participant["item5"],
                    $participant["item6"]
                ]
            ];
        }
        return [];
    }
}

