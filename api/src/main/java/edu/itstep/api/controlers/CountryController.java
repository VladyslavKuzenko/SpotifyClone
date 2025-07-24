package edu.itstep.api.controlers;

import edu.itstep.api.models.Country;
import edu.itstep.api.repositories.CountryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/countries")
//@CrossOrigin(origins = "http://localhost:3000")
public class CountryController {

    private final CountryRepository countryRepository;

    public CountryController(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @GetMapping
    public List<Country> getCountries() {
        return countryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Country getCountry(@PathVariable Long id) {
        return countryRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createCountry(@RequestBody Country country) throws URISyntaxException {
        Country savedCountry = countryRepository.save(country);
        return ResponseEntity.created(new URI("/countries/" + savedCountry.getId())).body(savedCountry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCountry(@PathVariable Long id) {
        countryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
