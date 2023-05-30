package ch.showrab.fotool.server.controllers;

import ch.showrab.fotool.server.entities.Tour;
import ch.showrab.fotool.server.repositories.TourRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
// "http://localhost:4200")
public class TourController {
    private final TourRepository tourRepository;

    public TourController(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    @GetMapping("/tourList")
    public List<Tour> getTourList() {
        return (List<Tour>) tourRepository.findAll();
    }

    @GetMapping("/tour")
    public List<Tour> getTour() {
        return (List<Tour>) tourRepository.findAllByHidden(false);
    }

    @PostMapping("/tour")
    void saveTour(@RequestBody Tour tour) {
        tourRepository.save(tour);
    }

    @DeleteMapping("/tour/delete/{id}")
    void deleteTour(@PathVariable("id") long id) {
        tourRepository.deleteById(id);
    }
}
