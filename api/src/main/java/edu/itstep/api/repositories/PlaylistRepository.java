package edu.itstep.api.repositories;

import edu.itstep.api.models.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findAllByUser_Id(String id);

    Playlist findByTitleAndUser_Id(String title, String userId);
}
