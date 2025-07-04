package edu.itstep.api.controlers;

import edu.itstep.api.models.Playlist;
import edu.itstep.api.models.User;
import edu.itstep.api.repositories.PlaylistRepository;
import edu.itstep.api.services.PlaylistService;
import edu.itstep.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/playlists")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private UserService userService;

    private final PlaylistRepository PlaylistRepository;

    public PlaylistController(PlaylistRepository PlaylistRepository) {
        this.PlaylistRepository = PlaylistRepository;
    }

    @GetMapping
    public List<Playlist> getPlaylists() {
        return PlaylistRepository.findAll();
    }

    @GetMapping("/{id}")
    public Playlist getPlaylist(@PathVariable Long id) {
        return PlaylistRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/playlists/{id}")
    public List<Playlist> getPlaylist(@PathVariable String id) {
        return PlaylistRepository.findAllByUser_Id(id);
    }
    @GetMapping("/playlists/{id}/{title}")
    public Playlist getPlaylist(@PathVariable String id,@PathVariable String title) {
        return PlaylistRepository.findByTitleAndUser_Id(title,id);
    }

    @PostMapping
    public ResponseEntity createPlaylist(@RequestBody Playlist Playlist) throws URISyntaxException {
        Playlist savedPlaylist = PlaylistRepository.save(Playlist);
        return ResponseEntity.created(new URI("/Playlists/" + savedPlaylist.getId())).body(savedPlaylist);
    }

    @PostMapping("/{playlistId}/tracks/{trackId}")
    public ResponseEntity<?> addTrackToPlaylist(@PathVariable Long playlistId, @PathVariable Long trackId) {
        playlistService.addTrackToPlaylist(playlistId, trackId);
        return ResponseEntity.ok("Track added to playlist");
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePlaylist(@PathVariable Long id) {
        PlaylistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{playlistId}/tracks/{trackId}")
    public ResponseEntity<?> removeTrackFromPlaylist(@PathVariable Long playlistId, @PathVariable Long trackId) {
        playlistService.removeTrackFromPlaylist(playlistId, trackId);
        return ResponseEntity.ok("Track removed from playlist");
    }
}
