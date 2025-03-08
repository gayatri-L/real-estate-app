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
    private int org_id;

    @NotBlank(message = "Organization name is required")
    @Size(max = 100, message = "Name should be at most 100 characters")
    @Column(name = "org_name")
    private String org_name;

    @Size(max = 21, message = "CIN should be at most 21 characters")
    @Column(name = "org_cin", nullable = true)
    private String org_cin;

    @Column(name = "org_owners", nullable = true)
    private String org_owners;

    @Min(value = 0, message = "Projects completed must be >= 0")
    @Max(value = 999, message = "Projects completed must be <= 999")
    @Column(name="projectscompleted", nullable = false)
    private int projectscompleted;

    // One organisation has multiple projects
    @OneToMany(mappedBy = "organisation", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Project> projects;

    public Organisation( String organisationCin, String organisationName, String organisationOwners, Integer projectcompleted) {
        this.org_cin = organisationCin;
        this.org_name = organisationName;
        this.org_owners = organisationOwners;
        this.projectscompleted = projectcompleted;
    }
    
}
