package edu.itstep.api.services;

import edu.itstep.api.models.User;
import edu.itstep.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Оновлюємо лише потрібні поля
        user.setUsername(updatedUser.getUsername());

        return userRepository.save(user); // це оновлення
    }
}
