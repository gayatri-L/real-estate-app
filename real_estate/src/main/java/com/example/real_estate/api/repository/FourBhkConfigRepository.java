package com.example.real_estate.api.repository; // Defines the package where this interface belongs.

import org.springframework.data.jpa.repository.JpaRepository; // Imports JpaRepository, which provides CRUD operations.
import org.springframework.stereotype.Repository; // Imports the Repository annotation to indicate that this is a Spring Data repository.
import java.util.*; // Imports utility classes, including List, which is used in the method signature.
import com.example.real_estate.api.model.FourBHKConfig; // Imports the FourBHKConfig entity, which this repository manages.
import com.example.real_estate.api.model.Project; // Imports the Project entity, used in query methods.

/**
 * Repository interface for managing FourBHKConfig entities.
 * It extends JpaRepository, which provides built-in CRUD operations.
 */
@Repository // Marks this interface as a Spring Data repository.
public interface FourBhkConfigRepository extends JpaRepository<FourBHKConfig, Integer> {
    
    /**
     * Custom query method to find a list of FourBHKConfig entities associated with a given Project.
     *
     * @param project The Project entity for which FourBHKConfig entities should be retrieved.
     * @return A list of FourBHKConfig entities linked to the specified Project.
     */
    List<FourBHKConfig> findByProject(Project project);
}
