package edu.itstep.api.controlers;

import edu.itstep.api.models.Track;
import edu.itstep.api.repositories.PlaylistRepository;
import edu.itstep.api.repositories.TrackRepository;
import edu.itstep.api.services.PostService;
import edu.itstep.api.services.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/tracks")
@CrossOrigin(origins = "http://localhost:3000")
public class TrackController {
    private final TrackRepository trackRepository;
    private final PlaylistRepository playlistRepository;
    @Autowired
    private PostService postService;
    private TrackService trackService;


    public TrackController(TrackRepository trackRepository, PlaylistRepository playlistRepository, TrackService trackService) {
        this.trackRepository = trackRepository;
        this.playlistRepository = playlistRepository;
        this.trackService = trackService;
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
    public List<Track> getAllArtistTrack(@PathVariable String id) {
        return trackRepository.findAllByArtist_Id(id);
    }
    @GetMapping("/tracks-without-like/{userId}")
    public List<Track> getAllTracksWithoutPlaylist(@PathVariable String userId) {
        List<Track> tracks =trackRepository.findTracksNotInLikePlaylist(userId);
        List<Track> sortedTrack = tracks.stream()
                .sorted(Comparator.comparing(Track::getCreatedAt).reversed().thenComparing(Track::getId)) // сортування
                .toList();
        return sortedTrack;
    }

    @GetMapping("/tracks-by-postTime/{id}")
    public List<Track> getAllTracksByPlaylist(@PathVariable Long id) {
        Set<Track> tracks = playlistRepository.findById(id)
                .orElseThrow(RuntimeException::new)
                .getTracks();

        List<Track> sortedTrack = tracks.stream()
                .sorted(Comparator.comparing(Track::getCreatedAt).reversed().thenComparing(Track::getId)) // сортування
                .toList();
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!sortedTrack");
        System.out.println(sortedTrack);
        return sortedTrack;
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
    public Track createTrack(@RequestBody Track track) throws URISyntaxException {
        Track savedTrack = trackRepository.save(track);
        return savedTrack;
    }

    @PostMapping("/upload/{trackId}")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable Long trackId) {
        return postService.postFileToVM(file, "track" + trackId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Track> updateTrack(@PathVariable Long id, @RequestBody Track updatedTrack) {
        Track track = trackService.updateTrack(id, updatedTrack);
        return ResponseEntity.ok(track);
    }

    @PutMapping("/add-listening/{song_id}")
    public ResponseEntity<Track> updateTrack(@PathVariable Long song_id) {
        Track track = trackService.addListeningToTrack(song_id);
        return ResponseEntity.ok(track);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteTrack(@PathVariable Long id) {
        trackRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
