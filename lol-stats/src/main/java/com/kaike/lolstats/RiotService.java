package com.kaike.lolstats;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;

@Service
public class RiotService {
    @Value("${riot.api.key}")
    String apiKey;


    private final RestTemplate restTemplate = new RestTemplate();

    public String searchPuuid(String gameName, String tagLine) {

        String url = String.format("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/%s/%s?api_key=%s",
        gameName,
        tagLine,
        apiKey
        );
        JsonNode response = restTemplate.getForObject(url, JsonNode.class);
        return  response.get("puuid").asText();
    }

    public String searchLastGameId(String puuid) {
        String url = String.format("https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/%s/ids?start=0&count=1&api_key=%s",
        puuid,
        apiKey
        );
        String[] games = restTemplate.getForObject(url, String[].class);
        return games[0];
    }

    public Game searchMatchDetails(String matchId, String puuid) {
        String url = String.format("https://americas.api.riotgames.com/lol/match/v5/matches/%s?api_key=%s",
        matchId,
        apiKey
        );

        JsonNode response = restTemplate.getForObject(url, JsonNode.class);

        JsonNode players = response.get("info").get("participants");

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
