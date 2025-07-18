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
    private final PostRepository postRepository;
//    private PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        return postRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/byFollowing/{id}")
    public List<Post> getPostByFollowing(@PathVariable String id) {
        return postService.getPostByFollowing(id);
    }

    @GetMapping("/userPosts/{id}")
    public List<Post> getPostByUser(@PathVariable String id) {
        return postRepository.findByUserId(id);
    }

    @PostMapping
    public ResponseEntity createPost(@RequestBody Post Post) throws URISyntaxException {
        Post savedPost = postRepository.save(Post);
        return ResponseEntity.created(new URI("/Posts/" + savedPost.getId())).body(savedPost);
    }

    @PostMapping("/upload/{postId}")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable Long postId) {
        return postService.postFileToVM(file, "post" + postId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        Post post = postService.updatePost(id, updatedPost);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
