package com.example.real_estate.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.example.real_estate.api.model.FourBHKConfig;
import com.example.real_estate.api.model.Project;


/**
 * Repository for managing Organisation entities.
 */
@Repository
public interface FourBhkConfigRepository extends JpaRepository<FourBHKConfig,Integer > {
   List<FourBHKConfig> findByProject(Project project);

}

