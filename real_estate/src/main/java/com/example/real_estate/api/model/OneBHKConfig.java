package com.example.real_estate.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
/**
 * Represents the configuration details for 1BHK units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "onebhk_config",uniqueConstraints = {@UniqueConstraint(columnNames = {"project_id", "type_number"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OneBHKConfig {

    /**
     * Unique identifier for the 1BHK configuration.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "onebhk_config_id")
    private Integer oneBhkConfigId; // Changed from Integer to Long

    /**
     * The project to which this configuration belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // Added Lazy Fetch
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    /**
     * Type number to differentiate multiple configurations within a project.
     */
    // @NotNull(message = "Type number cannot be null")
    @Min(value = 1, message = "Type number must be greater than 0")
    @Column(name = "type_number")
    private Integer typeNumber;

    /**
     * Number of units available for this 1BHK configuration.
     */
    @NotNull(message = "Units cannot be null")
    @Min(value = 1, message = "Units must be greater than 0")
    @Column(name = "type_1_units", nullable = false)
    private Integer type1Units;

    /**
     * Total area of the 1BHK unit (in square feet).
     */
    @NotNull(message = "Area cannot be null")
    @Min(value = 1, message = "Area must be greater than 0")
    @Column(name = "type_1_area", nullable = false)
    private Integer type1Area;

    /**
     * Floor plan details for the 1BHK unit.
     */
     // Alternative for TEXT fields
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "type_1_floor_plan",columnDefinition = "JSONB")
    private List<String> type1FloorPlan;

    /**
     * Image URLs for the 1BHK unit.
     * 
     */
    // ✅ Use JSONB for images
    // @Convert(converter = StringListConverter.class)
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "type_1_images", columnDefinition = "JSONB")
    private List<String> type1Images;


    /**
     * Number of bathrooms in the 1BHK unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null")
    @Min(value = 0, message = "Bathrooms must be 0 or more")
    @Column(name = "type_1_bathrooms", nullable = false)
    private Integer type1Bathrooms;

    /**
     * Number of balconies in the 1BHK unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Column(name = "type_1_balcony", nullable = false)
    private Integer type1Balcony;

    /**
     * Number of parking spaces available for the 1BHK unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Column(name = "type_1_parking", nullable = false)
    private Integer type1Parking;

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

   /*
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
