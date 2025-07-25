package edu.itstep.api.controlers;

import edu.itstep.api.models.Chat;
import edu.itstep.api.models.User;
import edu.itstep.api.models.dto.GroupChatDTO;
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
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


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

    @GetMapping("/{chatId}/picture")
    public ResponseEntity<Map<String, String>> getChatPicture(@AuthenticationPrincipal Jwt jwt, @PathVariable Long chatId) {
        String userId = jwt.getSubject();
        Chat chat = chatRepository.findById(chatId).orElse(null);
        if (chat != null && chat.getIsPrivate()) {
            Set<User> chatUsers = chat.getUsers();
            if (chatUsers.size() == 2) {
                User otherUser = chatUsers
                        .stream()
                        .filter(user -> !user.getId().equals(userId)).findFirst().orElse(null);
                if (otherUser != null) {
                    return ResponseEntity.ok(Map.of("picture", otherUser.getAvatarImgUrl()));
                }
            }
        }
        else if(!chat.getIsPrivate()){
            return ResponseEntity.ok(Map.of("picture", chat.getPictureUrl()));
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

    @PostMapping("/private")
    public ResponseEntity<Chat> createPrivateChat(@RequestBody PrivateChatDTO request) {
        User user1 = userRepository.findById(request.getUser1Id()).orElseThrow();
        User user2 = userRepository.findById(request.getUser2Id()).orElseThrow();

        Optional<Chat> existingChat = user1.getChats().stream()
                .filter(Chat::getIsPrivate)
                .filter(c -> c.getUsers().contains(user2) && c.getUsers().size() == 2)
                .findFirst();

        Chat chat = existingChat.orElseGet(() -> {
            Chat newChat = new Chat();
            newChat.setIsPrivate(true);
            newChat.setUpdateTime(LocalDateTime.now());
            newChat.setUsers(Set.of(user1, user2));

            user1.getChats().add(newChat);
            user2.getChats().add(newChat);

            return chatRepository.save(newChat);
        });

        return ResponseEntity.ok(chat);
    }

    @PostMapping("/group")
    public ResponseEntity<Chat> createGroupChat(@RequestBody GroupChatDTO dto) {
        Chat chat = new Chat();
        chat.setIsPrivate(false);
        chat.setTitle(dto.getTitle());
        chat.setUpdateTime(LocalDateTime.now());

        Set<User> users = dto.getUserIds().stream()
                .map(id -> userRepository.findById(id).orElseThrow())
                .collect(Collectors.toSet());
        chat.setUsers(users);

        Chat saved = chatRepository.save(chat);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteChat(@PathVariable Long id) {
        chatRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
