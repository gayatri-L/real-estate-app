
package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
// import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.*;
/**
/**
 * Represents the configuration details for 5BHK units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "fivebhk_config",uniqueConstraints = @UniqueConstraint(columnNames = {"project_id","type_number"}))
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

    @Min(value = 1, message = "Type number must be greater than 0")
    @Column(name = "type_number")
    private Integer typeNumber;

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
    @JdbcTypeCode(SqlTypes.JSON)  // Changed from columnDefinition = "TEXT"
    @Column(name = "type_5_floor_plan",columnDefinition = "JSONB")
    private List<String> type5FloorPlan;

    /**
     * Image URLs for the 5BHK unit.
     */
    @JdbcTypeCode(SqlTypes.JSON)// Changed from columnDefinition = "TEXT"
    @Column(name = "type_5_images")
    private List<String> type5Images;

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
}
