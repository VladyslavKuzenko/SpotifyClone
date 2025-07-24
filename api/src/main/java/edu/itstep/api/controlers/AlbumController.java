package edu.itstep.api.controlers;

import edu.itstep.api.models.Album;
import edu.itstep.api.models.Track;
import edu.itstep.api.repositories.AlbumRepository;
import edu.itstep.api.services.AlbumService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/albums")
@CrossOrigin(origins = "http://localhost:3000")
public class AlbumController {
    private final AlbumRepository albumRepository;
    private final AlbumService albumService;

    public AlbumController(AlbumRepository albumRepository, AlbumService albumService) {
        this.albumRepository = albumRepository;
        this.albumService = albumService;
    }

    @GetMapping
    public List<Album> getAlbum() {
        return albumRepository.findAll();
    }

    @GetMapping("/{id}")
    public Album getAlbums(@PathVariable Long id) {
        return albumRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @GetMapping("/albums-by-artists/{id}")
    public List<Album> getAllArtistAlbum(@PathVariable String id) {
        return albumRepository.findAllByArtist_Id(id);
    }
    @GetMapping("/albums-tracks/{id}")
    public Set<Track> getAllArtistAlbum(@PathVariable Long id) {
        return albumRepository.findById(id).orElseThrow(RuntimeException::new).getTracks();
    }

    @PostMapping
    public Album createAlbum(@RequestBody Album album) throws URISyntaxException {
        Album savedAlbum = albumRepository.save(album);
        return savedAlbum;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Album> updateAlbum(@PathVariable Long id, @RequestBody Album updatedAlbum) {
        Album album = albumService.updateAlbum(id, updatedAlbum);
        return ResponseEntity.ok(album);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAlbum(@PathVariable Long id) {
        albumRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
