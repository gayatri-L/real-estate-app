package com.example.real_estate.api.dto;

import com.example.real_estate.api.model.*; // ✅ Import necessary model classes used in this DTO

import lombok.*; // ✅ Import Lombok annotations to reduce boilerplate code

import java.util.List;

/**
 * DTO (Data Transfer Object) for retrieving entity details.
 * This class is used to transfer data when fetching an entity from the backend.
 */
@Getter // ✅ Generates getter methods for all fields
@Setter // ✅ Generates setter methods for all fields
@AllArgsConstructor // ✅ Generates a constructor with all fields
@NoArgsConstructor // ✅ Generates a no-args constructor
public class GetEntityResponse {

    // ✅ Organisation details 
    private String organisationName; // ✅ Name of the organisation
    private String organisationCin; // ✅ Corporate Identification Number (CIN)
    private String organisationOwners; // ✅ List of organisation owners (comma-separated or JSON array)
    private int projectsCompleted; // ✅ Total number of completed projects by the organisation

    // ✅ Project details
    private String projectName; // ✅ Name of the real estate project
    private String city; // ✅ City where the project is located
    private String locality; // ✅ Local area within the city
    private String address; // ✅ Full address of the project
    private double latitude; // ✅ Geographic latitude coordinate
    private double longitude; // ✅ Geographic longitude coordinate
    private int propertyAreaSqmt; // ✅ Total project area in square meters
    private String reraNumber; // ✅ Regulatory registration number (RERA)
    private String reraLink; // ✅ Link to the project's RERA details
    private String projectVideoLink; // ✅ Video link showcasing the project

    // ✅ Nearby amenities
    private List<String> projectImages; // ✅ List of image URLs for the project
    private List<String> schools; // ✅ Nearby schools
    private List<String> hospitals; // ✅ Nearby hospitals
    private List<String> malls; // ✅ Nearby shopping malls
    private List<String> movieTheaters; // ✅ Nearby movie theaters

    // ✅ Project status and pricing
    private int units; // ✅ Total number of available units
    private String projectStatus; // ✅ Project status (e.g., "Under Construction", "Ready to Move")
    private String projectLaunch; // ✅ Launch date of the project
    private String projectPlannedEnd; // ✅ Expected completion date
    private double priceMin; // ✅ Minimum price of available units
    private double priceMax; // ✅ Maximum price of available units
    private boolean allInclusive; // ✅ Whether the price includes additional charges like taxes and fees
    private String amenities; // ✅ List of project amenities (e.g., swimming pool, gym, clubhouse)
    private String coveredParking; // ✅ Parking details (e.g., "2 covered parking slots per unit")
    private boolean bankApproved; // ✅ Whether banks have approved the project for home loans
    private String banks; // ✅ List of banks offering loans for this project

// ✅ BHK configurations    
private OneBHKConfig oneBHKConfig; // ✅ Configuration details for 1BHK apartments
private TwoBHKConfig twoBHKConfig; // ✅ Configuration details for 2BHK apartments
private ThreeBHKConfig threeBHKConfig; // ✅ Configuration details for 3BHK apartments
private FourBHKConfig fourBHKConfig; // ✅ Configuration details for 4BHK apartments
private FiveBHKConfig fiveBHKConfig; // ✅ Configuration details for 5BHK apartments
private PenthouseConfig penthouseConfig; // ✅ Configuration details for penthouses
     
    // ✅ Project Timeline
    private ProjectTimeLine projectTimeLine; // ✅ Stores key milestones in project development
}
