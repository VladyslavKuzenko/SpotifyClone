package edu.itstep.api.controlers;

import edu.itstep.api.models.Chat;
import edu.itstep.api.models.Message;
import edu.itstep.api.models.User;
import edu.itstep.api.models.dto.MessageDTO;
import edu.itstep.api.repositories.ChatRepository;
import edu.itstep.api.repositories.MessageRepository;
import edu.itstep.api.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.LinkedHashSet;

@RestController
@RequestMapping("/messages")
//@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public MessageController(MessageRepository messageRepository, ChatRepository chatRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Message> getMessages() {
        return messageRepository.findAll();
    }

    @GetMapping("/{id}")
    public Message getMessage(@PathVariable Long id) {
        return messageRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/byChatId/{id}")
    public Set<Message> getChatsByChatId(@PathVariable Long id) {
        Chat chat = chatRepository.findById(id).orElse(null);
        if (chat == null) return null;

        return chat.getMessages().stream()
                .sorted(Comparator.comparing(Message::getSentDateTime))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @PostMapping
    public ResponseEntity<Message> createMessage(@AuthenticationPrincipal Jwt jwt, @RequestBody MessageDTO message) throws URISyntaxException {
        String userId = jwt.getSubject();

        User sender = userRepository.findById(userId).orElse(null);
        if (sender == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Chat selectedChat = chatRepository.findById(message.getChatId()).orElse(null);
        selectedChat.setUpdateTime(LocalDateTime.now());

        Message createdMessage = new Message();

        createdMessage.setContentJson(message.getContentJson());
        createdMessage.setChat(selectedChat);
        createdMessage.setUser(sender);
        createdMessage.setSentDateTime(LocalDateTime.from(Instant.now()));

        Message savedMessage = messageRepository.save(createdMessage);
        return ResponseEntity.created(new URI("/messages/" + savedMessage.getId()))
                .body(savedMessage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMessage(@PathVariable Long id) {
        messageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
