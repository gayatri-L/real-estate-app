package com.example.real_estate.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.real_estate.api.model.PenthouseConfig;
import com.example.real_estate.api.model.Project;

import java.util.*;
/**
 * Repository for managing Organisation entities.
 */
@Repository
public interface PenthouseConfigRepository extends JpaRepository<PenthouseConfig,Integer > {
     List<PenthouseConfig> findByProject(Project project);

}

