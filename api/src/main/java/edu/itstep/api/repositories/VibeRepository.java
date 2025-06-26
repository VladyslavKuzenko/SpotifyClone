package edu.itstep.api.repositories;

import edu.itstep.api.models.Vibe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VibeRepository extends JpaRepository<Vibe, Long> {
}
