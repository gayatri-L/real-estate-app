package com.example.real_estate.api.dto;

import com.example.real_estate.api.model.*;// ✅ Import necessary model classes for entity relationships
import com.fasterxml.jackson.annotation.JsonProperty;// ✅ Import Jackson annotations for JSON serialization and deserialization

// import jakarta.validation.constraints.*;
import lombok.*;// ✅ Import Lombok annotations for reducing boilerplate code

import java.util.*;

/**
 * DTO class for dynamically saving data into different tables.
 */
@Getter // ✅ Generates getter methods for all fields
@Setter // ✅ Generates setter methods for all fields
@NoArgsConstructor // ✅ Generates a no-args constructor
@AllArgsConstructor // ✅ Generates a constructor with all fields
@ToString // ✅ Generates a toString() method for debugging

public class CreateEntityRequest {

 
    // ✅ Organisation-related details
    private Integer projectId; // Unique project identifier
    private String organisationName; // Name of the real estate organisation
    private String organisationCin; // Corporate Identification Number (CIN)
    private String organisationOwners; // List of organisation owners
    private Integer projectsCompleted; // Total number of completed projects

    // ✅ Basic project information
    private String projectName; // Name of the project
    private String city; // City where the project is located
    private String locality; // Local area within the city
    private String address; // Full address of the project
    private Double latitude; // Latitude coordinate for maps
    private Double longitude; // Longitude coordinate for maps
    private Double propertyAreaSqmt; // Total property area in square meters
    private String reraNumber; // Regulatory registration number (RERA)
    private String reraLink; // Link to project’s RERA details
    private String projectVideoLink; // Video tour or promotional video link

    // ✅ Nearby facilities (to show in UI or for search filters)
    @JsonProperty("projectimages")
    private List<String> projectImages;// URLs of project images

    @JsonProperty("schools")
    private List<String> schools;// Nearby schools

    @JsonProperty("hospitals")
    private List<String> hospitals;// Nearby hospitals

    @JsonProperty("malls")
    private List<String> malls;// Nearby shopping malls

    @JsonProperty("movieTheaters")
    private List<String> movieTheaters; // Nearby movie theaters

    @JsonProperty("itParks")
    private List<String> itParks; // Nearby IT parks and business hubs

     // ✅ Project details and pricing
     private Integer units; // Total number of units available
     private String projectStatus; // Status (e.g., "Under Construction", "Ready to Move")
     private Date projectLaunch; // Launch date
     private Date projectPlannedEnd; // Expected completion date
     private Integer priceMin; // Minimum unit price
     private Integer priceMax; // Maximum unit price
     private Boolean allInclusive; // Whether price includes taxes and charges
     
     private String amenities; // List of project amenities
     private String coveredParking; // Details about covered parking spaces
     private Boolean bankApproved; // Whether approved by banks for home loans
     private String banks; // List of banks providing loans

      // ✅ BHK Configurations (Different apartment types and their configurations)
    @JsonProperty("oneBHKConfig") // ✅ Maps JSON key "oneBHKConfig" to this field
    private List<OneBHKConfig> oneBHKConfig; // ✅ List of 1BHK configurations

    @JsonProperty("twoBHKConfig") // ✅ Maps JSON key "twoBHKConfig" to this field
    private List<TwoBHKConfig> twoBHKConfig; // ✅ List of 2BHK configurations

    @JsonProperty("threeBHKConfig") // ✅ Maps JSON key "threeBHKConfig" to this field
    private List<ThreeBHKConfig> threeBHKConfig; // ✅ List of 3BHK configurations

    @JsonProperty("fourBHKConfig") // ✅ Maps JSON key "fourBHKConfig" to this field
    private List<FourBHKConfig> fourBHKConfig; // ✅ List of 4BHK configurations

    @JsonProperty("fiveBHKConfig") // ✅ Maps JSON key "fiveBHKConfig" to this field
    private List<FiveBHKConfig> fiveBHKConfig; // ✅ List of 5BHK configurations

    @JsonProperty("penthouseConfig") // ✅ Maps JSON key "penthouseConfig" to this field
    private List<PenthouseConfig> penthouseConfig; // ✅ List of penthouse configurations

    // New Field: Project Timeline
    // ✅ Project Timeline (Track progress and major milestones)
    @JsonProperty("projectTimeline") // ✅ Maps JSON key "projectTimeline" to this field
    private List<ProjectTimeLine> projectTimeline; // ✅ Key milestones in project development

}
