package edu.itstep.api.controlers;

import edu.itstep.api.models.Post;
import edu.itstep.api.repositories.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private final PostRepository PostRepository;

    public PostController(PostRepository PostRepository) {
        this.PostRepository = PostRepository;
    }

    @GetMapping
    public List<Post> getPosts() {
        return PostRepository.findAll();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        return PostRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createPost(@RequestBody Post Post) throws URISyntaxException {
        Post savedPost = PostRepository.save(Post);
        return ResponseEntity.created(new URI("/Posts/" + savedPost.getId())).body(savedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {
        PostRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
