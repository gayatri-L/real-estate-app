
package com.example.real_estate.odata.service;

import com.example.real_estate.odata.model.Organization;
import com.example.real_estate.odata.repository.OrganizationRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for handling business logic related to Organization entities.
 * This class provides methods to perform CRUD operations using the OrganizationRepository.
 */
@Service
@Validated  // ✅ Enforce validation at the service level
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

     /**
     * Constructor-based dependency injection for OrganizationRepository.
     *
     * @param organizationRepository Repository instance for accessing Organization data
     */
    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    /**
     * Retrieves all organizations from the database.
     *
     * @return List of all Organization entities
     */
    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }


    /**
     * Retrieves an organization by its ID.
     *
     * @param id The ID of the organization to be fetched
     * @return Optional containing the Organization if found, otherwise empty
     */
    public Optional<Organization> getOrganizationById(Integer id) {
        return organizationRepository.findById(id);
    }

    /**
     * Creates a new organization and saves it to the database.
     * 
     * @param organization The Organization entity to be saved
     * @return The saved Organization entity
     */
    public Organization createOrganization(@Valid Organization organization) { // ✅ Ensure validation happens here
        return organizationRepository.save(organization);
    }

    /**
     * Deletes an organization by its ID.
     *
     * @param id The ID of the organization to be deleted
     */
    public void deleteOrganization(Integer id) {
        organizationRepository.deleteById(id);
    }
}
