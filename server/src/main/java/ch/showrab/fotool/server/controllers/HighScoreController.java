package ch.showrab.fotool.server.controllers;

import ch.showrab.fotool.server.entities.HighScore;
import ch.showrab.fotool.server.entities.Photo;
import ch.showrab.fotool.server.repositories.HighScoreRepository;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
public class HighScoreController {
    private final HighScoreRepository highScoreRepository;

    public HighScoreController(HighScoreRepository highScoreRepository) {
        this.highScoreRepository = highScoreRepository;
    }

    @GetMapping("/highScore")
    public List<HighScore> getHighScore() {
        return (List<HighScore>) highScoreRepository.findAllByOrderByTourNameAscScoreAsc();
    }

    @GetMapping("/highScore/{tour}")
    public List<HighScore> getHighScoreByTour(@PathVariable("tour") String tour) {
        return (List<HighScore>) highScoreRepository.findAllByTourNameOrderByScore(tour);
    }

    @GetMapping("/team/{teamName}")
    public List<HighScore> getTeamIndex(@PathVariable("teamName") String teamName) {
        return highScoreRepository.findAllByTeamName(teamName);
    }

    @PostMapping("/highScore")
    Long addScore(@RequestBody HighScore score) {
        return highScoreRepository.save(score).getId();
    }

    @DeleteMapping("/highScore/delete/{id}")
    void addPhoto(@PathVariable("id") Long id) {
        highScoreRepository.deleteById(id);
    }

}
