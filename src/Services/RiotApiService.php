<?php
class ApiClient{
    private string $baseUrl;
    private array $headers;
    private string $apiKey;

    public function __construct($baseUrl, $headers = [])
    {
        $this->baseUrl = rtrim($baseUrl, "/");
        $this->headers = $headers;
        $this->apiKey = $_ENV["API_KEY"];
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