package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = "project_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProjectDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detail_id")
    private Integer detailId;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @NotNull(message = "Units cannot be null")
    @Min(value = 0, message = "Units must be at least 1")
    @Column(name = "units", nullable = false)
    private Integer units;

    @NotNull(message = "Project status is required")
    @Pattern(message="Project status should contain only letters, spaces, dashes, or numbers", regexp = "^[A-Za-z\s-]+$")
    @Column(name = "projectstatus", nullable = false, columnDefinition = "TEXT")
    private String projectStatus;

    @NotNull(message = "Project launch date is required")
    @Column(name = "projectlaunch", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date projectLaunch;

    @NotNull(message = "Planned end date is required")
    @Column(name = "projectplannedend", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date projectPlannedEnd;

    @NotNull(message = "Minimum price is required")
    @Min(value = 0, message = "Minimum price must be greater than or equal to 0")
    @Column(name = "pricemin", nullable = false)
    private Integer priceMin;

    @NotNull(message = "Maximum price is required")
    @Min(value = 0, message = "Maximum price must be greater than or equal to 0")
    @Column(name = "pricemax", nullable = false)
    private Integer priceMax;

    @Column(name = "allinclusive")
    private Boolean allInclusive;

    @Column(name = "bankapproved", nullable = false)
    private Boolean bankApproved;

    @Column(name = "amenities", columnDefinition = "TEXT")
    // @Pattern(message="Amenities should contain only letters, numbers, commas, and spaces", regexp = "^[A-Za-z\\\\s]+(,[A-Za-z\\\\s]+)*$")
    private String amenities;

    @Column(name = "coveredparking", nullable = false, columnDefinition = "TEXT")
    @Pattern(message="Covered parking details should contain only letters and spaces", regexp = "^[A-Za-z\\s]+$")
    private String coveredParking;

    @Column(name = "banks", columnDefinition = "TEXT")
    // @Pattern(message="Banks should contain only letters, numbers, commas, and spaces", regexp = "^[A-Za-z\\\\s]+(,[A-Za-z\\\\s]+)*$")
    private String banks;

    @PrePersist
    @PreUpdate
    private void validatePriceRange() {
        if (priceMin != null && priceMax != null && priceMin >= priceMax) {
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
