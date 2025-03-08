package com.example.real_estate.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.real_estate.api.model.Project;

import com.example.real_estate.api.model.TwoBHKConfig;
import java.util.*;
/**
 * Repository for managing Organisation entities.
 */
@Repository
public interface TwoBhkConfigRepository extends JpaRepository<TwoBHKConfig, Integer> {
List<TwoBHKConfig> findByProject(Project project);


}


