package edu.itstep.api.repositories;

import edu.itstep.api.models.Artist;
import edu.itstep.api.models.Track;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TrackRepository extends JpaRepository<Track, Long> {
    List<Track> findAllByArtist_Id(String artistId);
    Track findFirstByOrderByIdDesc();
    List<Track> findAllByOrderByListeningCountDesc(Pageable pageable);
    List<Track> findByCreatedAtAfterOrderByListeningCountDesc(LocalDateTime after, Pageable pageable);
}