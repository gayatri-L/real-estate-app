package com.example.real_estate.api.repository;

import com.example.real_estate.api.model.Organisation;
// import com.example.real_estate.api.model.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// import java.util.*;

/**
 * Repository for managing Organisation entities.
 */
@Repository
public interface OrganisationRepository extends JpaRepository<Organisation, Integer> {
    
}
