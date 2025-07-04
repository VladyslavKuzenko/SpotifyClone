package edu.itstep.api.services;

import edu.itstep.api.models.Story;
import edu.itstep.api.models.User;
import edu.itstep.api.repositories.StoryRepository;
import edu.itstep.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

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


}
