package com.example.real_estate.api.repository;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.real_estate.api.model.Project;
import com.example.real_estate.api.model.ProjectTimeLine;


/**
 * Repository for managing Organisation entities.
 */
@Repository
public interface  ProjectTimeLineRepository extends JpaRepository<ProjectTimeLine,Integer > {
List<ProjectTimeLine> findByProject(Project project);

}

