<?php

namespace App\Controllers;

use App\Services\ApiClient;

require_once __DIR__ . "/../Services/ApiClient.php";
require_once __DIR__ . "/../Config/endpoints.php";

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
        $allowedQueueIds = [400, 420, 440, 450, 480, 490, 2300, 2400];

        foreach ($matchesID as $matchID) {
            usleep(100000);
            $match = $this->client->getRegional(getEndpoint("match", matchID: $matchID));
            $match = $match["data"];
            $queueId = $match["info"]["queueId"];

            if (!in_array($queueId, $allowedQueueIds, true)) {
                continue;
            }

            $matchHistory[] = [
                "matchId" => $i,
                "gameMode" => $this->getRealMode($queueId),
                "gameEndTimestamp" => $match["info"]["gameEndTimestamp"],
                "gameDuration" => $match["info"]["gameDuration"],
                "stats" => $this->userStats($puuid, $match),
                "participants" => $this->getParticipants($match)
            ];
            $i++;
        }


        return [
            "puuid" => $puuid,
            "profileIcon" => $summoner["profileIconId"],
            "level" => $summoner["summonerLevel"],
            "soloRanked" => $soloRanked,
            "flexRanked" => $flexRanked,
            "matchHistory" => $matchHistory
        ];
    }

    private function getRealMode(int $queueId): string
    {
        return match ($queueId) {
            420 => "Ranked Solo/Duo",
            440 => "Ranked Flex",
            450 => "ARAM",
            480 => "Swiftplay",
            2300 => "Brawl",
            2400 => "ARAM: Mayhem",
            400 => "Draft Pick",
            default => "Unknown"
        };
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
            else $kda = round(($kills + $assists) / $deaths, 2);

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

    private function getParticipants($match): array
    {
        $players = [];
        foreach ($match["info"]["participants"] as $p) {
            $players[] = [
                "name" => $p["riotIdGameName"] ?: $p["summonerName"],
                "championId" => $p["championId"]
            ];
        }
        return $players;
    }
}


