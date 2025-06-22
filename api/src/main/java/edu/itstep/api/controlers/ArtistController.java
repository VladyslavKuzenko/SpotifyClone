package edu.itstep.api.controlers;

import edu.itstep.api.models.Artist;
import edu.itstep.api.repositories.ArtistRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/artists")
@CrossOrigin(origins = "http://localhost:3000")
public class ArtistController {
    private final ArtistRepository artistRepository;

    public ArtistController(ArtistRepository artistRepository) {this.artistRepository = artistRepository;}

    @GetMapping
    public List<Artist> getArtists() {
        return artistRepository.findAll();
    }

    @GetMapping("/{id}")
    public Artist getArtist(@PathVariable Long id) {
        return artistRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @GetMapping("/byUser/{id}")
    public Artist getArtistByUserId(@PathVariable Long id) {
        return artistRepository.findArtistsByUser_Id(id);
    }
    @GetMapping("/top")
    public Artist getTopByOrderByListeningCount() {
        return artistRepository.findTopByOrderByListeningCountDesc();
    }
    @PostMapping
    public ResponseEntity createArtist(@RequestBody Artist artist) throws URISyntaxException {
        Artist savedArtist = artistRepository.save(artist);
        return ResponseEntity.created(new URI("/artists/" + savedArtist.getId())).body(savedArtist);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteArtist(@PathVariable Long id) {
        artistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
