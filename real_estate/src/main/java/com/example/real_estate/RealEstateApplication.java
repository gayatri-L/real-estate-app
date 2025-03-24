package com.example.real_estate; // Defines the base package for the application.

import org.springframework.boot.SpringApplication; // Imports SpringApplication to bootstrap the application.
// import org.springframework.boot.SpringApplication; // (Commented out) Duplicate import removed.
import org.springframework.boot.autoconfigure.SpringBootApplication; // Imports SpringBootApplication annotation for auto-configuration.

/**
 * Entry point for the Real Estate Application.
 * This class bootstraps and launches the Spring Boot application.
 */
@SpringBootApplication // Marks this as a Spring Boot application with auto-configuration.
public class RealEstateApplication {

    /**
     * Main method that starts the Spring Boot application.
     *
     * @param args Command-line arguments passed during application startup.
     */
    public static void main(String[] args) {
        SpringApplication.run(RealEstateApplication.class, args); // Runs the application.
    }
}
