package com.example.real_estate.api.repository; // Defines the package where this interface belongs.

import com.example.real_estate.api.model.Organisation; // Imports the Organisation entity, which this repository manages.
// import com.example.real_estate.api.model.Project; // (Commented out) Would be used if Project was needed.

import org.springframework.data.jpa.repository.JpaRepository; // Imports JpaRepository, which provides CRUD operations.
import org.springframework.data.jpa.repository.Query; // Imports Query annotation for custom JPQL queries.
import org.springframework.stereotype.Repository; // Imports the Repository annotation to indicate that this is a Spring Data repository.
import java.util.*; // Imports utility classes, including List, which is used in the method signature.

/**
 * Repository interface for managing Organisation entities.
 * It extends JpaRepository, which provides built-in CRUD operations.
 */
@Repository // Marks this interface as a Spring Data repository.
public interface OrganisationRepository extends JpaRepository<Organisation, Integer> {
    
    /**
     * Custom JPQL query to fetch all Organisation entities from the database.
     *
     * @return A list of all Organisation entities.
     */
    @Query("SELECT o FROM Organisation o")
    List<Organisation> findAllOrganisations();
}