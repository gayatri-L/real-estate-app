
package com.example.real_estate.api.service;

import com.example.real_estate.api.model.*;
import com.example.real_estate.api.repository.*;
import com.example.real_estate.api.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional // ✅ Apply at the class level to ensure consistency

public class EntityService {

    @Autowired
    private OrganisationRepository organisationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectDetailsRepository projectDetailsRepository;

    @Autowired
    private OneBhkConfigRepository oneBHKConfigRepository;

    @Autowired
    private TwoBhkConfigRepository twoBHKConfigRepository;

    @Autowired
    private ThreeBhkConfigRepository threeBHKConfigRepository;

    @Autowired
    private FourBhkConfigRepository fourBHKConfigRepository;

    @Autowired
    private FiveBhkConfigRepository fiveBHKConfigRepository;

    @Autowired
    private PenthouseConfigRepository penthouseConfigRepository;

    // @Autowired
    // private EntityQueryService entityQueryService; // Inject EntityQueryService

    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON converter

    public void createEntity(CreateEntityRequest request) {

       System.out.println("Received Request: " + request);
        // ✅ Save Organisation
        Organisation organisation = new Organisation(
                request.getOrganisationCin(),
                request.getOrganisationName(),
                request.getOrganisationOwners(),
                request.getProjectsCompleted());

        organisation = organisationRepository.save(organisation);
        System.out.println("✅ Organisation Saved with ID: " + organisation.getOrg_Id());

        // ✅ Convert List<String> to JSON String or CSV format
        String projectImages = convertListToJson(request.getProjectImages());
        String schools = convertListToJson(request.getSchools());
        String hospitals = convertListToJson(request.getHospitals());
        String malls = convertListToJson(request.getMalls());
        String movieTheaters = convertListToJson(request.getMovieTheaters());

        // ✅ Save Project
        Project project = new Project(
                organisation,
                request.getProjectName(),
                request.getCity(),
                request.getLocality(),
                request.getAddress(),
                request.getLatitude(),
                request.getLongitude(),
                request.getPropertyAreaSqmt().intValue(), // Ensure Integer type
                request.getReraNumber(),
                request.getReraLink(),
                request.getProjectVideoLink(),
                projectImages,
                schools,
                hospitals,
                malls,
                movieTheaters,
                false // Default 'deleted' to false
        );

        project = projectRepository.save(project);
        System.out.println("✅ Project Saved with ID: " + project.getProjectId());

        // ✅ Save ProjectDetails
        ProjectDetails projectDetails = new ProjectDetails(
                project,
                request.getUnits(),
                request.getProjectStatus(),
                request.getProjectLaunch(),
                request.getProjectPlannedEnd(),
                request.getPriceMin(),
                request.getPriceMax(),
                request.getAllInclusive(),
                request.getAmenities(),
                request.getCoveredParking(),
                request.getBankApproved(),
                request.getBanks()
        );

        // Save to database
        projectDetails = projectDetailsRepository.save(projectDetails);
        System.out.println("✅ Project Details Saved with ID: " + projectDetails.getDetailId());
        // ✅ Save BHK Configurations (Only if Present)
        // if (request.getOneBHKConfig() != null) {
        //     OneBHKConfig oneBHKConfig = request.getOneBHKConfig();
        //     oneBHKConfig.setProject(project);
        //     oneBHKConfigRepository.save(oneBHKConfig);
        //     System.out.println("✅ One BHK Config Saved");
        // }

        // if (request.getOneBHKConfig() != null) {
        //     OneBHKConfig oneBHKConfig = request.getOneBHKConfig();
            
        //     // Set the Project reference
        //     oneBHKConfig.setProject(project);
        
        //     // Ensure typeNumber is set (mandatory field)
        //     if (oneBHKConfig.getTypeNumber() == null || oneBHKConfig.getTypeNumber() <= 0) {
        //         throw new IllegalArgumentException("❌ Type Number must be greater than 0");
        //     }
        
        //     // Validate and set optional fields if provided
        //     if (oneBHKConfig.getHallArea() == null) {
        //         oneBHKConfig.setHallArea("NA");  // Default if not provided
        //     }
        //     if (oneBHKConfig.getKitchenArea() == null) {
        //         oneBHKConfig.setKitchenArea("NA");
        //     }
        //     if (oneBHKConfig.getBedroom1Area() == null) {
        //         oneBHKConfig.setBedroom1Area("NA");
        //     }
        //     if (oneBHKConfig.getBathroom1Area() == null) {
        //         oneBHKConfig.setBathroom1Area("NA");
        //     }
        //     if (oneBHKConfig.getBathroom2Area() == null) {
        //         oneBHKConfig.setBathroom2Area("NA");
        //     }
        
        //     // Save to repository
        //     oneBHKConfigRepository.save(oneBHKConfig);
        //     System.out.println("✅ One BHK Config Saved Successfully");
        // }
        for (OneBHKConfig config : request.getOneBHKConfig()) {
            OneBHKConfig entity = new OneBHKConfig();
            entity.setProject(project);
            entity.setTypeNumber(config.getTypeNumber()); // Allows multiple types for 1BHK
            entity.setType1Units(config.getType1Units());
            entity.setType1Area(config.getType1Area());
            entity.setType1FloorPlan(config.getType1FloorPlan());
            entity.setType1Images(config.getType1Images());
            entity.setType1Bathrooms(config.getType1Bathrooms());
            entity.setType1Balcony(config.getType1Balcony());
            entity.setType1Parking(config.getType1Parking());
            entity.setHallArea(config.getHallArea());
            entity.setKitchenArea(config.getKitchenArea());
            entity.setBedroom1Area(config.getBedroom1Area());
            entity.setBathroom1Area(config.getBathroom1Area());
            entity.setBathroom2Area(config.getBathroom2Area());
            
            oneBHKConfigRepository.save(entity);  // Save each configuration separately
        }
        
        if (request.getTwoBHKConfig() != null) {
            TwoBHKConfig twoBHKConfig = request.getTwoBHKConfig();
            twoBHKConfig.setProject(project);
            twoBHKConfigRepository.save(twoBHKConfig);
            System.out.println("✅ Two BHK Config Saved");
        }

        if (request.getThreeBHKConfig() != null) {
            ThreeBHKConfig threeBHKConfig = request.getThreeBHKConfig();
            threeBHKConfig.setProject(project);
            threeBHKConfigRepository.save(threeBHKConfig);
            System.out.println("✅ Three BHK Config Saved");
        }

        if (request.getFourBHKConfig() != null) {
            FourBHKConfig fourBHKConfig = request.getFourBHKConfig();
            fourBHKConfig.setProject(project);
            fourBHKConfigRepository.save(fourBHKConfig);
            System.out.println("✅ Four BHK Config Saved");
        }

        if (request.getFiveBHKConfig() != null) {
            FiveBHKConfig fiveBHKConfig = request.getFiveBHKConfig();
            fiveBHKConfig.setProject(project);
            fiveBHKConfigRepository.save(fiveBHKConfig);
            System.out.println("✅ Five BHK Config Saved");
        }

        if (request.getPenthouseConfig() != null) {
            PenthouseConfig penthouseConfig = request.getPenthouseConfig();
            penthouseConfig.setProject(project);
            penthouseConfigRepository.save(penthouseConfig);
            System.out.println("✅ Penthouse Config Saved");
        }
    }

    public List<GetEntityResponse> getAllEntities() {
        List<Organisation> organisations = organisationRepository.findAll();
        List<GetEntityResponse> responseList = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");


        for (Organisation organisation : organisations) {
            List<Project> projects = projectRepository.findByOrganisation(organisation);

            for (Project project : projects) {
                // ✅ FIX: Ensure projectDetails is fetched correctly
                List<ProjectDetails> projectDetailsList = projectDetailsRepository.findByProject(project);
                ProjectDetails projectDetails = projectDetailsList.stream().findFirst().orElse(null);

                GetEntityResponse response = new GetEntityResponse();
                response.setOrganisationName(organisation.getOrg_Name());
                response.setOrganisationCin(organisation.getOrg_Cin());
                response.setOrganisationOwners(organisation.getOrg_owners());
                response.setProjectsCompleted(organisation.getProjectsCompleted());

                response.setProjectName(project.getProjectName());
                response.setCity(project.getCity());
                response.setLocality(project.getLocality());
                response.setAddress(project.getAddress());
                response.setLatitude(project.getLatitude());
                response.setLongitude(project.getLongitude());
                response.setPropertyAreaSqmt(project.getPropertyAreaSqmt());
                response.setReraNumber(project.getReraNumber());
                response.setReraLink(project.getReraLink());
                response.setProjectVideoLink(project.getProjectVideoLink());

                response.setProjectImages(Arrays.asList(project.getProjectImages().split(",")));
                response.setSchools(Arrays.asList(project.getSchools().split(",")));
                response.setHospitals(Arrays.asList(project.getHospitals().split(",")));
                response.setMalls(Arrays.asList(project.getMalls().split(",")));
                response.setMovieTheaters(Arrays.asList(project.getMovieTheaters().split(",")));

                if (projectDetails != null) {
                    response.setUnits(projectDetails.getUnits());
                    response.setProjectStatus(projectDetails.getProjectStatus());
                    response.setProjectLaunch(projectDetails.getProjectLaunch() != null
                            ? dateFormat.format(projectDetails.getProjectLaunch())
                            : null);

                    response.setProjectPlannedEnd(projectDetails.getProjectPlannedEnd() != null
                            ? dateFormat.format(projectDetails.getProjectPlannedEnd())
                            : null);
                    response.setPriceMin(projectDetails.getPriceMin());
                    response.setPriceMax(projectDetails.getPriceMax());
                    response.setAllInclusive(projectDetails.getAllInclusive());
                    response.setAmenities(projectDetails.getAmenities());
                    response.setCoveredParking(projectDetails.getCoveredParking());
                    response.setBankApproved(projectDetails.getBankApproved());
                    response.setBanks(projectDetails.getBanks());
                }

                // ✅ FIX: Ensure correct handling of list-based repository results
                List<OneBHKConfig> oneBHKConfigs = oneBHKConfigRepository.findByProject(project);
                response.setOneBHKConfig(!oneBHKConfigs.isEmpty() ? oneBHKConfigs.get(0) : null);

                List<TwoBHKConfig> twoBHKConfigs = twoBHKConfigRepository.findByProject(project);
                response.setTwoBHKConfig(!twoBHKConfigs.isEmpty() ? twoBHKConfigs.get(0) : null);

                List<ThreeBHKConfig> threeBHKConfigs = threeBHKConfigRepository.findByProject(project);
                response.setThreeBHKConfig(!threeBHKConfigs.isEmpty() ? threeBHKConfigs.get(0) : null);

                List<FourBHKConfig> fourBHKConfigs = fourBHKConfigRepository.findByProject(project);
                response.setFourBHKConfig(!fourBHKConfigs.isEmpty() ? fourBHKConfigs.get(0) : null);

                List<FiveBHKConfig> fiveBHKConfigs = fiveBHKConfigRepository.findByProject(project);
                response.setFiveBHKConfig(!fiveBHKConfigs.isEmpty() ? fiveBHKConfigs.get(0) : null);

                List<PenthouseConfig> penthouseConfigs = penthouseConfigRepository.findByProject(project);
                response.setPenthouseConfig(!penthouseConfigs.isEmpty() ? penthouseConfigs.get(0) : null);

                responseList.add(response);
            }
        }

        return responseList;
    }
    public GetEntityResponse getLatestEntity() {
        Project latestProject = projectRepository.findTopByOrderByProjectIdDesc();
        if (latestProject == null) {
            return null; // Handle case where no data exists
        }
    
        Organisation organisation = latestProject.getOrganisation();
        ProjectDetails projectDetails = projectDetailsRepository.findByProject(latestProject).stream().findFirst().orElse(null);
    
        GetEntityResponse response = new GetEntityResponse();
        response.setOrganisationName(organisation.getOrg_Name());
        response.setOrganisationCin(organisation.getOrg_Cin());
        response.setOrganisationOwners(organisation.getOrg_owners());
        response.setProjectsCompleted(organisation.getProjectsCompleted());
    
        response.setProjectName(latestProject.getProjectName());
        response.setCity(latestProject.getCity());
        response.setLocality(latestProject.getLocality());
        response.setAddress(latestProject.getAddress());
        response.setLatitude(latestProject.getLatitude());
        response.setLongitude(latestProject.getLongitude());
        response.setPropertyAreaSqmt(latestProject.getPropertyAreaSqmt());
        response.setReraNumber(latestProject.getReraNumber());
        response.setReraLink(latestProject.getReraLink());
        response.setProjectVideoLink(latestProject.getProjectVideoLink());
    
        response.setProjectImages(Arrays.asList(latestProject.getProjectImages().split(",")));
        response.setSchools(Arrays.asList(latestProject.getSchools().split(",")));
        response.setHospitals(Arrays.asList(latestProject.getHospitals().split(",")));
        response.setMalls(Arrays.asList(latestProject.getMalls().split(",")));
        response.setMovieTheaters(Arrays.asList(latestProject.getMovieTheaters().split(",")));
    
        if (projectDetails != null) {
            response.setUnits(projectDetails.getUnits());
            response.setProjectStatus(projectDetails.getProjectStatus());
            response.setProjectLaunch(projectDetails.getProjectLaunch() != null
                    ? new SimpleDateFormat("yyyy-MM-dd").format(projectDetails.getProjectLaunch())
                    : null);
            response.setProjectPlannedEnd(projectDetails.getProjectPlannedEnd() != null
                    ? new SimpleDateFormat("yyyy-MM-dd").format(projectDetails.getProjectPlannedEnd())
                    : null);
            response.setPriceMin(projectDetails.getPriceMin());
            response.setPriceMax(projectDetails.getPriceMax());
            response.setAllInclusive(projectDetails.getAllInclusive());
            response.setAmenities(projectDetails.getAmenities());
            response.setCoveredParking(projectDetails.getCoveredParking());
            response.setBankApproved(projectDetails.getBankApproved());
            response.setBanks(projectDetails.getBanks());
        }
    
        return response;
    }
    
    // ✅ Convert List<String> to JSON
    private String convertListToJson(List<String> list) {
        try {
            return list != null ? objectMapper.writeValueAsString(list) : "[]";
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting list to JSON", e);
        }
    }
}
