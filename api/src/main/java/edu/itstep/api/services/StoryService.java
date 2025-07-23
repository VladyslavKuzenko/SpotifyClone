package edu.itstep.api.services;

import edu.itstep.api.models.Story;
import edu.itstep.api.models.User;
import edu.itstep.api.repositories.StoryRepository;
import edu.itstep.api.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private UserRepository userRepository;

    public Story updateStory(Long id, Story updatedStory) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found"));

        // Оновлюємо лише потрібні поля
        //story.setMediaType(updatedStory.getMediaType());
        story.setMediaUrl(updatedStory.getMediaUrl());

        System.out.println(story.getMediaUrl());
        System.out.println(updatedStory.getMediaUrl());
        System.out.println(id);
        return storyRepository.save(story); // це оновлення
    }

    public Story save(Story story) {
        System.out.println(story.getMediaType());
        return storyRepository.save(story);
    }

    public List<Story> getStoriesOfFollowings(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Set<User> followings = user.getFollowings();
        followings.add(user);
        return storyRepository.findStoriesByFollowings(followings);
    }

    public void deleteById(Long storyId) {
        Optional<Story> storyOptional = storyRepository.findById(storyId);

        if (storyOptional.isPresent()) {
            Story story = storyOptional.get();

            for (User user : story.getLikedBy()) {
                user.getLikedStory().remove(story);
            }

            story.getLikedBy().clear();

            storyRepository.delete(story);
        } else {
            throw new EntityNotFoundException("Story not found with id: " + storyId);
        }
    }
}