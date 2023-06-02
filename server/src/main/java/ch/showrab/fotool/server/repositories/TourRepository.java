package ch.showrab.fotool.server.repositories;

import ch.showrab.fotool.server.entities.Tour;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends CrudRepository<Tour, Long> {
    public List<Tour> findAllByHidden(boolean hidden);
}
