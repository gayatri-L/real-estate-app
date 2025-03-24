package com.example.real_estate.api.controller; // ✅ Ensure the correct package is declared

// ✅ Import necessary DTO classes for request and response handling
import com.example.real_estate.api.dto.*;
// import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.service.EntityService;
// import com.example.real_estate.api.service.EntityQueryService;
import jakarta.validation.Valid; // ✅ Import Jakarta validation API for request validation
import lombok.RequiredArgsConstructor;// ✅ Import Lombok annotations for reducing boilerplate code

// ✅ Import Spring framework classes for handling HTTP responses
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
// import org.springframework.stereotype.Service;
// ✅ Import Spring annotations for REST controller and request handling
import org.springframework.web.bind.annotation.*;
import java.util.*;

// ✅ Import SLF4J logger for logging events and debugging
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// import javax.naming.Binding;

/**
 * REST Controller for managing multiple entity types dynamically.
 */
@RestController// ✅ Marks this class as a REST controller in Spring Boot
@RequestMapping("/api/entities")// ✅ Base URL for all endpoints in this controller
@RequiredArgsConstructor// ✅ Lombok annotation to generate a constructor with required fields
@Validated// ✅ Enables validation support

public class EntityController {

    private static final Logger logger = LoggerFactory.getLogger(EntityController.class);
    private final EntityService entityService;// ✅ Service layer dependency for business logic

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
@CrossOrigin(origins = "http://localhost:3000")// ✅ Allows requests from React frontend
@PostMapping("/create")// ✅ Handles HTTP POST requests at /api/entities/create
public ResponseEntity<Map<String, String>> createEntity(
        @Valid @RequestBody CreateEntityRequest request, BindingResult result) {
    
    // ✅ Check if the request has validation errors    
    if (result.hasErrors()) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());// ✅ Collect validation errors
        }
        return ResponseEntity.badRequest().body(errors);// ✅ Return errors as response
    }

    logger.info("Received request to create entity: {}", request);// ✅ Log the received request

    entityService.createEntity(request);// ✅ Call service method to save entity

    return ResponseEntity.ok(Map.of("message", "Entity created successfully!")); // ✅ Return success response
}

     /**
     * API to fetch all entities dynamically.
     *
     * @return A list of entities.
     */
    // ✅ Add GET method for fetching all entities
   @GetMapping("/all")// ✅ Handles HTTP GET requests at /api/entities/all
    public ResponseEntity<List<GetEntityResponse>> getAllEntities() {
        List<GetEntityResponse> response = entityService.getAllEntities();// ✅ Fetch all entities
        return ResponseEntity.ok(response);// ✅ Return the list of entities
    }

    @GetMapping("/latest")// ✅ Handles HTTP GET requests at /api/entities/latest
    public ResponseEntity<GetEntityResponse> getLatestEntity() {// ✅ Fetch latest entity
    GetEntityResponse latestEntity = entityService.getLatestEntity();
    return latestEntity != null
            ? ResponseEntity.ok(latestEntity)// ✅ Return entity if found
            : ResponseEntity.notFound().build();// ✅ Return 404 if no entity exists
}
    
}
