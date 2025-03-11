// package com.example.real_estate.api.model;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.*;
// import lombok.*;

// /**
//  * Represents the configuration details for 5BHK units in a real estate project.
//  * This entity is linked to the {@link Project} entity.
//  */
// @Entity
// @Table(name = "fivebhk_config")
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// @ToString
// public class FiveBHKConfig {

//     /**
//      * Unique identifier for the 5BHK configuration.
//      */
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "fivebhk_config_id")
//     private Integer fiveBhkConfigId;

//     /**
//      * The project to which this configuration belongs.
//      */
//     @ManyToOne
//     @JoinColumn(name = "project_id", nullable = false)
//     private Project project;

//     /**
//      * Number of units available for this 5BHK configuration.
//      */
//     @NotNull(message = "Units cannot be null")
//     @Min(value = 1, message = "Units must be greater than 0")
//     @Column(name = "type_5_units", nullable = false)
//     private Integer type5Units;

//     /**
//      * Total area of the 5BHK unit (in square feet).
//      */
//     @NotNull(message = "Area cannot be null")
//     @Min(value = 1, message = "Area must be greater than 0")
//     @Column(name = "type_5_area", nullable = false)
//     private Integer type5Area;

//     /**
//      * Floor plan details for the 5BHK unit.
//      */
//     @Column(name = "type_5_floor_plan", columnDefinition = "TEXT")
//     private String type5FloorPlan;

//     /**
//      * Image URLs for the 5BHK unit.
//      */
//     @Column(name = "type_5_images", columnDefinition = "TEXT")
//     private String type5Images;

//     /**
//      * Number of bathrooms in the 5BHK unit.
//      */
//     @NotNull(message = "Number of bathrooms cannot be null")
//     @Min(value = 0, message = "Bathrooms must be 0 or more")
//     @Column(name = "type_5_bathrooms", nullable = false)
//     private Integer type5Bathrooms;

//     /**
//      * Number of balconies in the 5BHK unit.
//      */
//     @NotNull(message = "Number of balconies cannot be null")
//     @Min(value = 0, message = "Balconies must be 0 or more")
//     @Column(name = "type_5_balcony", nullable = false)
//     private Integer type5Balcony;

//     /**
//      * Number of parking spaces available for the 5BHK unit.
//      */
//     @NotNull(message = "Number of parking spaces cannot be null")
//     @Min(value = 0, message = "Parking spaces must be 0 or more")
//     @Column(name = "type_5_parking", nullable = false)
//     private Integer type5Parking;
// }
package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Represents the configuration details for 5BHK units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "fivebhk_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FiveBHKConfig {

    /**
     * Unique identifier for the 5BHK configuration.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fivebhk_config_id")
    private Integer fiveBhkConfigId; // Changed from Integer to Long

    /**
     * The project to which this configuration belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // Optimized FetchType
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    /**
     * Number of units available for this 5BHK configuration.
     */
    @NotNull(message = "Units cannot be null")
    @Min(value = 1, message = "Units must be greater than 0")
    @Column(name = "type_5_units", nullable = false)
    private Integer type5Units;

    /**
     * Total area of the 5BHK unit (in square feet).
     */
    @NotNull(message = "Area cannot be null")
    @Min(value = 1, message = "Area must be greater than 0")
    @Column(name = "type_5_area", nullable = false)
    private Integer type5Area;

    /**
     * Floor plan details for the 5BHK unit.
     */
    @Lob // Changed from columnDefinition = "TEXT"
    @Column(name = "type_5_floor_plan")
    private String type5FloorPlan;

    /**
     * Image URLs for the 5BHK unit.
     */
    @Lob // Changed from columnDefinition = "TEXT"
    @Column(name = "type_5_images")
    private String type5Images;

    /**
     * Number of bathrooms in the 5BHK unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null")
    @Min(value = 1, message = "Bathrooms must be at least 1")
    @Max(value = 8, message = "Bathrooms cannot exceed 8") // Logical limit
    @Column(name = "type_5_bathrooms", nullable = false)
    private Integer type5Bathrooms;

    /**
     * Number of balconies in the 5BHK unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Max(value = 10, message = "Balconies cannot exceed 10") // Logical limit
    @Column(name = "type_5_balcony", nullable = false)
    private Integer type5Balcony;

    /**
     * Number of parking spaces available for the 5BHK unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Max(value = 5, message = "Parking spaces cannot exceed 5") // Logical limit
    @Column(name = "type_5_parking", nullable = false)
    private Integer type5Parking;
}
