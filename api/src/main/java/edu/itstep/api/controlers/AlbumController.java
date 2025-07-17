package edu.itstep.api.controlers;

import edu.itstep.api.models.Album;
import edu.itstep.api.repositories.AlbumRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/albums")
@CrossOrigin(origins = "http://localhost:3000")
public class AlbumController {
    private final AlbumRepository albumRepository;

    public AlbumController(AlbumRepository albumRepository) {this.albumRepository = albumRepository;}

    @GetMapping
    public List<Album> getAlbum() {
        return albumRepository.findAll();
    }

    @GetMapping("/{id}")
    public Album getAlbums(@PathVariable Long id) {
        return albumRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createAlbum(@RequestBody Album album) throws URISyntaxException {
        Album savedAlbum = albumRepository.save(album);
        return ResponseEntity.created(new URI("/albums/" + savedAlbum.getId())).body(savedAlbum);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteAlbum(@PathVariable Long id) {
        albumRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
