// Package declaration: Defines the package where this class belongs
package com.example.real_estate.api.model;

// Importing necessary Hibernate annotation for handling database column types
import org.hibernate.annotations.JdbcTypeCode;
// import org.hibernate.annotations.processing.SQL; (Commented out as it's not being used)
import org.hibernate.type.SqlTypes;
import java.util.*;

// Importing Jakarta Persistence (JPA) and validation annotations for entity mapping and constraints
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Represents the configuration details for Penthouse units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity // Marks this class as a JPA entity
@Table(name = "penthouse_config", uniqueConstraints = @UniqueConstraint(columnNames = {"project_id", "type_number"})) // Defines table name and unique constraints
@Getter // Lombok annotation to generate getter methods
@Setter // Lombok annotation to generate setter methods
@NoArgsConstructor // Lombok annotation to generate a no-args constructor
@AllArgsConstructor // Lombok annotation to generate an all-args constructor
@ToString // Lombok annotation to generate toString() method
public class PenthouseConfig {

    /**
     * Unique identifier for the Penthouse configuration.
     */
    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates the primary key value
    @Column(name = "penthouse_config_id") // Maps this field to the specified column name
    private Integer penthouseConfigId;  // Changed from Integer to Long

    /**
     * The project to which this Penthouse configuration belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // Defines many-to-one relationship with lazy loading
    @JoinColumn(name = "project_id", nullable = false) // Foreign key column
    private Project project;


    @Min(value = 1, message = "Type number must be greater than 0") // Ensures type number is at least 1
    @Column(name = "type_number") // Maps this field to the specified column
    private Integer typeNumber;
    
    /**
     * Number of penthouse units available in this configuration.
     */
    @NotNull(message = "Units cannot be null") // Ensures the value is not null
    @Min(value = 1, message = "Units must be greater than 0") // Ensures at least one unit exists
    @Column(name = "penthouse_units", nullable = false) // Maps field to column, cannot be null
    private Integer penthouseUnits;;

    /**
     * Total area of the penthouse unit (in square feet).
     */
    @NotNull(message = "Area cannot be null")
    @Min(value = 1, message = "Area must be greater than 0")
    @Column(name = "penthouse_area", nullable = false)
    private Integer penthouseArea;

    /**
     * Floor plan details for the penthouse unit.
     */
    @JdbcTypeCode(SqlTypes.JSON) // Defines column type as JSON
    @Column(name = "penthouse_floor_plan", columnDefinition = "JSONB") // Stores floor plan details in JSON format
    private List<String> penthouseFloorPlan;

    /**
     * Image URLs for the penthouse unit.
     */
    // Changed from columnDefinition = "TEXT"
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "penthouse_images",columnDefinition = "JSONB")
    private List<String> penthouseImages;

    /**
     * Number of bathrooms in the penthouse unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null")
    @Min(value = 1, message = "Bathrooms must be at least 1")
    @Max(value = 8, message = "Bathrooms cannot exceed 8") // Logical limit
    @Column(name = "penthouse_bathrooms", nullable = false)
    private Integer penthouseBathrooms;

    /**
     * Number of balconies in the penthouse unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Max(value = 10, message = "Balconies cannot exceed 10") // Logical limit
    @Column(name = "penthouse_balcony", nullable = false)
    private Integer penthouseBalcony;

    /**
     * Number of parking spaces available for the penthouse unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Max(value = 5, message = "Parking spaces cannot exceed 5") // Logical limit
    @Column(name = "penthouse_parking", nullable = false)
    private Integer penthouseParking;

     // Hall area in square feet.
    
   @Column(name = "hall_area")
   private String hallArea; 

   /**
    * Kitchen area in square feet.
    */
   @Column(name = "kitchen_area")
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

    @Column(name = "bedroom_3_area")
    private String bedroom3Area;

    @Column(name = "bedroom_4_area")
    private String bedroom4Area;

    @Column(name = "bedroom_5_area")
    private String bedroom5Area;

    @Column(name = "bedroom_6_area")
    private String bedroom6Area;
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

    @Column(name = "bathroom_4_area")
    private String bathroom4Area;

    @Column(name = "bathroom_5_area")
    private String bathroom5Area;    

    @Column(name = "bathroom_6_area")
    private String bathroom6Area;    
}

