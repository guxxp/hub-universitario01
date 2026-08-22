package br.edu.hub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.hub.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findAllByOrderByDateDesc();
    List<Activity> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByDateDesc(
            String titleTerm, String descriptionTerm);
}
