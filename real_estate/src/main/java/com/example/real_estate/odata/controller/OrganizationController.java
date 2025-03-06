
package com.example.real_estate.odata.controller;

import com.example.real_estate.odata.model.Organization;
import com.example.real_estate.odata.service.OrganizationService;
// import com.example.real_estate.odata.repository.OrganizationRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
/**
 * Controller class for managing Organization-related API endpoints.
 * Provides CRUD operations for the Organization entity.
 */
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RestController
@RequestMapping("/organization")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;
 /**
     * Retrieves all organizations from the database.
     *
     * @return List of all organizations.
     */
    @GetMapping
    public List<Organization> getAllOrganizations() {
        return organizationService.getAllOrganizations();
    }

    /**
     * Retrieves a specific Organization by its ID.
     *
     * @param id The ID of the organization to retrieve.
     * @return ResponseEntity containing the organization details if found,
     *         or an error message with HTTP status 404 if not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrganizationById(@PathVariable Integer id) {
        Optional<Organization> organization = organizationService.getOrganizationById(id);
        if (organization.isPresent()) {
            return ResponseEntity.ok(organization.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Organization not found"));
        }
    }
     /**
     * Creates a new Organization entry in the database.
     * Performs validation on the request body before saving.
     *
     * @param organization The organization details to be saved.
     * @param bindingResult Contains validation errors if any.
     * @return ResponseEntity containing the saved organization object
     *         or validation error messages if validation fails.
     */
    @PostMapping
    public ResponseEntity<?> createOrganization(@Valid @RequestBody Organization organization, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {  // ✅ Make sure to check for errors
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errors);  // ✅ Returns validation errors in Postman
        }
    
        Organization savedOrganization = organizationService.createOrganization(organization);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrganization);
    }
    

 /**
     * Deletes an existing Organization by its ID.
     *
     * @param id The ID of the organization to delete.
     * @return ResponseEntity with a success message if deleted,
     *         or an error message with HTTP status 404 if the organization is not found.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrganization(@PathVariable Integer id) {
        Optional<Organization> organization = organizationService.getOrganizationById(id);
        if (organization.isPresent()) {
            organizationService.deleteOrganization(id);
            return ResponseEntity.ok("Organization deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Organization not found.");
        }
    }
}
// =============================
// OData Controller for Organization
// =============================
// package com.example.real_estate.odata.controller;

// import com.example.real_estate.odata.model.Organization;
// import com.example.real_estate.odata.service.OrganizationService;
// import jakarta.validation.Valid;
// import org.apache.olingo.odata2.api.annotation.edm.*;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.validation.BindingResult;
// import org.springframework.validation.FieldError;
// import org.springframework.web.bind.annotation.*;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// @CrossOrigin(origins = "http://localhost:3000")
// @RestController
// @RequestMapping("/odata/organization")
// public class OrganizationController {

//     @Autowired
//     private OrganizationService organizationService;

//     @EdmFunctionImport(name = "GetAllOrganizations", returnType = "Collection(Organization)")
//     @GetMapping
//     public List<Organization> getAllOrganizations() {
//         return organizationService.getAllOrganizations();
//     }

//     @EdmFunctionImport(name = "GetOrganizationById", returnType = "Organization")
//     @GetMapping("/{id}")
//     public ResponseEntity<?> getOrganizationById(@PathVariable Integer id) {
//         Optional<Organization> organization = organizationService.getOrganizationById(id);
//         if (organization.isPresent()) {
//             return ResponseEntity.ok(organization.get());
//         } else {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                     .body(Map.of("error", "Organization not found"));
//         }
//     }

//     @EdmActionImport(name = "CreateOrganization")
//     @PostMapping
//     public ResponseEntity<?> createOrganization(@Valid @RequestBody Organization organization, BindingResult bindingResult) {
//         if (bindingResult.hasErrors()) {
//             Map<String, String> errors = new HashMap<>();
//             for (FieldError error : bindingResult.getFieldErrors()) {
//                 errors.put(error.getField(), error.getDefaultMessage());
//             }
//             return ResponseEntity.badRequest().body(errors);
//         }
//         Organization savedOrganization = organizationService.createOrganization(organization);
//         return ResponseEntity.status(HttpStatus.CREATED).body(savedOrganization);
//     }

//     @EdmActionImport(name = "DeleteOrganization")
//     @DeleteMapping("/{id}")
//     public ResponseEntity<String> deleteOrganization(@PathVariable Integer id) {
//         Optional<Organization> organization = organizationService.getOrganizationById(id);
//         if (organization.isPresent()) {
//             organizationService.deleteOrganization(id);
//             return ResponseEntity.ok("Organization deleted successfully.");
//         } else {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Organization not found.");
//         }
//     }
// }
