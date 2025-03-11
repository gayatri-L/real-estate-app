package com.example.real_estate.api.controller;

import com.example.real_estate.api.dto.*;
// import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.service.EntityService;
// import com.example.real_estate.api.service.EntityQueryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
// import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// import javax.naming.Binding;

/**
 * REST Controller for managing multiple entity types dynamically.
 */
@RestController
@RequestMapping("/api/entities")
@RequiredArgsConstructor
@Validated
public class EntityController {

    private static final Logger logger = LoggerFactory.getLogger(EntityController.class);
    private final EntityService entityService;

    // private final EntityQueryService entityQueryService;

    /**
     * API to create a new entity dynamically.
     *
     * @param request The entity details.
     * @return A success response.
    //  */
    // @PostMapping("/create")
    // public ResponseEntity<String> createEntity(@Valid @RequestBody CreateEntityRequest request,Binding result) {
    //     entityService.createEntity(request);
    //     return ResponseEntity.ok("Entity saved successfully!");
    // }
@CrossOrigin(origins = "http://localhost:3000") // Allow only React fronten
@PostMapping("/create")
public ResponseEntity<Map<String, String>> createEntity(
        @Valid @RequestBody CreateEntityRequest request, BindingResult result) {
    
    if (result.hasErrors()) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(errors);
    }

    logger.info("Received request to create entity: {}", request);

    entityService.createEntity(request);

    return ResponseEntity.ok(Map.of("message", "Entity created successfully!"));
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

    @GetMapping("/latest")
    public ResponseEntity<GetEntityResponse> getLatestEntity() {
    GetEntityResponse latestEntity = entityService.getLatestEntity();
    return latestEntity != null
            ? ResponseEntity.ok(latestEntity)
            : ResponseEntity.notFound().build();
}
    
}
