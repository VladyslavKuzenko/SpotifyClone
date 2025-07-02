package edu.itstep.api.controlers;

import edu.itstep.api.models.User;
import edu.itstep.api.repositories.UserRepository;
import edu.itstep.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private UserService userService;


    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    @PostMapping
    public ResponseEntity createUser(@RequestBody User user) throws URISyntaxException {
        User savedUser = userRepository.save(user);
        return ResponseEntity.created(new URI("/users/" + savedUser.getId())).body(savedUser);
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

}
