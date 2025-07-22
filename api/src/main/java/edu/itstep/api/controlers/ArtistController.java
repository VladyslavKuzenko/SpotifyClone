package edu.itstep.api.controlers;

import edu.itstep.api.models.Artist;
import edu.itstep.api.repositories.ArtistRepository;
import edu.itstep.api.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/artists")
@CrossOrigin(origins = "http://localhost:3000")
public class ArtistController {
    @Autowired
    private ArtistService artistService;
    private final ArtistRepository artistRepository;

    public ArtistController(ArtistRepository artistRepository) {this.artistRepository = artistRepository;}

    @GetMapping
    public List<Artist> getArtists() {
        return artistRepository.findAll();
    }

    @GetMapping("/{id}")
    public Artist getArtist(@PathVariable String id) {
        return artistRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @GetMapping("/byUser/{id}")
    public Artist getArtistByUserId(@PathVariable String id) {
        return artistRepository.findArtistsByUser_Id(id);
    }
    @GetMapping("/top")
    public Artist getTopByOrderByListeningCountDesc() {
        return artistRepository.findTopByOrderByListeningCountDesc();
    }
    @GetMapping("/top/{first}/{count}")
    public List<Artist> getAllByOrderByListeningCountDescWithParams(@PathVariable Integer first,@PathVariable Integer count) {
        Pageable pageable = PageRequest.of(first, first+count);
        return artistRepository.findAllByOrderByListeningCountDesc(pageable);
    }
    @GetMapping("/all")
    public List<Artist> getAllByOrderByListeningCountDesc() {
        return artistRepository.findAllByOrderByListeningCountDesc();
    }
    @PostMapping
    public ResponseEntity createArtist(@RequestBody Artist artist) throws URISyntaxException {
        Artist savedArtist = artistRepository.save(artist);
        return ResponseEntity.created(new URI("/artists/" + savedArtist.getId())).body(savedArtist);
    }
    @PutMapping("/updateAbout")
    public ResponseEntity<Artist> updateAbout(@RequestBody Artist updatedArtist) {
        Artist artist = artistService.updateAbout(updatedArtist);
        return ResponseEntity.ok(artist);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteArtist(@PathVariable String id) {
        artistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
