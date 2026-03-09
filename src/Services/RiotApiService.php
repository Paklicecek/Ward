<?php
class ApiClient{
    private string $baseUrl;
    private string $regionalUrl;
    private array $headers;
    private string $apiKey;
    public function __construct($location)
    {
        $apiKey = getenv("API_KEY");
        if(!$apiKey && file_exists(__DIR__ . "/../../.env")) {
            $env = parse_ini_file(__DIR__ . "/../../.env");
            $apiKey = $env["API_KEY"] ?? '';
        }
        $this->apiKey = trim($apiKey);
        $this->headers = ["X-Riot-Token: {$this->apiKey}"];
        // Missing regions -> RU,OCE,TR,LAN,LAS,SEA,TW,VN,ME
        switch($location){
            case "NA":
                $this->baseUrl = "https://na1.api.riotgames.com";
                $this->regionalUrl = "https://americas.api.riotgames.com";
                break; 
            case "EUW":
                $this->baseUrl = "https://euw1.api.riotgames.com";
                $this->regionalUrl = "https://europe.api.riotgames.com";
                break;
            case "EUN":
                $this->baseUrl = "https://eun1.api.riotgames.com";
                $this->regionalUrl = "https://europe.api.riotgames.com";
                break;
            case "KR":
                $this->baseUrl = "https://kr1.api.riotgames.com";
                $this->regionalUrl = "https://asia.api.riotgames.com";
                break;
            case "BR":
                $this->baseUrl = "https://br1.api.riotgames.com";
                $this->regionalUrl = "https://americas.api.riotgames.com";
                break;
            case "JP": 
                $this->baseUrl = "https://jp1.api.riotgames.com";
                $this->regionalUrl = "https://asia.api.riotgames.com";
                break;  
        }
    }
    private function fetch($url): array {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER     => $this->headers,
            CURLOPT_TIMEOUT        => 10,
        ]);
        $response = curl_exec($ch);
        $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($response === false) {
            throw new \RuntimeException(curl_error($ch));
        }

        unset($ch);
        return [
            "status" => $httpCode,
            "data"   => json_decode($response, true)
        ];
    }

    public function getServer($endpoint): array {
        return $this->fetch($this->baseUrl . $endpoint);
    }

    public function getRegional($endpoint): array {
        return $this->fetch($this->regionalUrl . $endpoint);
    }
}
?>