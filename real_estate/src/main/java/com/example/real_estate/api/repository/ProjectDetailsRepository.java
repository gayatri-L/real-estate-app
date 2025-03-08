package com.example.real_estate.api.repository;
// import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.model.Project;
import com.example.real_estate.api.model.ProjectDetails;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for managing Organisation entities.
 */
@Repository
public interface ProjectDetailsRepository extends JpaRepository<ProjectDetails, Long> {
    List<ProjectDetails> findByProject(Project project);
}


