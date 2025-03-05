package com.example.real_estate.odata.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
/**
 * Represents a Project entity mapped to the "project" table in the database.
 * This entity is used to store and manage real estate project details.
 */
@Getter
@Setter
@Entity
@Table(name = "project") // Ensure this matches the DB table
public class Project {
 /**
     * Unique identifier for the project.
     * Auto-generated primary key using IDENTITY strategy.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer projectId;  

    @Column(name = "project_name", nullable = false, length = 100)
    private String projectName; 

    @Column(name = "location", nullable = false, length = 255)
    private String location;

   /**
     * Many-to-One relationship with the Organization entity.
     * - Each project belongs to a single organization.
     * - The foreign key "org_id" references the primary key of the Organization entity.
     * - Ensures referential integrity in the database.
     */
    @ManyToOne
    @JoinColumn(name = "org_id", nullable = false) // Ensure it matches Organization's org_id
    private Organization organization;
}
