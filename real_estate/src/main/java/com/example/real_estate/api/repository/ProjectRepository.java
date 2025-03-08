package com.example.real_estate.api.repository;

import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.model.Project;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for managing Projects entities.
*/
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOrganisation(Organisation organisation);
}
