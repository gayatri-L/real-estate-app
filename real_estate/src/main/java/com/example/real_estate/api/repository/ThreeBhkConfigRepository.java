package com.example.real_estate.api.repository; // Defines the package where this interface belongs.

import org.springframework.data.jpa.repository.JpaRepository; // Imports JpaRepository, which provides CRUD operations.
import org.springframework.stereotype.Repository; // Imports the Repository annotation to indicate that this is a Spring Data repository.

import com.example.real_estate.api.model.Project; // Imports the Project entity, used in the query method.
import com.example.real_estate.api.model.ThreeBHKConfig; // Imports the ThreeBHKConfig entity, which this repository manages.
import java.util.*; // Imports utility classes, including List, which is used in the method signature.

/**
 * Repository interface for managing ThreeBHKConfig entities.
 * It extends JpaRepository, which provides built-in CRUD operations.
 */
@Repository // Marks this interface as a Spring Data repository.
public interface ThreeBhkConfigRepository extends JpaRepository<ThreeBHKConfig, Integer> {
    
    /**
     * Custom query method to find a list of ThreeBHKConfig entities associated with a given Project.
     *
     * @param project The Project entity for which ThreeBHKConfig entities should be retrieved.
     * @return A list of ThreeBHKConfig entities linked to the specified Project.
     */
    List<ThreeBHKConfig> findByProject(Project project);
}
