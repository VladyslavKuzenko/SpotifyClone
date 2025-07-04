package edu.itstep.api.repositories;

import edu.itstep.api.models.Post;
import edu.itstep.api.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
