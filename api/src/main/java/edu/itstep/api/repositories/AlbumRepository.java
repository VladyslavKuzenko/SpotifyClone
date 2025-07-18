package edu.itstep.api.repositories;

import edu.itstep.api.models.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {
 List<Album> findAllByArtist_Id(String artist_id);
}
