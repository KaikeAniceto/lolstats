    package com.kaike.lolstats;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;
   

    import java.util.List;

    @RestController
    @RequestMapping("/games")
    @CrossOrigin(origins = "*")
    public class GameController {
        @Autowired
        private GameService service;

        @Autowired
        private RiotService riotService;

        @GetMapping
        public List<Game> listGames(){
            return service.listGames();
        }

        @PostMapping
        public Game saveGames(@RequestBody Game newGame) {
           return service.saveGames(newGame);
        }

        @DeleteMapping("/{id}")
        public void deleteGames(@PathVariable Long id) {
            service.deleteGames(id);
        }

        @PutMapping("/{id}")
        public Game updateGames(@PathVariable Long id, @RequestBody Game updatedGame) {
            updatedGame.setId(id);
            return service.updateGames(id, updatedGame);
        }

      @PostMapping("/import/{gameName}/{tagLine}")
    public Game importLastGame(@PathVariable String gameName, @PathVariable String tagLine) {
        
        String puuid = riotService.searchPuuid(gameName, tagLine);   

        String matchId = riotService.searchLastGameId(puuid);

        Game realGame = riotService.searchMatchDetails(matchId, puuid);

        return service.saveGames(realGame);
    }
}
