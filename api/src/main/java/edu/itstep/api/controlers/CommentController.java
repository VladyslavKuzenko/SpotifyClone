package edu.itstep.api.controlers;

import edu.itstep.api.models.Comment;
import edu.itstep.api.repositories.CommentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    private final CommentRepository commentRepository;

    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Comment getComment(@PathVariable Long id) {
        return commentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) throws URISyntaxException {
        Comment savedComment = commentRepository.save(comment);
        return savedComment;
//        return ResponseEntity.created(new URI("/comments/" + savedComment.getId())).body(savedComment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
