package edu.itstep.api.controlers;

import edu.itstep.api.models.Chat;
import edu.itstep.api.repositories.ChatRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/chats")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    private final ChatRepository ChatRepository;

    public ChatController(ChatRepository ChatRepository) {
        this.ChatRepository = ChatRepository;
    }

    @GetMapping
    public List<Chat> getChats() {
        return ChatRepository.findAll();
    }

    @GetMapping("/{id}")
    public Chat getChat(@PathVariable Long id) {
        return ChatRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createChat(@RequestBody Chat Chat) throws URISyntaxException {
        Chat savedChat = ChatRepository.save(Chat);
        return ResponseEntity.created(new URI("/Chats/" + savedChat.getId())).body(savedChat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteChat(@PathVariable Long id) {
        ChatRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
