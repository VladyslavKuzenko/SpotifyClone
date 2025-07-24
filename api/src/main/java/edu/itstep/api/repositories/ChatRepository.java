package edu.itstep.api.repositories;

import edu.itstep.api.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("SELECT c FROM Chat c JOIN c.users u1 JOIN c.users u2 WHERE c.isPrivate = true AND u1.id = :user1 AND u2.id = :user2")
    Optional<Chat> findPrivateChatBetween(@Param("user1") String user1, @Param("user2") String user2);
}
