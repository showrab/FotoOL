package ch.showrab.fotool.server.repositories;

import ch.showrab.fotool.server.entities.HighScore;
import ch.showrab.fotool.server.entities.Photo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HighScoreRepository extends CrudRepository<HighScore, Long> {
    public List<HighScore> findAllByOrderByTourNameAscScoreAsc();
    public List<HighScore> findAllByTeamName(String teamName);
    public List<HighScore> findAllByTourNameOrderByScore(String tour);
}
