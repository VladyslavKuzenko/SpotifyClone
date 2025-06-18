package edu.itstep.api.controlers;

import edu.itstep.api.models.Goal;
import edu.itstep.api.models.Vibe;
import edu.itstep.api.repositories.VibeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/vibes")
@CrossOrigin(origins = "http://localhost:3000")
public class VibeController {

    private final VibeRepository vibeRepository;

    public VibeController(VibeRepository vibeRepository) {
        this.vibeRepository = vibeRepository;
    }

    @GetMapping
    public List<Vibe> getVibes() {
        return vibeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Vibe getVibe(@PathVariable Long id) {
        return vibeRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createVibe(@RequestBody Vibe vibe) throws URISyntaxException {
        Vibe savedVibe = vibeRepository.save(vibe);
        return ResponseEntity.created(new URI("/vibes/" + savedVibe.getId())).body(savedVibe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteVibe(@PathVariable Long id) {
        vibeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
