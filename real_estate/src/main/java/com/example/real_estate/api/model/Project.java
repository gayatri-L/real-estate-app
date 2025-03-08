
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
    private Long projectId;

    @ManyToOne
    @JoinColumn(name = "org_id", nullable = false)
    @JsonIgnore
    private Organisation organisation;

    @NotBlank(message = "Project name is required")
    @Column(name = "projectname", length = 200, nullable = false)
    private String projectName;

    @NotBlank(message = "City is required")
    @Column(name = "city", length = 50, nullable = false)
    private String city;

    @NotBlank(message = "Locality is required")
    @Column(name = "locality", length = 100, nullable = false)
    private String locality;

    @NotBlank(message = "Address is required")
    @Column(name = "address", length = 500, nullable = false)
    private String address;

    @NotNull
    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @NotNull
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @NotNull
    @Min(0)
    @Max(999)
    @Column(name = "propertyarea_sqmt", nullable = false)
    private Integer propertyAreaSqmt;

    @Column(name = "reranumber", length = 255)
    private String reraNumber;

    @Column(name = "reralink", length = 255)
    private String reraLink;

    @Column(name = "projectvideolink", length = 255)
    private String projectVideoLink;

    @Column(name = "projectimages", columnDefinition = "TEXT")
    private String projectImages;

    @Column(name = "schools", columnDefinition = "TEXT")
    private String schools;

    @Column(name = "hospitals", columnDefinition = "TEXT")
    private String hospitals;

    @Column(name = "malls", columnDefinition = "TEXT")
    private String malls;

    @Column(name = "movietheaters", columnDefinition = "TEXT")
    private String movieTheaters;

    @Column(name = "deleted", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean deleted = false;
    

    // ✅ Corrected Constructor
    public Project(Organisation organisation, String projectName, String city, String locality, String address,
                   Double latitude, Double longitude, Integer propertyAreaSqmt,
                   String reraNumber, String reraLink, String projectVideoLink,
                   String projectImages, String schools, String hospitals, 
                   String malls, String movieTheaters, Boolean deleted) {

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
        this.deleted = deleted; // Now correctly assigned
    }
}
