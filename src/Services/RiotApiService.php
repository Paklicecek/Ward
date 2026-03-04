<?php
class ApiClient{
    private string $baseUrl;
    private array $headers;
    private string $apiKey;
    public function __construct($baseUrl)
    {
        $this->baseUrl = rtrim($baseUrl, "/");
        $env = parse_ini_file(__DIR__ . '/../../.env');
        $this->apiKey = $env["API_KEY"];
        $this->headers = ["X-Riot-Token: {$this->apiKey}"];
        // here the logic for base url?
    }
    public function get($endpoint): array{
        $ch = curl_init($this->baseUrl . $endpoint);
        curl_setopt_array($ch,[
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER=> $this->headers,
            CURLOPT_TIMEOUT => 10,
        ]);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if ($response === false) {
            throw new \RuntimeException(curl_error($ch));
        }   
        unset($ch);
        return[
            "status" => $httpCode,
            "data" => json_decode($response, true)
        ];
    }
}
?>