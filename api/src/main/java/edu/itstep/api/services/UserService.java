package edu.itstep.api.services;

import edu.itstep.api.models.Post;
import edu.itstep.api.models.User;
import edu.itstep.api.repositories.PostRepository;
import edu.itstep.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

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

    public User addLike(Long post_id, String user_id) {
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(post_id)
                .orElseThrow(() -> new RuntimeException("Post not found"));


        user.getLikedPosts().add(post);

        post.getLikedBy().add(user);
        post.setLikesCount(post.getLikesCount() + 1);

        postRepository.save(post);
        return userRepository.save(user);
    }

    public User deleteLike(Long post_id, String user_id) {
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(post_id)
                .orElseThrow(() -> new RuntimeException("Post not found"));


        user.getLikedPosts().remove(post);

        post.getLikedBy().remove(user);
        post.setLikesCount(post.getLikesCount() - 1);

        postRepository.save(post);
        return userRepository.save(user);
    }

    public List<User> userToSubscribe(Integer count, String user_id) {
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Pageable pageable = PageRequest.of(0, count);

        Set<String> ids = user.getFollowings().stream()
                .map(User::getId)
                .collect(Collectors.toSet());
        if (ids.isEmpty())
            return userRepository.findAllByOrderByFollowersCountDesc(pageable);
        else
            return userRepository.findByIdNotInOrderByFollowersCountDesc(ids, pageable);

    }

}
