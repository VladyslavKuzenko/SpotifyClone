package edu.itstep.api.repositories;

import edu.itstep.api.models.Artist;
import edu.itstep.api.models.Track;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackRepository extends JpaRepository<Track, Long> {
    List<Track> findAllByArtist_Id(Long artistId);
    Track findFirstByOrderByIdDesc();
    List<Track> findAllByOrderByListeningCountDesc(Pageable pageable);
}