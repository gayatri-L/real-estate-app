package com.example.real_estate.api.controller;

import com.example.real_estate.api.dto.*;
// import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.service.EntityService;
// import com.example.real_estate.api.service.EntityQueryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * REST Controller for managing multiple entity types dynamically.
 */
@RestController
@RequestMapping("/api/entities")
@RequiredArgsConstructor

public class EntityController {

    private final EntityService entityService;

    // private final EntityQueryService entityQueryService;

    /**
     * API to create a new entity dynamically.
     *
     * @param request The entity details.
     * @return A success response.
     */
    @PostMapping("/create")
    public ResponseEntity<String> createEntity(@Valid @RequestBody CreateEntityRequest request) {
        entityService.createEntity(request);
        return ResponseEntity.ok("Entity saved successfully!");
    }


     /**
     * API to fetch all entities dynamically.
     *
     * @return A list of entities.
     */
    // ✅ Add GET method for fetching all entities
   @GetMapping("/all")
    public ResponseEntity<List<GetEntityResponse>> getAllEntities() {
        List<GetEntityResponse> response = entityService.getAllEntities();
        return ResponseEntity.ok(response);
    }
    
}
