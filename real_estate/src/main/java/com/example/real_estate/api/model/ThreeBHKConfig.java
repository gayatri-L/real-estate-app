package com.example.real_estate.api.model; // Defines the package for this entity class

import jakarta.persistence.*; // Imports JPA annotations for entity mapping
import jakarta.validation.constraints.*; // Imports validation constraints
import lombok.*; // Imports Lombok annotations for reducing boilerplate code
import org.hibernate.annotations.JdbcTypeCode; // Import for handling custom SQL types
import org.hibernate.type.SqlTypes; // Import for defining SQL data types
import java.util.*; // Imports utility classes like List
/**
 * Represents the configuration details for 3BHK units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity // Marks this class as a JPA entity
@Table(name = "threebhk_config", uniqueConstraints = @UniqueConstraint(columnNames = {"project_id", "type_number"})) // Defines table name and unique constraints
@Getter // Lombok annotation to generate getter methods
@Setter // Lombok annotation to generate setter methods
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor // Lombok annotation to generate a constructor with all arguments
@ToString // Lombok annotation to generate a toString method

public class ThreeBHKConfig {

    /**
     * Unique identifier for the 3BHK configuration.
     */
    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates the ID value
    @Column(name = "threebhk_config_id") // Maps this field to the database column
    private Integer threeBhkConfigId; 

    /**
     * The project to which this configuration belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // Defines a many-to-one relationship with lazy loading
    @JoinColumn(name = "project_id", nullable = false) // Defines foreign key column in the database
    private Project project;


     /**
     * Type number to differentiate multiple configurations within a project.
     */
    // @NotNull(message = "Type number cannot be null")
    @Min(value = 1, message = "Type number must be greater than 0") // Ensures type number is at least 1
    @Column(name = "type_number") // Maps this field to the database column
    private Integer typeNumber;

    /**
     * Number of units available for this 3BHK configuration.
     */
    /**
     * Number of units available for this 3BHK configuration.
     */
    @NotNull(message = "Units cannot be null") // Ensures this field cannot be null
    @Min(value = 1, message = "Units must be greater than 0") // Ensures minimum value of 1
    @Column(name = "type_3_units", nullable = false) // Maps this field to the database column
    private Integer type3Units;

    /**
     * Total area of the 3BHK unit (in square feet).
     */
    @NotNull(message = "Area cannot be null") // Ensures this field cannot be null
    @Min(value = 1, message = "Area must be greater than 0") // Ensures area is at least 1 sq ft
    @Column(name = "type_3_area", nullable = false) // Maps this field to the database column
    private Integer type3Area;

    /**
     * Floor plan details for the 3BHK unit.
     */
     // Changed from columnDefinition = "TEXT"
     @JdbcTypeCode(SqlTypes.JSON) // Specifies this field should be stored as JSON
     @Column(name = "type_3_floor_plan", columnDefinition = "JSONB") // Maps to JSONB column in the database
     private List<String> type3FloorPlan;

    /**
     * Image URLs for the 3BHK unit.
     */
    // Changed from columnDefinition = "TEXT"
    @JdbcTypeCode(SqlTypes.JSON) // Specifies this field should be stored as JSON
    @Column(name = "type_3_images", columnDefinition = "JSONB") // Maps to JSONB column in the database
    private List<String> type3Images;

    /**
     * Number of bathrooms in the 3BHK unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null") // Ensures this field is not null
    @Min(value = 0, message = "Bathrooms must be 0 or more") // Ensures at least 0 bathrooms
    @Max(value = 5, message = "Bathrooms cannot exceed 5") // Logical constraint for max value
    @Column(name = "type_3_bathrooms", nullable = false) // Maps this field to the database column
    private Integer type3Bathrooms;

    /**
     * Number of balconies in the 3BHK unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Max(value = 5, message = "Balconies cannot exceed 5") // Logical limit
    @Column(name = "type_3_balcony", nullable = false)
    private Integer type3Balcony;

    /**
     * Number of parking spaces available for the 3BHK unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Max(value = 3, message = "Parking spaces cannot exceed 3") // Logical limit
    @Column(name = "type_3_parking", nullable = false)
    private Integer type3Parking;
 // Hall area in square feet.
    
 @Column(name = "hall_area")
 private String hallArea; 

 /**
  * Kitchen area in square feet.
  */
 @Column(name = "kitchen_area")
 private String kitchenArea;
/**
    /**
    * Area of the first bedroom.
    */
    @Column(name = "bedroom_1_area")
    private String bedroom1Area;
 /**
    * Area of the first bedroom.
    */
    @Column(name = "bedroom_2_area")
    private String bedroom2Area;
    
    @Column(name = "bedroom_3_area")
    private String bedroom3Area;
    /**
     * Area of the first bathroom.
     */
    @Column(name = "bathroom_1_area")
    private String bathroom1Area;
 
    /**
     * Area of the second bathroom (if applicable).
     */
    @Column(name = "bathroom_2_area")
    private String bathroom2Area;

    @Column(name = "bathroom_3_area")
    private String bathroom3Area;
}
