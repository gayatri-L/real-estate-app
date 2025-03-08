package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Represents the configuration details for 4BHK units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "fourbhk_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FourBHKConfig {

    /**
     * Unique identifier for the 4BHK configuration.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fourbhk_config_id")
    private Integer fourBhkConfigId;

    /**
     * The project to which this configuration belongs.
     */
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    /**
     * Number of units available for this 4BHK configuration.
     */
    @NotNull(message = "Units cannot be null")
    @Min(value = 1, message = "Units must be greater than 0")
    @Column(name = "type_4_units", nullable = false)
    private Integer type4Units;

    /**
     * Total area of the 4BHK unit (in square feet).
     */
    @NotNull(message = "Area cannot be null")
    @Min(value = 1, message = "Area must be greater than 0")
    @Column(name = "type_4_area", nullable = false)
    private Integer type4Area;

    /**
     * Floor plan details for the 4BHK unit.
     */
    @Column(name = "type_4_floor_plan", columnDefinition = "TEXT")
    private String type4FloorPlan;

    /**
     * Image URLs for the 4BHK unit.
     */
    @Column(name = "type_4_images", columnDefinition = "TEXT")
    private String type4Images;

    /**
     * Number of bathrooms in the 4BHK unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null")
    @Min(value = 0, message = "Bathrooms must be 0 or more")
    @Column(name = "type_4_bathrooms", nullable = false)
    private Integer type4Bathrooms;

    /**
     * Number of balconies in the 4BHK unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Column(name = "type_4_balcony", nullable = false)
    private Integer type4Balcony;

    /**
     * Number of parking spaces available for the 4BHK unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Column(name = "type_4_parking", nullable = false)
    private Integer type4Parking;
}
