package com.example.real_estate.odata.repository;

import com.example.real_estate.odata.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing Organization entity interactions with the database.
 * Extends JpaRepository to provide built-in CRUD operations.
 * 
 * JpaRepository<EntityType, PrimaryKeyType>
 * - Provides methods like save(), findById(), findAll(), deleteById(), etc.
 */

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Integer> {

}
