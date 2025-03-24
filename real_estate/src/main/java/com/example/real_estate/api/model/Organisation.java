package com.example.real_estate.api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*; // ✅ Import Lombok annotations
import java.util.List;
/**
 * Represents an organisation entity in the real estate system.
 * This entity stores details about a real estate organisation,
 * including its name, CIN, owners, and completed projects.
 */
@Entity // Marks this class as a JPA entity.
@Table(name = "organisation") // Specifies the table name in the database.
@Getter  // ✅ Auto-generates Getters
@Setter  // ✅ Auto-generates Setters
@NoArgsConstructor  // ✅ Auto-generates No-Argument Constructor (Required by JPA)
@AllArgsConstructor // ✅ Auto-generates Parameterized Constructor

public class Organisation {
     /**
     * Unique identifier for the organisation.
     * This field is auto-generated and serves as the primary key.
     */
    @Id // Specifies this field as the primary key.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments the ID value.
    @Column(name = "org_id", nullable = false) // Maps to the "org_id" column in the database.
    private int orgId;

    /**
     * Name of the organisation.
     * It is required and has a maximum length of 100 characters.
     */
    @NotNull(message = "Organisation name is required") // Ensures the name is not null.
    @Size(max = 100, message = "Organisation name should be at most 100 characters") // Restricts length.
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "Organisation name includes invalid characters.") // Allows only letters and spaces.
    @Column(name = "org_name") // Maps to the "org_name" column in the database.
    private String orgName;

    /**
     * Corporate Identification Number (CIN) - must be unique.
     * The CIN should not exceed 21 characters and must contain only letters and numbers.
     */
    @Column(name = "org_cin", unique = true) // Maps to "org_cin" and enforces uniqueness.
    @Size(max = 21, message = "CIN must not exceed 21 characters") // Limits the CIN length.
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "CIN must contain only letters and numbers") // Enforces format.
    private String orgCin;
    
    /**
     * Name of the owner(s) of the organisation.
     * This field is required and must only contain letters and spaces.
     */
    @NotNull(message = "Owner name is required") // Ensures the field is not null.
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "Owner name includes invalid characters.") // Restricts format.
    @Column(name = "org_owners", nullable = false) // Maps to "org_owners" column and makes it non-nullable.
    private String orgOwners;

    /**
     * Number of projects completed by the organisation.
     * This field must be a non-negative integer and cannot exceed 999.
     */
    @Column(name = "projectscompleted", nullable = false) // Maps to "projectscompleted" column.
    @Min(value = 0, message = "Projects completed cannot be negative") // Prevents negative values.
    @Max(value = 999, message = "Projects completed is too high") // Sets an upper limit.
    @NotNull(message = "Projects completed is required") // Ensures the field is not null.
    private Integer projectsCompleted;

     /**
     * One organisation can have multiple projects.
     * The relationship is defined as a one-to-many mapping.
     * CascadeType.ALL ensures related projects are deleted when an organisation is deleted.
     * FetchType.LAZY means related projects will only be loaded when accessed.
     */
    @OneToMany(mappedBy = "organisation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents serialization of the projects list to avoid infinite recursion.
    private List<Project> projects;

    /**
     * Parameterized constructor for creating an Organisation object.
     *
     * @param organisationCin Corporate Identification Number.
     * @param organisationName Name of the organisation.
     * @param organisationOwners Name of the owners.
     * @param projectCompleted Number of completed projects.
     */
    public Organisation(String organisationCin, String organisationName, String organisationOwners, Integer projectCompleted) {
        this.orgCin = organisationCin; // Assigns the provided CIN value.
        this.orgName = organisationName; // Assigns the provided organisation name.
        this.orgOwners = organisationOwners; // Assigns the provided owner names.
        this.projectsCompleted = projectCompleted; // Assigns the number of completed projects.
    }
    
}
