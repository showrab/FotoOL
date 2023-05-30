package ch.showrab.fotool.server.controllers;

import ch.showrab.fotool.server.entities.Photo;
import ch.showrab.fotool.server.repositories.PhotoRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
public class PhotoController {

    private final PhotoRepository photoRepository;

    public PhotoController(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    @GetMapping("/photos")
    public List<Photo> getPhotos() {
        return (List<Photo>) photoRepository.findAllByOrderByTourNameAscSortOrderAsc();
    }

    @GetMapping("/photos/{tourName}")
    public List<Photo> getPhotosByTourName(@PathVariable("tourName") String tourName) {
        return (List<Photo>) photoRepository.findAllByTourNameAndHiddenOrderBySortOrder(tourName, false);
    }
    @Transactional
    @PostMapping("/photo")
    public void addPhoto(@RequestBody Photo photo) {
//        System.out.println("addPhoto(" + photo.toString() + ")");
        photoRepository.save(photo);
    }

    @DeleteMapping("/photo/delete/{id}")
    void addPhoto(@PathVariable("id") Long id) {
        photoRepository.deleteById(id);
    }
}
