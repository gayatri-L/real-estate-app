package com.example.real_estate.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_timeline")
public class ProjectTimeLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    private Date milestoneDate1;
    private String milestoneStatus1;
    private Date milestoneDate2;
    private String milestoneStatus2;
    private Date milestoneDate3;
    private String milestoneStatus3;
    private Date milestoneDate4;
    private String milestoneStatus4;
    private Date milestoneDate5;
    private String milestoneStatus5;
}
