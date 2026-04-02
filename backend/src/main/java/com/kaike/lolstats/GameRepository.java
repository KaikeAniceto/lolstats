package com.kaike.lolstats;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository  extends JpaRepository<Game, Long> {

}
