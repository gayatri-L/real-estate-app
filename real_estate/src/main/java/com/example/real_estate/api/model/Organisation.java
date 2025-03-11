package com.example.real_estate.api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*; // ✅ Import Lombok annotations
import java.util.List;

@Entity
@Table(name = "organisation")
@Getter  // ✅ Auto-generates Getters
@Setter  // ✅ Auto-generates Setters
@NoArgsConstructor  // ✅ Auto-generates No-Argument Constructor (Required by JPA)
@AllArgsConstructor // ✅ Auto-generates Parameterized Constructor
public class Organisation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "org_id", nullable = false)
    private int org_Id;

    @NotNull(message = "Organisation name is required")
    @Size(max = 100, message = "Organisation name should be at most 100 characters")
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Organisation name includes invalid characters.")
    @Column(name = "org_name")
    private String org_Name;

    @Column(name = "org_cin", unique = true)
    @Size(max = 21, message = "CIN must not exceed 21 characters")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "CIN must contain only letters and numbers")
    private String org_Cin;
    

    @NotNull(message = "Owner name is required")
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Owner name includes invalid characters.")
    @Column(name = "org_owners", nullable = false)
    private String org_owners;

    @Column(name="projectscompleted", nullable = false)
    @Min(value = 0, message = "Projects completed cannot be negative")
    @Max(value = 999, message = "Projects completed is too high")
    @NotNull(message = "Projects completed is required")
    private Integer projectsCompleted;

    // One organisation has multiple projects
    @OneToMany(mappedBy = "organisation", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Project> projects;

    public Organisation( String organisationCin, String organisationName, String organisationOwners, Integer projectCompleted) {
        this.org_Cin = organisationCin;
        this.org_Name = organisationName;
        this.org_owners = organisationOwners;
        this.projectsCompleted = projectCompleted;
    }
    
}
