package ch.showrab.fotool.server.repositories;

import ch.showrab.fotool.server.entities.Photo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends CrudRepository<Photo, Long> {
  public List<Photo> findAllByOrderByTourNameAscSortOrderAsc();
  public List<Photo> findAllByTourNameAndHiddenOrderBySortOrder(String tour, Boolean hidden);

}
