package com.example.real_estate.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.real_estate.api.model.OneBHKConfig;
import com.example.real_estate.api.model.Project;
// import com.example.real_estate.api.model.ProjectDetails;
import java.util.*;
/**
 * Repository for managing Organisation entities.
 */




 @Repository
 public interface OneBhkConfigRepository extends JpaRepository<OneBHKConfig, Integer> {
      List<OneBHKConfig> findByProject(Project project);
 }
 

