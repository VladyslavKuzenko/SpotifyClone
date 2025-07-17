package edu.itstep.api.controlers;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import edu.itstep.api.models.Post;
import edu.itstep.api.models.Story;
import edu.itstep.api.models.User;
import edu.itstep.api.repositories.PostRepository;
import edu.itstep.api.repositories.StoryRepository;
import edu.itstep.api.services.PostService;
import edu.itstep.api.services.StoryService;
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
@RequestMapping("/story")
@CrossOrigin(origins = "http://localhost:3000")
public class StoryController {
    @Autowired
    private PostService postService;

    private final StoryRepository storyRepository;
    @Autowired
    private StoryService storyService;

    public StoryController(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @GetMapping
    public List<Story> getPosts() {
        return storyRepository.findAll();
    }

    @GetMapping("/{id}")
    public Story getPost(@PathVariable Long id) {
        return storyRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @GetMapping("/followings/{userId}")
    public ResponseEntity<List<Story>> getStoriesOfFollowings(@PathVariable String userId) {
        List<Story> stories = storyService.getStoriesOfFollowings(userId);
        return ResponseEntity.ok(stories);
    }

    @PostMapping
    public Story createPost(@RequestBody Story Story) throws URISyntaxException {
        Story savedPost = storyService.save(Story);
        return savedPost;
//      return ResponseEntity.created(new URI("/Story/" + savedPost.getId())).body(savedPost);
    }
    @PostMapping("/upload/{storyId}")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,@PathVariable Long storyId){
        return postService.postFileToVM(file,"story"+storyId);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Story> updateStory(@PathVariable Long id, @RequestBody Story updatedStory) {
        System.out.println("HERER: "+updatedStory.getMediaUrl());
        System.out.println("HERER: "+updatedStory.getMediaType());
        Story story = storyService.updateStory(id, updatedStory);
        return ResponseEntity.ok(story);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {
        storyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}