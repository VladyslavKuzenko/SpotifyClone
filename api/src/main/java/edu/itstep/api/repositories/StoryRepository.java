package edu.itstep.api.repositories;

import edu.itstep.api.models.Post;
import edu.itstep.api.models.Story;
import edu.itstep.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface StoryRepository extends JpaRepository<Story, Long> {

    @Query("SELECT s FROM Story s WHERE s.user IN :followings")
    List<Story> findStoriesByFollowings(@Param("followings") Set<User> followings);
}
