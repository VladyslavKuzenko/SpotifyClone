package edu.itstep.api.controlers;

import edu.itstep.api.models.Playlist;
import edu.itstep.api.repositories.PlaylistRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/playlists")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaylistController {

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

    @PostMapping
    public ResponseEntity createPlaylist(@RequestBody Playlist Playlist) throws URISyntaxException {
        Playlist savedPlaylist = PlaylistRepository.save(Playlist);
        return ResponseEntity.created(new URI("/Playlists/" + savedPlaylist.getId())).body(savedPlaylist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePlaylist(@PathVariable Long id) {
        PlaylistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
