package edu.itstep.api.controlers;

import edu.itstep.api.models.Genre;
import edu.itstep.api.models.Goal;
import edu.itstep.api.models.User;
import edu.itstep.api.models.Vibe;
import edu.itstep.api.models.dto.UserCreationDTO;
import edu.itstep.api.repositories.GenreRepository;
import edu.itstep.api.repositories.GoalRepository;
import edu.itstep.api.repositories.UserRepository;
import edu.itstep.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import edu.itstep.api.repositories.VibeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private UserService userService;

    private final GoalRepository goalRepository;
    private final GenreRepository genreRepository;
    private final VibeRepository vibeRepository;

    public UserController(UserRepository userRepository, GoalRepository goalRepository, GenreRepository genreRepository, VibeRepository vibeRepository) {
        this.userRepository = userRepository;
        this.goalRepository = goalRepository;
        this.genreRepository = genreRepository;
        this.vibeRepository = vibeRepository;
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @GetMapping("/userFollowing/{id}")
    public Set<User> getUserFollowing(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new).getFollowings();
    }
    @GetMapping("/userByFollowers/{count}")
    public List<User> getUserOrderByFollowersCount(@PathVariable Integer count) {
        Pageable pageable = PageRequest.of(0, count);
        return userRepository.findAllByOrderByFollowersCountDesc(pageable);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserCreationDTO dto) throws URISyntaxException {
        User user = new User();
        user.setId(dto.id);
        user.setFirstName(dto.firstName);
        user.setLastName(dto.lastName);
        user.setUsername(dto.username);
        user.setShortBio(dto.shortBio);

        user.setFollowingsCount(0);
        user.setFollowersCount(0);
        user.setShowListeningHistory(true);
        user.setAllowMessages(true);
        user.setUiTheme("light");
        user.setFollowings(new HashSet<>());
        user.setFollowers(new HashSet<>());
        user.setChats(new HashSet<>());
        user.setTracksListenings(new HashSet<>());

        if (dto.goal != null && dto.goal.id != null) {
            Goal goal = goalRepository.findById(dto.goal.id).orElse(null);
            user.setGoal(goal);
        }

        if (dto.genres != null) {
            Set<Genre> genreSet = dto.genres.stream()
                    .map(g -> genreRepository.findById(g.id).orElse(null))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());
            user.setGenres(genreSet);
        }

        if (dto.vibes != null) {
            Set<Vibe> vibeSet = dto.vibes.stream()
                    .map(v -> vibeRepository.findById(v.id).orElse(null))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());
            user.setVibes(vibeSet);
        }

        User savedUser = userRepository.save(user);
        String encodedId = URLEncoder.encode(savedUser.getId(), StandardCharsets.UTF_8);
        return ResponseEntity.created(new URI("/users/" + encodedId)).body(savedUser);
    }
    @PostMapping("/follow/{follower_id}/{followed_id}")
    public ResponseEntity<?> addFollowing(@PathVariable String follower_id,@PathVariable String followed_id) throws URISyntaxException {
        userService.addFollowing(follower_id,followed_id);
        return ResponseEntity.ok("Genre added");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/follow/{follower_id}/{followed_id}")
    public ResponseEntity<?> deleteFollowing(@PathVariable String follower_id,@PathVariable String followed_id) throws URISyntaxException {
        userService.deleteFollowing(follower_id,followed_id);
        return ResponseEntity.ok("Genre added");
    }


    @GetMapping("/hasProfileConfirmation/{id}")
    public Boolean hasProfileConfirmation(@PathVariable String id) {
        return userRepository.existsById(id);
    }

    @GetMapping("/isUsernameUnique/{username}")
    public Boolean isUsernameUnique(@PathVariable String username) {
        return !userRepository.existsById(username);
    }
}
