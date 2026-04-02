 package com.kaike.lolstats;

import tools.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RiotService {

    @Value("${riot.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private HttpEntity<Void> authHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Riot-Token", apiKey);
        return new HttpEntity<>(headers);
    }

    public String searchPuuid(String gameName, String tagLine) {
        String url = String.format(
            "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/%s/%s",
            gameName, tagLine
        );
        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, authHeader(), JsonNode.class);
        return response.getBody().get("puuid").asText();
    }

    public String searchLastGameId(String puuid) {
        String url = String.format(
            "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/%s/ids?start=0&count=1",
            puuid
        );
        ResponseEntity<String[]> response = restTemplate.exchange(url, HttpMethod.GET, authHeader(), String[].class);
        return response.getBody()[0];
    }

    public Game searchMatchDetails(String matchId, String puuid) {
        String url = String.format(
            "https://americas.api.riotgames.com/lol/match/v5/matches/%s",
            matchId
        );
        ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.GET, authHeader(), JsonNode.class);
        JsonNode players = response.getBody().get("info").get("participants");

        for (JsonNode player : players) {
            if (player.get("puuid").asText().equals(puuid)) {
                Game game = new Game();
                game.setChampion(player.get("championName").asText());
                game.setKills(player.get("kills").asInt());
                game.setDeaths(player.get("deaths").asInt());
                game.setAssists(player.get("assists").asInt());
                game.setWin(player.get("win").asBoolean());
                return game;
            }
        }
        return null;
    }
}