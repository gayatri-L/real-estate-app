package com.example.real_estate.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

/**
 * Entity class representing the project timeline milestones.
 * This class stores multiple milestone dates and their respective statuses for a project.
 */
@Entity
@Data // Lombok annotation to generate getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Generates a no-argument constructor (required by JPA)
@AllArgsConstructor // Generates a constructor with all fields
@Table(name = "project_timeline") // Maps this class to the "project_timeline" table in the database
public class ProjectTimeLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Unique identifier for each timeline entry

    @ManyToOne // Many timelines can be associated with a single project
    @JoinColumn(name = "project_id", nullable = false) // Foreign key reference to the Project entity
    private Project project;

    /**
     * Milestone 1: Represents an important project phase.
     */
    private Date milestoneDate1;
    private String milestoneStatus1;

    /**
     * Milestone 2: Represents another key phase of the project.
     */
    private Date milestoneDate2;
    private String milestoneStatus2;

    /**
     * Milestone 3: Represents a further stage in the project timeline.
     */
    private Date milestoneDate3;
    private String milestoneStatus3;

    /**
     * Milestone 4: Represents an additional milestone in the project development.
     */
    private Date milestoneDate4;
    private String milestoneStatus4;

    /**
     * Milestone 5: Final or near-final milestone of the project timeline.
     */
    private Date milestoneDate5;
    private String milestoneStatus5;
}
