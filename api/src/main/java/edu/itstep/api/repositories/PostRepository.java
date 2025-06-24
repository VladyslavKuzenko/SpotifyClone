package edu.itstep.api.repositories;

import edu.itstep.api.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
