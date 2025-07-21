package edu.itstep.api.controlers;

import edu.itstep.api.models.*;
import edu.itstep.api.models.dto.UserCreationDTO;
import edu.itstep.api.repositories.GenreRepository;
import edu.itstep.api.repositories.UserRepository;
import edu.itstep.api.services.PostService;
import edu.itstep.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @Autowired
    private PostService postService;

    private final GenreRepository genreRepository;

    public UserController(UserRepository userRepository, PostService postService, GenreRepository genreRepository) {
        this.userRepository = userRepository;
        this.postService = postService;
        this.genreRepository = genreRepository;
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

    @GetMapping("/userLikedPosts/{id}")
    public Set<Post> getUserLikedPosts(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new).getLikedPosts();
    }

    @GetMapping("/userByFollowers/{count}")
    public List<User> getUserOrderByFollowersCount(@PathVariable Integer count) {
        Pageable pageable = PageRequest.of(0, count);
        return userRepository.findAllByOrderByFollowersCountDesc(pageable);
    }

    @GetMapping("/usersToSubscribe/{count}/{user_id}")
    public List<User> getUserToSubscribe(@PathVariable Integer count, @PathVariable String user_id) {
        return userService.userToSubscribe(count, user_id);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserCreationDTO dto) throws URISyntaxException {
        User user = new User();
        user.setId(dto.id);
        user.setFirstName(dto.firstName);
        user.setLastName(dto.lastName);
        user.setUsername(dto.username);
        user.setShortBio(dto.shortBio);
        user.setIsArtist(dto.isArtist);
        user.setAvatarImgUrl(dto.avatarImgUrl);

        user.setFollowingsCount(0);
        user.setFollowersCount(0);
        user.setShowListeningHistory(true);
        user.setAllowMessages(true);
        user.setFollowings(new HashSet<>());
        user.setFollowers(new HashSet<>());
        user.setChats(new HashSet<>());
        user.setTracksListenings(new HashSet<>());

        if (dto.genres != null) {
            Set<Genre> genreSet = dto.genres.stream()
                    .map(g -> genreRepository.findById(g.id).orElse(null))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());
            user.setGenres(genreSet);
        }

        User savedUser = userRepository.save(user);
        String encodedId = URLEncoder.encode(savedUser.getId(), StandardCharsets.UTF_8);
        return ResponseEntity.created(new URI("/users/" + encodedId)).body(savedUser);
    }

    @PostMapping("/follow/{follower_id}/{followed_id}")
    public ResponseEntity<?> addFollowing(@PathVariable String follower_id, @PathVariable String followed_id) throws URISyntaxException {
        userService.addFollowing(follower_id, followed_id);
        return ResponseEntity.ok("Follow added");
    }

    @PostMapping("/like/{post_id}/{user_id}")
    public ResponseEntity<User> addLike(@PathVariable Long post_id, @PathVariable String user_id) throws URISyntaxException {
        User user = userService.addLike(post_id, user_id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/avatar/upload/{userId}")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable String userId) {
        return postService.postFileToVM(file, "avatar" + userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/follow/{follower_id}/{followed_id}")
    public ResponseEntity<?> deleteFollowing(@PathVariable String follower_id, @PathVariable String followed_id) throws URISyntaxException {
        userService.deleteFollowing(follower_id, followed_id);
        return ResponseEntity.ok("Genre added");
    }

    @DeleteMapping("/like/{post_id}/{user_id}")
    public ResponseEntity<User> deleteLike(@PathVariable Long post_id, @PathVariable String user_id) throws URISyntaxException {
        User user = userService.deleteLike(post_id, user_id);
        return ResponseEntity.ok(user);
    }


    @GetMapping("/hasProfileConfirmation/{id}")
    public Boolean hasProfileConfirmation(@PathVariable String id) {
        return userRepository.existsById(id);
    }

    @GetMapping("/isUsernameUnique/{username}")
    public Boolean isUsernameUnique(@PathVariable String username) {
        return !userRepository.existsById(username);
//        System.out.println("!!!!!!!!!!");
//        System.out.println(username);
//        boolean value = userRepository.existsById(username);
//        System.out.println(value);
//        return value;
    }
}
