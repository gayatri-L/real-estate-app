// Package declaration: Defines the package where this class belongs
package com.example.real_estate;

// Importing required classes for testing
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * This is a test class for the RealEstateApplication.
 * It ensures that the application context loads correctly without errors.
 */
@SpringBootTest // This annotation tells Spring Boot to load the application context for testing
class RealEstateApplicationTests {
    
    /**
     * This test method verifies that the application context starts successfully.
     * If there are any issues with configurations, dependencies, or beans, this test will fail.
     */
    @Test // Marks this method as a test case
    void contextLoads() {  // This method is intentionally left empty.
        // If the application context fails to load, the test will automatically fail.
    }
}
