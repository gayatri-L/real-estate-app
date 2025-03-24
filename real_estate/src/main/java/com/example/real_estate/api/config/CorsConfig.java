package com.example.real_estate.api.config;  // ✅ Ensure the correct package is declared

// ✅ Import necessary Spring framework annotations and classes for configuration
import org.springframework.context.annotation.Bean; // ✅ Marks a method as a Spring Bean provider
import org.springframework.context.annotation.Configuration; // ✅ Indicates that this class contains Spring configuration settings
import org.springframework.lang.NonNull; // ✅ Ensures method parameters cannot be null, preventing potential NullPointerExceptions
import org.springframework.web.servlet.config.annotation.CorsRegistry; // ✅ Provides methods to configure Cross-Origin Resource Sharing (CORS)
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // ✅ Interface that allows customizing Spring MVC configuration

// ✅ Marks this class as a configuration class for Spring Boot
@Configuration
public class CorsConfig {
    // ✅ Defines a bean that configures CORS settings
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override   
            public void addCorsMappings(@NonNull CorsRegistry registry) {  // ✅ Add @NonNull // ✅ Override method to configure CORS
                registry.addMapping("/api/**")// ✅ Apply CORS settings to all API routes
                        .allowedOrigins("http://localhost:3000") // ✅ Allow frontend at this origin to access backend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")// ✅ Allow these HTTP methods
                        .allowedHeaders("*")// ✅ Allow all headers in requests
                        .allowCredentials(true);// ✅ Allow sending credentials like cookies or authorization headers
            }
        };
    }
}
