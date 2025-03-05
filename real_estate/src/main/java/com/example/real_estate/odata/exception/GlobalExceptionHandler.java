
package com.example.real_estate.odata.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import java.util.HashMap;
import java.util.Map;

/**
 * GlobalExceptionHandler class is responsible for handling exceptions 
 * across the entire Spring Boot application globally.
 * It captures and returns meaningful error responses instead of stack traces.
 */
@ControllerAdvice // Enables global exception handling for all controllers
@RestControllerAdvice // Combines @ControllerAdvice with @ResponseBody for REST APIs
public class GlobalExceptionHandler {

     /**
     * Handles validation errors triggered by @Valid annotation in request bodies.
     * Extracts validation messages and returns a structured error response.
     * 
     * @param ex Exception triggered when validation fails.
     * @return ResponseEntity containing validation errors mapped by field name.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(errors);
    }

    /**
     * Handles database constraint violations, such as unique key constraints or foreign key violations.
     * 
     * @param ex Exception triggered when database constraints are violated.
     * @return ResponseEntity with a detailed database error message.
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return ResponseEntity.badRequest().body("Database error: " + ex.getMostSpecificCause().getMessage());
    }

     /**
     * Handles all generic exceptions that are not explicitly caught by other handlers.
     * 
     * @param ex Any unhandled exception occurring in the application.
     * @return ResponseEntity with an Internal Server Error status and error details.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + ex.getMessage());
    }
}
