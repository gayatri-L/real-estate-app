package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.Date;

/**
 * Represents the details of a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "project_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProjectDetails {

    /**
     * Unique identifier for project details.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detail_id")
    private Integer detailId;

    /**
     * The project to which these details belong.
     */
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    /**
     * Number of units available in the project.
     */
    @NotNull(message = "Units cannot be null")
    @Min(value = 1, message = "Units must be at least 1")
    @Column(name = "units", nullable = false)
    private Integer units;

    /**
     * Status of the project (e.g., "Under Construction", "Completed").
     */
    @NotBlank(message = "Project status is required")
    @Column(name = "projectstatus", nullable = false, columnDefinition = "TEXT")
    private String projectStatus;

    /**
     * Date when the project was launched.
     */
    @NotNull(message = "Project launch date is required")
    @Column(name = "projectlaunch", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date projectLaunch;

    /**
     * Expected planned completion date of the project.
     */
    @NotNull(message = "Planned end date is required")
    @Column(name = "projectplannedend", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date projectPlannedEnd;

    /**
     * Minimum price of properties in the project.
     */
    @NotNull(message = "Minimum price is required")
    @Min(value = 0, message = "Minimum price must be greater than or equal to 0")
    @Column(name = "pricemin", nullable = false)
    private Integer priceMin;

    /**
     * Maximum price of properties in the project.
     */
    @NotNull(message = "Maximum price is required")
    @Min(value = 0, message = "Maximum price must be greater than or equal to 0")
    @Column(name = "pricemax", nullable = false)
    private Integer priceMax;

    /**
     * Whether the price includes all costs (e.g., registration, tax, etc.).
     */
    @NotNull(message = "All-inclusive flag is required")
    @Column(name = "allinclusive", nullable = false)
    private Boolean allInclusive;

    /**
     * List of amenities available in the project.
     */
    @Column(name = "amenities", columnDefinition = "TEXT")
    private String amenities;

    /**
     * Information about covered parking availability.
     */
    @NotBlank(message = "Covered parking details are required")
    @Column(name = "coveredparking", nullable = false, columnDefinition = "TEXT")
    private String coveredParking;

    /**
     * Indicates whether bank-approved loans are available for the project.
     */
    @NotNull(message = "Bank-approved flag is required")
    @Column(name = "bankapproved", nullable = false)
    private Boolean bankApproved;

    /**
     * List of banks offering home loans for the project.
     */
    @Column(name = "banks", columnDefinition = "TEXT")
    private String banks;

    /**
     * Ensures that priceMin is always less than priceMax.
     */
    @PrePersist
    @PreUpdate
    private void validatePriceRange() {
        if (priceMin >= priceMax) {
            throw new IllegalArgumentException("Minimum price must be less than maximum price.");
        }
    }

    public ProjectDetails(Project project, Integer units, String projectStatus, Date projectLaunch, 
                      Date projectPlannedEnd, Integer priceMin, Integer priceMax, Boolean allInclusive, 
                      String amenities, String coveredParking, Boolean bankApproved, String banks) {
    this.project = project;
    this.units = units;
    this.projectStatus = projectStatus;
    this.projectLaunch = projectLaunch;
    this.projectPlannedEnd = projectPlannedEnd;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
    this.allInclusive = allInclusive;
    this.amenities = amenities;
    this.coveredParking = coveredParking;
    this.bankApproved = bankApproved;
    this.banks = banks;
}

}
