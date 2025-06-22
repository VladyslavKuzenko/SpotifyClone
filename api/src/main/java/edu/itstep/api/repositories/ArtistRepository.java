package edu.itstep.api.repositories;

import edu.itstep.api.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtistRepository  extends JpaRepository<Artist, Long> {
    List<Artist> findTop40ByOrderByListeningCount();

    List<Artist> findArtistsByUser_Firstname(String name);
    Artist findArtistsByUser_Id(Long id);
    Artist findTopByOrderByListeningCountDesc();

}
