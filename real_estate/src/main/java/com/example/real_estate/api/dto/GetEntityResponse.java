package com.example.real_estate.api.dto;

import com.example.real_estate.api.model.*;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetEntityResponse {
    
    private String organisationName;
    private String organisationCin;
    private String organisationOwners;
    private int projectsCompleted;

    private String projectName;
    private String city;
    private String locality;
    private String address;
    private double latitude;
    private double longitude;
    private int propertyAreaSqmt;
    private String reraNumber;
    private String reraLink;
    private String projectVideoLink;
    private List<String> projectImages;
    private List<String> schools;
    private List<String> hospitals;
    private List<String> malls;
    private List<String> movieTheaters;

    private int units;
    private String projectStatus;
    private String projectLaunch;
    private String projectPlannedEnd;
    private double priceMin;
    private double priceMax;
    private boolean allInclusive;
    private String amenities;
    private String coveredParking;
    private boolean bankApproved;
    private String banks;

    private OneBHKConfig oneBHKConfig;
    private TwoBHKConfig twoBHKConfig;
    private ThreeBHKConfig threeBHKConfig;
    private FourBHKConfig fourBHKConfig;
    private FiveBHKConfig fiveBHKConfig;
    private PenthouseConfig penthouseConfig;
    private ProjectTimeLine projectTimeLine;
}
