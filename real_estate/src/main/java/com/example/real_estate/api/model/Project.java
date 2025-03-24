
package com.example.real_estate.api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.*;

/**
 * Represents a real estate project with details such as location, area, RERA information, and amenities.
 * Each project is linked to an organisation and can have multiple timelines.
 */
@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Project {

      /**
     * Unique identifier for the project.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer projectId;

     /**
     * The organisation that owns the project.
     */
    @ManyToOne
    @JoinColumn(name = "org_id", nullable = false)
    @JsonIgnore
    private Organisation organisation;

    /**
     * A list of project timelines associated with this project.
     */
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectTimeLine> timelines;

    /**
     * Name of the project.
     */
    @NotNull(message = "Project name is required")
    @Column(name = "projectname", length = 200, nullable = false)
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    private String projectName;

    /**
     * City where the project is located.
     */
    @NotNull(message = "City is required")
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    @Column(name = "city", length = 50, nullable = false)
    private String city;

    /**
     * Locality within the city.
     */
    @NotNull(message = "Locality is required")
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    @Column(name = "locality", length = 100, nullable = false)
    private String locality;

     /**
     * Full address of the project.
     */
    @NotNull(message = "Address is required")
    @Pattern(regexp = "^[A-Za-z0-9.,&\\s]+$", message = "Invalid format")
    @Column(name = "address", length = 500, nullable = false)
    private String address;

     /**
     * Latitude coordinate of the project.
     */
    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;

   /**
     * Longitude coordinate of the project.
     */
    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;

    /**
     * Total property area in square meters.
     */
    @NotNull(message = "Property area is required")
    @Column(name = "propertyarea_sqmt", nullable = false)
    @Max(value = 999, message = "Property area is too high")
    private Integer propertyAreaSqmt;

    /**
     * RERA (Real Estate Regulatory Authority) number.
     */
    @Pattern(message="RERA number should contain only numbers and letters", regexp = "^[A-Za-z0-9]+$")
    @Column(name = "reranumber")
    private String reraNumber;

    /**
     * Link to RERA registration details.
     */
    @Column(name = "reralink", length = 255)
    private String reraLink;

    /**
     * Video link showcasing the project.
     */
    @Column(name = "projectvideolink", length = 255)
    private String projectVideoLink;

    /**
     * List of project images stored as JSON.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "projectimages", columnDefinition = "JSONB")
    private List<String> projectImages;

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

    /**
     * Flag indicating whether the project is deleted (soft delete mechanism).
     */
    @Column(name = "deleted", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean deleted = false;
    

    // ✅ Corrected Constructor to initialize all fields
    public Project(Organisation organisation, String projectName, String city, String locality, String address,
                   Double latitude, Double longitude, Integer propertyAreaSqmt,
                   String reraNumber, String reraLink, String projectVideoLink,
                   List<String> projectImages, String schools, String hospitals, 
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
