package edu.itstep.api.repositories;

import edu.itstep.api.models.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
