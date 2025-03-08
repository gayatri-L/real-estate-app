package com.example.real_estate.api.dto;

import com.example.real_estate.api.model.*;
// import jakarta.validation.constraints.*;
import lombok.*;

import java.util.*;

/**
 * DTO class for dynamically saving data into different tables.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateEntityRequest {

 

    //Organisation
    private Integer projectId;
    private String organisationName;
    private String organisationCin;
    private String organisationOwners;
    private Integer projectsCompleted;

    //Project
    private String projectName;
    private String city;
    private String locality;
    private String address;
    private Double latitude;
    private Double longitude;
    private Double propertyAreaSqmt;
    private String reraNumber;
    private String reraLink;
    private String projectVideoLink;
    private List<String> projectImages;
    private List<String> schools;
    private List<String> hospitals;
    private List<String> malls;
    private List<String> movieTheaters;

     // Project Details Fields
     private Integer units;
     private String projectStatus;
     private Date projectLaunch;
     private Date projectPlannedEnd;
     private Integer priceMin;
     private Integer priceMax;
     private Boolean allInclusive;
     private String amenities;
     private String coveredParking;
     private Boolean bankApproved;
     private String banks;

    // BHK Configurations
    private OneBHKConfig oneBHKConfig;
    private TwoBHKConfig twoBHKConfig;
    private ThreeBHKConfig threeBHKConfig;
    private FourBHKConfig fourBHKConfig;
    private FiveBHKConfig fiveBHKConfig;
    private PenthouseConfig penthouseConfig;
}
