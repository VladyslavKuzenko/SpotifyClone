package edu.itstep.api.repositories;

import edu.itstep.api.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findAllByOrderByFollowersCountDesc(Pageable pageable);

}
