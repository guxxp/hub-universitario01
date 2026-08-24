package br.edu.hub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.hub.entity.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByActivityIdOrderByCreatedAtAsc(Long activityId);
    Optional<Registration> findByIdAndActivityId(Long id, Long activityId);
}
