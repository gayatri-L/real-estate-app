package com.example.real_estate.api.repository; // Defines the package where this interface belongs.

import com.example.real_estate.api.model.Organisation; // Imports the Organisation entity, used in query methods.
import com.example.real_estate.api.model.Project; // Imports the Project entity, which this repository manages.
import org.springframework.data.jpa.repository.JpaRepository; // Imports JpaRepository, which provides CRUD operations.
import org.springframework.stereotype.Repository; // Imports the Repository annotation to indicate that this is a Spring Data repository.
import java.util.*; // Imports utility classes, including List, which is used in the method signature.

/**
 * Repository interface for managing Project entities.
 * It extends JpaRepository, which provides built-in CRUD operations.
 */
@Repository // Marks this interface as a Spring Data repository.
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    /**
     * Custom query method to find a list of Project entities associated with a given Organisation.
     *
     * @param organisation The Organisation entity for which Project entities should be retrieved.
     * @return A list of Project entities linked to the specified Organisation.
     */
    List<Project> findByOrganisation(Organisation organisation);
    
    /**
     * Custom query method to find the most recently added Project entity based on the project ID.
     *
     * @return The most recently added Project entity.
     */
    Project findTopByOrderByProjectIdDesc();
}