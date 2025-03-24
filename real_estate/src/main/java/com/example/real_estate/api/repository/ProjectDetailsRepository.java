package com.example.real_estate.api.repository; // Defines the package where this interface belongs.

// import com.example.real_estate.api.model.Organisation; // (Commented out) Would be used if Organisation was needed.
import com.example.real_estate.api.model.Project; // Imports the Project entity, used in query methods.
import com.example.real_estate.api.model.ProjectDetails; // Imports the ProjectDetails entity, which this repository manages.
import java.util.*; // Imports utility classes, including List, which is used in the method signature.
import org.springframework.data.jpa.repository.JpaRepository; // Imports JpaRepository, which provides CRUD operations.
import org.springframework.stereotype.Repository; // Imports the Repository annotation to indicate that this is a Spring Data repository.

/**
 * Repository interface for managing ProjectDetails entities.
 * It extends JpaRepository, which provides built-in CRUD operations.
 */
@Repository // Marks this interface as a Spring Data repository.
public interface ProjectDetailsRepository extends JpaRepository<ProjectDetails, Long> {
    
    /**
     * Custom query method to find a list of ProjectDetails entities associated with a given Project.
     *
     * @param project The Project entity for which ProjectDetails entities should be retrieved.
     * @return A list of ProjectDetails entities linked to the specified Project.
     */
    List<ProjectDetails> findByProject(Project project);
}
