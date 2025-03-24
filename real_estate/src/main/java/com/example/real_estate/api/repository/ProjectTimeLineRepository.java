package com.example.real_estate.api.repository; // Defines the package where this interface belongs.

import java.util.*; // Imports utility classes, including List, which is used in the method signature.
import org.springframework.data.jpa.repository.JpaRepository; // Imports JpaRepository, which provides CRUD operations.
import org.springframework.stereotype.Repository; // Imports the Repository annotation to indicate that this is a Spring Data repository.

import com.example.real_estate.api.model.Project; // Imports the Project entity, used in the query method.
import com.example.real_estate.api.model.ProjectTimeLine; // Imports the ProjectTimeLine entity, which this repository manages.

/**
 * Repository interface for managing ProjectTimeLine entities.
 * It extends JpaRepository, which provides built-in CRUD operations.
 */
@Repository // Marks this interface as a Spring Data repository.
public interface ProjectTimeLineRepository extends JpaRepository<ProjectTimeLine, Integer> {
    
    /**
     * Custom query method to find a list of ProjectTimeLine entities associated with a given Project.
     *
     * @param project The Project entity for which ProjectTimeLine entities should be retrieved.
     * @return A list of ProjectTimeLine entities linked to the specified Project.
     */
    List<ProjectTimeLine> findByProject(Project project);
}
