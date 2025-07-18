package edu.itstep.api.repositories;

import edu.itstep.api.models.Track;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TrackRepository extends JpaRepository<Track, Long> {
    List<Track> findAllByArtist_Id(String artistId);

    Track findFirstByOrderByIdDesc();

    List<Track> findAllByOrderByListeningCountDesc(Pageable pageable);

    List<Track> findByCreatedAtAfterOrderByListeningCountDesc(LocalDateTime after, Pageable pageable);

    @Query("""
                SELECT t FROM Track t
                WHERE t.id NOT IN (
                    SELECT t2.id FROM Track t2
                    JOIN t2.playlists p
                    WHERE p.title = 'Like' AND p.user.id = :userId
                )
            """)
    List<Track> findTracksNotInLikePlaylist(@Param("userId") String userId);
}