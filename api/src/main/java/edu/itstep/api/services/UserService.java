package edu.itstep.api.services;

import edu.itstep.api.models.User;
import edu.itstep.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User updateUser(String id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Оновлюємо лише потрібні поля
        user.setUsername(updatedUser.getUsername());
        return userRepository.save(user); // це оновлення
    }

    public void addFollowing(String follower_id, String followed_id) {//follower- це я, бо на когось підписуюсь. followed - тей на кого підписуюсь
        User follower = userRepository.findById(follower_id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User followed = userRepository.findById(followed_id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        follower.getFollowings().add(followed);
        follower.setFollowingsCount(follower.getFollowingsCount() + 1);

        followed.getFollowers().add(follower);
        followed.setFollowersCount(followed.getFollowersCount() + 1);

        userRepository.save(followed);
        userRepository.save(follower);
    }
    public void deleteFollowing(String follower_id, String followed_id) {//follower- це я, бо на когось підписуюсь. followed - тей на кого підписуюсь
        User follower = userRepository.findById(follower_id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User followed = userRepository.findById(followed_id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        follower.getFollowings().remove(followed);
        follower.setFollowingsCount(follower.getFollowingsCount() - 1);

        followed.getFollowers().remove(follower);
        followed.setFollowersCount(followed.getFollowersCount() - 1);

        userRepository.save(followed);
        userRepository.save(follower);
    }
}
