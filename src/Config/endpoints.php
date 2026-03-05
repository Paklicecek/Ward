<?php
function getEndpoint(
$lookingFor,
$user=null, 
$tagLine=null, 
$puuid=null, 
$pfpID=null, 
$matchID=null, 
$summonerID=null, 
$championName=null, 
$itemID=null
)
{    $version = "26.5.1";
    switch ($lookingFor) {
        case "puuid":
            return "/riot/account/v1/accounts/by-riot-id/$user/$tagLine";
        case "summoner":
            return "/lol/summoner/v4/summoners/by-puuid/$puuid";
        case "mastery":
            return "/lol/champion-mastery/v4/champion-masteries/by-puuid/$puuid";
        case "pfp":
            return "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/$pfpID";
        case "matchesID":
            return "/lol/match/v5/matches/by-puuid/$puuid/ids";
        case "rankedStats":
            return "/lol/league/v4/entries/by-puuid/$puuid";
        case "match":
            return "/lol/match/v5/matches/$matchID";
        case "championImage":
            return "https://ddragon.leagueoflegends.com/cdn/$version/img/champion/$championName.png";
        case "itemImage":
            return "https://ddragon.leagueoflegends.com/cdn/$version/img/item/$itemID.png";
        default:
            break;
    }
}
?>