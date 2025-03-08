package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Represents the configuration details for Penthouse units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "penthouse_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PenthouseConfig {

    /**
     * Unique identifier for the Penthouse configuration.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "penthouse_config_id")
    private Integer penthouseConfigId;

    /**
     * The project to which this Penthouse configuration belongs.
     */
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    /**
     * Number of penthouse units available in this configuration.
     */
    @NotNull(message = "Units cannot be null")
    @Min(value = 1, message = "Units must be greater than 0")
    @Column(name = "type_ph_units", nullable = false)
    private Integer typePhUnits;

    /**
     * Total area of the penthouse unit (in square feet).
     */
    @NotNull(message = "Area cannot be null")
    @Min(value = 1, message = "Area must be greater than 0")
    @Column(name = "type_ph_area", nullable = false)
    private Integer typePhArea;

    /**
     * Floor plan details for the penthouse unit.
     */
    @Column(name = "type_ph_floor_plan", columnDefinition = "TEXT")
    private String typePhFloorPlan;

    /**
     * Image URLs for the penthouse unit.
     */
    @Column(name = "type_ph_images", columnDefinition = "TEXT")
    private String typePhImages;

    /**
     * Number of bathrooms in the penthouse unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null")
    @Min(value = 0, message = "Bathrooms must be 0 or more")
    @Column(name = "type_ph_bathrooms", nullable = false)
    private Integer typePhBathrooms;

    /**
     * Number of balconies in the penthouse unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Column(name = "type_ph_balcony", nullable = false)
    private Integer typePhBalcony;

    /**
     * Number of parking spaces available for the penthouse unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Column(name = "type_ph_parking", nullable = false)
    private Integer typePhParking;
}
