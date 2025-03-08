
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

        // Optional<Organisation> existingOrg =
        // organisationRepository.findById(request.getOrganisationId()); // Ensure
        // request has this field

        // Optional<Organisation> existingOrg =
        // organisationRepository.findById(request.getOrganisationId());

        // if (!existingOrg.isPresent()) {
        // Organisation newOrg = new Organisation();
        // newOrg.setOrg_name(request.getOrganisationName());
        // newOrg.setOrg_cin(request.getOrganisationCin());
        // newOrg.setOrg_owners(request.getOrganisationOwners());
        // newOrg.setProjectscompleted(request.getProjectsCompleted());

        // newOrg = organisationRepository.save(newOrg); // Save to DB
        // request.setOrganisationId(newOrg.getOrg_id()); // Set generated ID in request
        // }

        // if (existingOrg.isEmpty()) {
        // throw new IllegalArgumentException("Organisation not found with ID: " +
        // request.getOrganisationId());
        // }

        // if (existingOrg.isPresent()) {
        // // Update existing organisation
        // Organisation existing = existingOrg.get();
        // existing.setOrg_name(request.getOrganisationName());
        // existing.setOrg_cin(request.getOrganisationCin());
        // existing.setOrg_owners(request.getOrganisationOwners());
        // existing.setProjectscompleted(request.getProjectsCompleted());

        // organisationRepository.save(existing);
        // }
        // ✅ Save Organisation
        Organisation organisation = new Organisation(
                request.getOrganisationCin(),
                request.getOrganisationName(),
                request.getOrganisationOwners(),
                request.getProjectsCompleted());

        organisation = organisationRepository.save(organisation);

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
                request.getBanks());

        // Save to database
        projectDetails = projectDetailsRepository.save(projectDetails);

        // ✅ Save BHK Configurations (Only if Present)
        if (request.getOneBHKConfig() != null) {
            OneBHKConfig oneBHKConfig = request.getOneBHKConfig();
            oneBHKConfig.setProject(project);
            oneBHKConfigRepository.save(oneBHKConfig);
        }

        if (request.getTwoBHKConfig() != null) {
            TwoBHKConfig twoBHKConfig = request.getTwoBHKConfig();
            twoBHKConfig.setProject(project);
            twoBHKConfigRepository.save(twoBHKConfig);
        }

        if (request.getThreeBHKConfig() != null) {
            ThreeBHKConfig threeBHKConfig = request.getThreeBHKConfig();
            threeBHKConfig.setProject(project);
            threeBHKConfigRepository.save(threeBHKConfig);
        }

        if (request.getFourBHKConfig() != null) {
            FourBHKConfig fourBHKConfig = request.getFourBHKConfig();
            fourBHKConfig.setProject(project);
            fourBHKConfigRepository.save(fourBHKConfig);
        }

        if (request.getFiveBHKConfig() != null) {
            FiveBHKConfig fiveBHKConfig = request.getFiveBHKConfig();
            fiveBHKConfig.setProject(project);
            fiveBHKConfigRepository.save(fiveBHKConfig);
        }

        if (request.getPenthouseConfig() != null) {
            PenthouseConfig penthouseConfig = request.getPenthouseConfig();
            penthouseConfig.setProject(project);
            penthouseConfigRepository.save(penthouseConfig);
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
                response.setOrganisationName(organisation.getOrg_name());
                response.setOrganisationCin(organisation.getOrg_cin());
                response.setOrganisationOwners(organisation.getOrg_owners());
                response.setProjectsCompleted(organisation.getProjectscompleted());

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

    // ✅ Convert List<String> to JSON
    private String convertListToJson(List<String> list) {
        try {
            return list != null ? objectMapper.writeValueAsString(list) : "[]";
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting list to JSON", e);
        }
    }
}
