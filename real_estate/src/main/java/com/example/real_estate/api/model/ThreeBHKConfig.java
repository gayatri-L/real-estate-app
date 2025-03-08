package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Represents the configuration details for 3BHK units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "threebhk_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ThreeBHKConfig {

    /**
     * Unique identifier for the 3BHK configuration.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "threebhk_config_id")
    private Integer threeBhkConfigId;

    /**
     * The project to which this configuration belongs.
     */
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    /**
     * Number of units available for this 3BHK configuration.
     */
    @NotNull(message = "Units cannot be null")
    @Min(value = 1, message = "Units must be greater than 0")
    @Column(name = "type_3_units", nullable = false)
    private Integer type3Units;

    /**
     * Total area of the 3BHK unit (in square feet).
     */
    @NotNull(message = "Area cannot be null")
    @Min(value = 1, message = "Area must be greater than 0")
    @Column(name = "type_3_area", nullable = false)
    private Integer type3Area;

    /**
     * Floor plan details for the 3BHK unit.
     */
    @Column(name = "type_3_floor_plan", columnDefinition = "TEXT")
    private String type3FloorPlan;

    /**
     * Image URLs for the 3BHK unit.
     */
    @Column(name = "type_3_images", columnDefinition = "TEXT")
    private String type3Images;

    /**
     * Number of bathrooms in the 3BHK unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null")
    @Min(value = 0, message = "Bathrooms must be 0 or more")
    @Column(name = "type_3_bathrooms", nullable = false)
    private Integer type3Bathrooms;

    /**
     * Number of balconies in the 3BHK unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Column(name = "type_3_balcony", nullable = false)
    private Integer type3Balcony;

    /**
     * Number of parking spaces available for the 3BHK unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Column(name = "type_3_parking", nullable = false)
    private Integer type3Parking;
}
