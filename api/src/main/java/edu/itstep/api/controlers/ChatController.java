package edu.itstep.api.controlers;

import edu.itstep.api.models.Chat;
import edu.itstep.api.models.User;
import edu.itstep.api.models.dto.PrivateChatDTO;
import edu.itstep.api.repositories.ChatRepository;
import edu.itstep.api.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;


@RestController
@RequestMapping("/chats")
//@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public ChatController(ChatRepository chatRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Chat> getChats() {
        return chatRepository.findAll();
    }

    @GetMapping("/byUserId/{id}")
    public Set<Chat> getChatsByUserId(@PathVariable String id) {
        User user = userRepository.findById(id).orElse(null);
        return user != null ? user.getChats() : null;
    }

    @GetMapping("/{id}")
    public Chat getChat(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        String userId = jwt.getSubject();
        Chat chat = chatRepository.findById(id).orElse(null);
        if (chat != null && chat.getUsers().stream().anyMatch(u -> u.getId().equals(userId))) {

            return chat;
        } else {
            return null;
        }
    }

    @GetMapping("/{chatId}/title")
    public ResponseEntity<Map<String, String>> getChatTitle(@AuthenticationPrincipal Jwt jwt, @PathVariable Long chatId) {
        String userId = jwt.getSubject();
        Chat chat = chatRepository.findById(chatId).orElse(null);
        if (chat != null && chat.getIsPrivate()) {
            Set<User> chatUsers = chat.getUsers();
            if (chatUsers.size() == 2) {
                User otherUser = chatUsers
                        .stream()
                        .filter(user -> !user.getId().equals(userId)).findFirst().orElse(null);
                if (otherUser != null) {
                    return ResponseEntity.ok(Map.of("title", otherUser.getUsername()));
                }
            }
        }
        else if(!chat.getIsPrivate()){
            return ResponseEntity.ok(Map.of("title", chat.getTitle()));
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{chatId}/lastMessage")
    public ResponseEntity<?> getLastMessage(@PathVariable Long chatId, @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        Chat chat = chatRepository.findById(chatId).orElse(null);
        if (chat == null || chat.getUsers().stream().noneMatch(u -> u.getId().equals(userId))) {
            return ResponseEntity.status(403).body("Access denied or chat not found");
        }

        return chat.getMessages().stream()
                .sorted((a, b) -> b.getSentDateTime().compareTo(a.getSentDateTime()))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @PostMapping
    public ResponseEntity createChat(@RequestBody Chat Chat) throws URISyntaxException {
        Chat savedChat = chatRepository.save(Chat);
        return ResponseEntity.created(new URI("/chats/" + savedChat.getId())).body(savedChat);
    }

    @PostMapping("/chats/private")
    public ResponseEntity<Chat> createPrivateChat(@RequestBody PrivateChatDTO request) {
        Optional<Chat> existingChat = chatRepository.findPrivateChatBetween(request.getUser1Id(), request.getUser2Id());
        Chat chat = existingChat.orElseGet(() -> {
            Chat newChat = new Chat();
            newChat.setIsPrivate(true);
            newChat.setUpdateTime(LocalDateTime.from(Instant.now()));
            newChat.setUsers(Set.of(
                    userRepository.findById(request.getUser1Id()).orElseThrow(),
                    userRepository.findById(request.getUser2Id()).orElseThrow()
            ));
            return chatRepository.save(newChat);
        });
        return ResponseEntity.ok(chat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteChat(@PathVariable Long id) {
        chatRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
