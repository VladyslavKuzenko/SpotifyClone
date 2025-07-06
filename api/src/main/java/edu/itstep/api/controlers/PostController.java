package edu.itstep.api.controlers;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import edu.itstep.api.models.Post;
import edu.itstep.api.models.Story;
import edu.itstep.api.repositories.PostRepository;
import edu.itstep.api.services.PostService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
    @Autowired
    private PostService postService;
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
    @PostMapping("/upload/{postId}")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,@PathVariable Long postId){
        return postService.postFileToVM(file,"post"+postId);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        Post post = postService.updatePost(id, updatedPost);
        return ResponseEntity.ok(post);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {
        PostRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
