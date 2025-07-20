package edu.itstep.api.repositories;

import edu.itstep.api.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findAllByOrderByFollowersCountDesc(Pageable pageable);
    Boolean existsByUsername(String username);
    List<User> findByIdNotInOrderByFollowersCountDesc(Set<String> ids, Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.avatarImgUrl = :url WHERE u.id = :userId")
    void updateAvatarImgUrlById(String userId, String url);
}
