package edu.itstep.api.controlers;

import edu.itstep.api.models.Artist;
import edu.itstep.api.models.Track;
import edu.itstep.api.repositories.ArtistRepository;
import edu.itstep.api.repositories.PlaylistRepository;
import edu.itstep.api.repositories.TrackRepository;
import edu.itstep.api.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/tracks")
@CrossOrigin(origins = "http://localhost:3000")
public class TrackController {
    private final TrackRepository trackRepository;
    private final PlaylistRepository playlistRepository;


    public TrackController(TrackRepository trackRepository, PlaylistRepository playlistRepository) {
        this.trackRepository = trackRepository;
        this.playlistRepository = playlistRepository;
    }

    @GetMapping
    public List<Track> getTracks() {
        return trackRepository.findAll();
    }

    @GetMapping("/{id}")
    public Track getTrack(@PathVariable Long id) {
        return trackRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/tracks-by-artists/{id}")
    public List<Track> getAllArtistTrack(@PathVariable Long id) {
        return trackRepository.findAllByArtist_Id(id);
    }

    @GetMapping("/tracks/{id}")
    public Set<Track> getAllTracksByPlaylist(@PathVariable Long id) {
        return playlistRepository.findById(id).orElseThrow(RuntimeException::new).getTracks();
    }

    @GetMapping("/top")
    public List<Track> getAllByOrderByListeningCountDescWithParams(@RequestParam Integer first, @RequestParam Integer count, @RequestParam(required = false, defaultValue = "all") String period) {
        Pageable pageable = PageRequest.of(first, count);
        LocalDateTime from;
        switch (period.toLowerCase()) {
            case "day":
                from = LocalDateTime.now().minusDays(1);
                break;
            case "week":
                from = LocalDateTime.now().minusWeeks(1);
                break;
            case "month":
                from = LocalDateTime.now().minusMonths(1);
                break;
            case "year":
                from = LocalDateTime.now().minusYears(1);
                break;
            default:
                from = null;
                break;
        }
        if (from == null)
            return trackRepository.findAllByOrderByListeningCountDesc(pageable);
        else
            return trackRepository.findByCreatedAtAfterOrderByListeningCountDesc(from, pageable);
    }

    @GetMapping("/lastTrack")
    public Track getLastAdded() {
        return trackRepository.findFirstByOrderByIdDesc();
    }

    @PostMapping
    public ResponseEntity createTrack(@RequestBody Track track) throws URISyntaxException {
        Track savedTrack = trackRepository.save(track);
        return ResponseEntity.created(new URI("/tracks/" + savedTrack.getId())).body(savedTrack);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTrack(@PathVariable Long id) {
        trackRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
