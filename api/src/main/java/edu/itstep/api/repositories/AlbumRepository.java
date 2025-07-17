package edu.itstep.api.repositories;

import edu.itstep.api.models.Album;
import edu.itstep.api.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {
}
