<?php

namespace Build\Tools\AutoGpt;

use phpOMS\Message\Http\HttpRequest;
use phpOMS\Message\Http\Rest;
use phpOMS\Uri\HttpUri;

class GptHelper
{
    private const ENDPOINT   = 'https://api.openai.com/v1/chat/completions';
    private const APIKEY     = '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';
    private const MODEL      = 'gpt-3.5-turbo';
    private const TEMPERATUR = 0.9;
    private const MAX_TOKENS = 1700;
    private const MAX_STRLEN = 1300;

    private const LIMIT_REQUEST_PER_MINUTE = 3;
    private const LIMIT_TOKENS_PER_MINUTE  = 40000;

    private static $lastRun = 0;

    public static function defaultFileReader($in, $filename)
    {
        return \fgets($in);
    }

    public static function aiRequest(string $behavior, string $content) : string
    {
        if (\trim($content) === '') {
            return '';
        }

        $requestBody = [
            'model' => self::MODEL,
            'max_tokens' => self::MAX_TOKENS,
            'temperature' => self::TEMPERATUR,
            'messages' => [
                [
                    'role' => 'system',
                    'content' => $behavior,
                ],
                [
                    'role' => 'user',
                    'content' => $content,
                ]
            ]
        ];

        $request = new HttpRequest(new HttpUri(self::ENDPOINT));
        $request->header->set('Authorization', 'Bearer ' . self::APIKEY);
        $request->header->set('Content-Type', 'application/json');
        $request->setMethod('POST');
        $request->data = $requestBody;

        do {
            $time = \time();
            if ($time - self::$lastRun <= (int) (61 / self::LIMIT_REQUEST_PER_MINUTE)) {
                \sleep((int) (61 / self::LIMIT_REQUEST_PER_MINUTE - ($time - self::$lastRun)) + 1);
            }

            $response = Rest::request($request);
            self::$lastRun = \time();
        } while (\stripos($response->getBody(), '"code":502') !== false
            || \stripos($response->getBody(), '"code": 502') !== false
            || \stripos($response->getBody(), '503 Service') !== false
        );

        return $response->getBody();
    }

    public static function handleFile(string $inPath, string $outPath, string $behavior, Callable $fileReader, bool $bulk = true) : string
    {
        $response = '';

        $in    = \fopen($inPath, 'r');
        $out   = \fopen($outPath . ($inPath === $outPath ? '.out' : ''), 'w');
        $lines = '';

        while (($line = $fileReader($in, $inPath)) !== false) {
            $line = \str_replace('    ', "\t", $line);
            if (\strlen($line) > self::MAX_STRLEN) {
                continue;
            }

            if (!$bulk) {
                $lines = $line;
            }

            if (!$bulk || \strlen($lines) + \strlen($line) > self::MAX_STRLEN) {
                $response = self::aiRequest($behavior, $lines);

                if ($response === '' || $response === false) {
                    continue;
                }

                if(\stripos($outPath, '.php') !== false) {
                    $response = \str_replace('```', '', $response);
                }

                $json = \json_decode($response, true);
                \fwrite($out, $json[5][0]['message']['content']);
                \fwrite($out, "\n");

                $lines = '';
            }

            if ($bulk) {
                $lines .= $line . "\n";
            }
        }

        if (\trim($lines) !== '' && \strlen($lines) <= self::MAX_STRLEN) {
            $response = self::aiRequest($behavior, $lines);

            if ($response !== '' && $response !== false) {
                if(\stripos($outPath, '.php') !== false) {
                    $response = \str_replace('```', '', $response);
                }

                $json = \json_decode($response, true);
                \fwrite($out, $json[5][0]['message']['content']);
                \fwrite($out, "\n");
            }
        }

        if ($outPath === 'php://memory') {
            \rewind($out);
            $response = \stream_get_contents($out);
        }

        if ($inPath === $outPath) {
            if (\ftell($in) === 0 || \ftell($out) / \ftell($in) < 0.9) {
                \unlink($outPath . '.out');
            } else {
                \unlink($outPath);
                \rename($outPath . '.out', $outPath);
            }
        }

        \fclose($in);
        \fclose($out);

        return $response;
    }
}