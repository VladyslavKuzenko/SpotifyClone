package edu.itstep.api.controlers;

import edu.itstep.api.models.Artist;
import edu.itstep.api.models.Track;
import edu.itstep.api.repositories.ArtistRepository;
import edu.itstep.api.repositories.PlaylistRepository;
import edu.itstep.api.repositories.TrackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
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
