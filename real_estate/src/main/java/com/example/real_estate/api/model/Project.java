
package com.example.real_estate.api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer projectId;

    @ManyToOne
    @JoinColumn(name = "org_id", nullable = false)
    @JsonIgnore
    private Organisation organisation;

    @NotNull(message = "Project name is required")
    @Column(name = "projectname", length = 200, nullable = false)
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    private String projectName;

    @NotNull(message = "City is required")
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    @Column(name = "city", length = 50, nullable = false)
    private String city;

    @NotNull(message = "Locality is required")
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    @Column(name = "locality", length = 100, nullable = false)
    private String locality;

    @NotNull(message = "Address is required")
    @Pattern(regexp = "^[A-Za-z0-9.,&\\s]+$", message = "Invalid format")
    @Column(name = "address", length = 500, nullable = false)
    private String address;

    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;

    @NotNull(message = "Property area is required")
    @Column(name = "propertyarea_sqmt", nullable = false)
    @Max(value = 999, message = "Property area is too high")
    private Integer propertyAreaSqmt;

    @Pattern(message="RERA number should contain only numbers and letters", regexp = "^[A-Za-z0-9]+$")
    @Column(name = "reranumber")
    private String reraNumber;

    @Column(name = "reralink", length = 255)
    private String reraLink;

    @Column(name = "projectvideolink", length = 255)
    private String projectVideoLink;

    @Column(name = "projectimages", columnDefinition = "TEXT")
    private String projectImages;

    @Column(name = "schools", columnDefinition = "TEXT")
    // @Pattern(regexp = "^[A-Za-z0-9\\s]+$", message = "Invalid format")
    private String schools;

    @Column(name = "hospitals", columnDefinition = "TEXT")
    // @Pattern(regexp = "^[A-Za-z0-9\\s]+$", message = "Invalid format")
    private String hospitals;

    @Column(name = "malls", columnDefinition = "TEXT")
    // @Pattern(regexp = "^[A-Za-z0-9\\s]+$", message = "Invalid format")
    private String malls;

    @Column(name = "movietheaters", columnDefinition = "TEXT")
    // @Pattern(regexp = "^[A-Za-z0-9\\s]+$", message = "Invalid format")
    private String movieTheaters;

    @Column(name="it_parks", columnDefinition = "TEXT")
    // @Pattern(regexp = "^[A-Za-z0-9\\s]+$", message = "Invalid format")
    private String itParks;

    @Column(name = "deleted", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean deleted = false;
    

    // ✅ Corrected Constructor
    public Project(Organisation organisation, String projectName, String city, String locality, String address,
                   Double latitude, Double longitude, Integer propertyAreaSqmt,
                   String reraNumber, String reraLink, String projectVideoLink,
                   String projectImages, String schools, String hospitals, 
                   String malls, String movieTheaters,String itParks, Boolean deleted) {

        this.organisation = organisation;
        this.projectName = projectName;
        this.city = city;
        this.locality = locality;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.propertyAreaSqmt = propertyAreaSqmt;
        this.reraNumber = reraNumber;
        this.reraLink = reraLink;
        this.projectVideoLink = projectVideoLink;
        this.projectImages = projectImages;
        this.schools = schools;
        this.hospitals = hospitals;
        this.malls = malls;
        this.movieTheaters = movieTheaters;
        this.itParks = itParks;
        this.deleted = deleted; // Now correctly assigned
    }
}
