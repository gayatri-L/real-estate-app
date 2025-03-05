package com.example.real_estate.odata.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

/**
 * Represents an Organization entity mapped to the "organisation" table in the database.
 * This entity is used to store and manage organization-related details.
 */
@Getter
@Setter
@Entity
@Table(name = "organisation") 
public class Organization {
    /**
     * Unique identifier for the organization.
     * Auto-generated primary key using IDENTITY strategy.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "org_id")
    private Integer orgId;

    @NotNull(message = "Organization name cannot be null.")
    @NotBlank(message = "Organization name cannot be blank")
    @Size(max = 100, message = "Organization name must not exceed 100 characters.")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Organization name contains unsupported characters.")
    @Column(name = "org_name", nullable = false, length = 100)
    private String orgName;

    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "CIN must contain only letters and numbers.")
    @Size(max = 21, message = "CIN must not exceed 21 characters.")
    @Column(name = "org_cin", length = 21)
    private String orgCin;
    

    @Pattern(regexp = "^[a-zA-Z ]*$", message = "Owner Name must contain letters only. Numbers and special characters are not allowed.")
    @Column(name = "org_owners", columnDefinition = "TEXT")
    private String orgOwners;

    @Min(value = 0, message = "Projects completed cannot be negative")
    @Max(value = 999,message="Projects Completed is too high")
    @Column(name = "projectscompleted")
    private Integer projectsCompleted;

    /**
     * One-to-Many relationship with the Project entity.
     * - An organization can have multiple projects.
     * - CascadeType.ALL ensures that all related projects are saved and deleted with the organization.
     * - OrphanRemoval = true ensures that child projects are removed when the organization is deleted.
     * - FetchType.LAZY ensures projects are loaded only when accessed.
     */

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Project> projects;
}
