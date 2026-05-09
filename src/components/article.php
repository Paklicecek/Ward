<?php

namespace App\components;

class article
{
    public function h1($text): string
    {
        return "<h1>$text</h1>";
    }

    public function h2($text): string
    {
        return "<h2>$text</h2>";
    }

    public function p($text): string
    {
        return "<p>$text</p>";
    }

    public function img($src, $alt): string
    {
        return "<img src=\"$src\" alt=\"$alt\">";
    }

    public function ul($items): string
    {
        $liString = "";
        
        foreach ($items as $item) {
            $liString .= "<li>$item</li>";
        }
        
        return "<ul>" . $liString . "</ul>";
    }

    public function a($text, $url): string 
    {
        return "<a href=\"$url\">$text</a>";
    }

    public function openSection(): string
    {
        return "<section>";
    }

    public function closeSection(): string
    {
        return "</section>";
    }
}