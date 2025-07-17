package edu.itstep.api.repositories;

import edu.itstep.api.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}
