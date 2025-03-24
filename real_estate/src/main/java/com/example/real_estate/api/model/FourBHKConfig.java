
package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.*;

/**
 * Represents the configuration details for 4BHK units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "fourbhk_config",uniqueConstraints = @UniqueConstraint(columnNames = {"project_id","type_number"}))
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
    private Integer fourBhkConfigId; // Changed from Integer to Long

    /**
     * The project to which this configuration belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // Optimized FetchType
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    // @NotNull(message = "Type number cannot be null")
    @Min(value = 1, message = "Type number must be greater than 0")
    @Column(name = "type_number")
    private Integer typeNumber;
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
    // Changed from columnDefinition = "TEXT"
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "type_4_floor_plan",columnDefinition = "JSONB")
    private List<String> type4FloorPlan;

    /**
     * Image URLs for the 4BHK unit.
     */
    // @Lob // Changed from columnDefinition = "TEXT"
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "type_4_images",columnDefinition = "JSONB")
    private List<String> type4Images;

    /**
     * Number of bathrooms in the 4BHK unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null")
    @Min(value = 0, message = "Bathrooms must be 0 or more")
    @Max(value = 6, message = "Bathrooms cannot exceed 6") // Logical limit
    @Column(name = "type_4_bathrooms", nullable = false)
    private Integer type4Bathrooms;

    /**
     * Number of balconies in the 4BHK unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Max(value = 10, message = "Balconies cannot exceed 10") // Logical limit
    @Column(name = "type_4_balcony", nullable = false)
    private Integer type4Balcony;

    /**
     * Number of parking spaces available for the 4BHK unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Max(value = 4, message = "Parking spaces cannot exceed 4") // Logical limit
    @Column(name = "type_4_parking", nullable = false)
    private Integer type4Parking;

     // Hall area in square feet.
    
   @Column(name = "hall_area")
   private String hallArea; 

   /*
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
}
