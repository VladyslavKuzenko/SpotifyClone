package edu.itstep.api.controlers;

import edu.itstep.api.models.Country;
import edu.itstep.api.models.Genre;
import edu.itstep.api.repositories.CountryRepository;
import edu.itstep.api.repositories.GenreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/genres")
@CrossOrigin(origins = "http://localhost:3000")
public class GenreController {

    private final GenreRepository genreRepository;

    public GenreController(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @GetMapping
    public List<Genre> getGenres() {
        return genreRepository.findAll();
    }

    @GetMapping("/{id}")
    public Genre getGenre(@PathVariable Long id) {
        return genreRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createGenre(@RequestBody Genre genre) throws URISyntaxException {
        Genre savedGenre = genreRepository.save(genre);
        return ResponseEntity.created(new URI("/genres/" + savedGenre.getId())).body(savedGenre);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteGenre(@PathVariable Long id) {
        genreRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
