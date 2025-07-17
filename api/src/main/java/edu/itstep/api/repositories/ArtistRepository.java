package edu.itstep.api.repositories;

import edu.itstep.api.models.Artist;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtistRepository extends JpaRepository<Artist, String> {
    List<Artist> findAllByOrderByListeningCountDesc(Pageable pageable);
    List<Artist> findAllByOrderByListeningCountDesc();

    List<Artist> findArtistsByUser_FirstName(String name);
    Artist findArtistsByUser_Id(String id);
    Artist findTopByOrderByListeningCountDesc();

}
