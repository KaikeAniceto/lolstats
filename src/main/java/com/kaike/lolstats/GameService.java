package com.kaike.lolstats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    public Game saveGames(Game newGame) {
        return repository.save(newGame);
    }

    public List<Game> listGames() {
        return repository.findAll();
    }

    public void deleteGames(Long id) {
        repository.deleteById(id);
    }

    public Game updateGames(Long id, Game updatedGame) {
        updatedGame.setId(id);
        return repository.save(updatedGame);
    }
}
