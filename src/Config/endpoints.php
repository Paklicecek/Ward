<?php
function getEndpoint($user,$tagLine,$location,$puuid,$lookingFor,$pfpID,$matchID,$summonerID){
    switch ($lookingFor) {
        case "puuid":
            return "/riot/account/v1/accounts/by-riot-id/$user/$tagLine";
            break;
        case "summoner":
            return "/lol/summoner/by-puuid/$puuid";
            break;
        default:
            # code...
            break;
    }
}
?>