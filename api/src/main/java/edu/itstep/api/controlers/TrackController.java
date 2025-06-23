package edu.itstep.api.controlers;

import edu.itstep.api.models.Artist;
import edu.itstep.api.models.Track;
import edu.itstep.api.repositories.ArtistRepository;
import edu.itstep.api.repositories.TrackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/tracks")
@CrossOrigin(origins = "http://localhost:3000")
public class TrackController {
    private final TrackRepository trackRepository;

    public TrackController(TrackRepository trackRepository) {this.trackRepository = trackRepository;}

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
