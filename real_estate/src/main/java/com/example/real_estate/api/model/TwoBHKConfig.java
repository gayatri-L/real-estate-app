
package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.*;
/**
 * Represents the configuration details for 2BHK units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "twobhk_config",uniqueConstraints = @UniqueConstraint(columnNames = {"project_id", "type_number"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TwoBHKConfig {

    /**
     * Unique identifier for the 2BHK configuration.
     */
    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates the ID value
    @Column(name = "twobhk_config_id") // Maps this field to the "twobhk_config_id" column in the database
    private Integer twoBhkConfigId; // Changed from Integer to Long

    /**
     * The project to which this configuration belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // Defines a Many-to-One relationship with lazy loading
    @JoinColumn(name = "project_id", nullable = false) // Foreign key linking to the Project entity
    private Project project;


    // @NotNull(message = "Type number cannot be null")
    @Min(value = 1, message = "Type number must be greater than 0") // Ensures the type number is at least 1
    @Column(name = "type_number") // Maps this field to the "type_number" column in the database
    private Integer typeNumber;
    /**
     * Number of units available for this 2BHK configuration.
     */
    @NotNull(message = "Units cannot be null") // Ensures this field is not null
    @Min(value = 1, message = "Units must be greater than 0") // Ensures units are at least 1
    @Column(name = "type_2_units", nullable = false) // Maps this field to the "type_2_units" column in the database
    private Integer type2Units;

    /**
     * Total area of the 2BHK unit (in square feet).
     */
    @NotNull(message = "Area cannot be null") // Ensures this field is not null
    @Min(value = 1, message = "Area must be greater than 0") // Ensures the area is at least 1 sq. ft.
    @Column(name = "type_2_area", nullable = false) // Maps this field to the "type_2_area" column in the database
    private Integer type2Area;

    /**
     * Floor plan details for the 2BHK unit.
     */
    // Changed from columnDefinition = "TEXT"
    @JdbcTypeCode(SqlTypes.JSON) // Specifies the field type as JSON
    @Column(name = "type_2_floor_plan", columnDefinition = "JSONB") // Maps this field to a JSONB column
    private List<String> type2FloorPlan;

    /**
     * Image URLs for the 2BHK unit.
     */
     // Changed from columnDefinition = "TEXT"
     @JdbcTypeCode(SqlTypes.JSON) // Specifies the field type as JSON
     @Column(name = "type_2_images", columnDefinition = "JSONB") // Maps this field to a JSONB column
     private List<String> type2Images;

    /**
     * Number of bathrooms in the 2BHK unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null") // Ensures this field is not null
    @Min(value = 0, message = "Bathrooms must be 0 or more") // Ensures bathrooms are at least 0
    @Column(name = "type_2_bathrooms", nullable = false) // Maps this field to the "type_2_bathrooms" column in the database
    private Integer type2Bathrooms;

    /**
     * Number of balconies in the 2BHK unit.
     */
    @NotNull(message = "Number of balconies cannot be null") // Ensures this field is not null
    @Min(value = 0, message = "Balconies must be 0 or more") // Ensures balconies are at least 0
    @Column(name = "type_2_balcony", nullable = false) // Maps this field to the "type_2_balcony" column in the database
    private Integer type2Balcony;

    /**
     * Number of parking spaces available for the 2BHK unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null") // Ensures this field is not null
    @Min(value = 0, message = "Parking spaces must be 0 or more") // Ensures parking spaces are at least 0
    @Column(name = "type_2_parking", nullable = false) // Maps this field to the "type_2_parking" column in the database
    private Integer type2Parking;

    // Hall area in square feet.
    
   @Column(name = "hall_area")// Maps this field to the "hall_area" column in the database
   private String hallArea; 

   /**
    * Kitchen area in square feet.
    */
   @Column(name = "kitchen_area")// Maps this field to the "kitchen_area" column in the database
   private String kitchenArea;
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
}
