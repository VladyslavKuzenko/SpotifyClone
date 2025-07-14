package edu.itstep.api.repositories;

import edu.itstep.api.models.Post;
import edu.itstep.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserIn(Set<User> users);
}
