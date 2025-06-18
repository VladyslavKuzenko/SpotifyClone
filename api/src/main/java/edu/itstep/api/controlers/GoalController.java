package edu.itstep.api.controlers;

import edu.itstep.api.models.Genre;
import edu.itstep.api.models.Goal;
import edu.itstep.api.repositories.GoalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/goals")
@CrossOrigin(origins = "http://localhost:3000")
public class GoalController {

    private final GoalRepository goalRepository;

    public GoalController(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    @GetMapping
    public List<Goal> getGoals() {
        return goalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Goal getGoal(@PathVariable Long id) {
        return goalRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createGoal(@RequestBody Goal goal) throws URISyntaxException {
        Goal savedGoal = goalRepository.save(goal);
        return ResponseEntity.created(new URI("/goals/" + savedGoal.getId())).body(savedGoal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteGoal(@PathVariable Long id) {
        goalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
