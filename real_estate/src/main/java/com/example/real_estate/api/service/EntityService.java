
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

    @Autowired
    private ProjectTimeLineRepository projectTimeLineRepository;

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
        System.out.println("✅ Organisation Saved with ID: " + organisation.getOrgId());

        // ✅ Convert List<String> to JSON String or CSV format
        // String projectImages = convertListToJson(request.getProjectImages());
        String schools = convertListToJson(request.getSchools());
        String hospitals = convertListToJson(request.getHospitals());
        String malls = convertListToJson(request.getMalls());
        String movieTheaters = convertListToJson(request.getMovieTheaters());
        String itParks= convertListToJson(request.getItParks());

        // ✅ Save Project
        Project project = new Project(
                organisation,
                request.getProjectName(),
                request.getCity(),
                request.getLocality(),
                request.getAddress(),
                request.getLatitude(),
                request.getLongitude(),
                request.getPropertyAreaSqmt()!=null ? request.getPropertyAreaSqmt().intValue():0, // Ensure Integer type
                request.getReraNumber(),
                request.getReraLink(),
                request.getProjectVideoLink(),
                request.getProjectImages(),
                schools,
                hospitals,
                malls,
                movieTheaters,
                itParks,
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


        if (request.getOneBHKConfig() != null && !request.getOneBHKConfig().isEmpty()) {
            for (OneBHKConfig config : request.getOneBHKConfig()) {
                if (config != null) { // Additional null check for safety
                    OneBHKConfig entity = new OneBHKConfig();
                    entity.setProject(project);
                    entity.setTypeNumber(config.getTypeNumber()); // Allows multiple types for 1BHK
                    entity.setType1Units(config.getType1Units());
                    entity.setType1Area(config.getType1Area());
                    entity.setType1FloorPlan(config.getType1FloorPlan() != null ? config.getType1FloorPlan() : new ArrayList<>());
                    entity.setType1Images(config.getType1Images() != null ? config.getType1Images() : new ArrayList<>());
                    entity.setType1Bathrooms(config.getType1Bathrooms());
                    entity.setType1Balcony(config.getType1Balcony());
                    entity.setType1Parking(config.getType1Parking());
                    entity.setHallArea(config.getHallArea());
                    entity.setKitchenArea(config.getKitchenArea());
                    entity.setBedroom1Area(config.getBedroom1Area());
                    entity.setBathroom1Area(config.getBathroom1Area());
                    entity.setBathroom2Area(config.getBathroom2Area());
        
                    // Save to database only if it's valid
                    entity = oneBHKConfigRepository.save(entity);
                    System.out.println("✅ One BHK Config Saved with ID: " + entity.getOneBhkConfigId()); 
                }
            }
        } else {
            System.out.println("❌ No One BHK Config found. Skipping save.");
        }

        if (request.getTwoBHKConfig() != null && !request.getTwoBHKConfig().isEmpty()) {
            for (TwoBHKConfig config : request.getTwoBHKConfig()) {
                if (config != null) { // Additional null check for safety
                    TwoBHKConfig twobhk = new TwoBHKConfig();
                    twobhk.setProject(project);
                    twobhk.setTypeNumber(config.getTypeNumber()); // Allows multiple types for 2BHK
                    twobhk.setType2Units(config.getType2Units());
                    twobhk.setType2Area(config.getType2Area());
                    twobhk.setType2FloorPlan(config.getType2FloorPlan() != null ? config.getType2FloorPlan() : new ArrayList<>());
                    twobhk.setType2Images(config.getType2Images() != null ? config.getType2Images() : new ArrayList<>());
                    twobhk.setType2Bathrooms(config.getType2Bathrooms());
                    twobhk.setType2Balcony(config.getType2Balcony());
                    twobhk.setType2Parking(config.getType2Parking());
                    twobhk.setHallArea(config.getHallArea());
                    twobhk.setKitchenArea(config.getKitchenArea());
                    twobhk.setBedroom1Area(config.getBedroom1Area());
                    twobhk.setBathroom1Area(config.getBathroom1Area());
                    twobhk.setBathroom2Area(config.getBathroom2Area()); // This line was duplicated, now fixed
        
                    // Save to database only if valid
                    twobhk = twoBHKConfigRepository.save(twobhk);
                    System.out.println("✅ Two BHK Config Saved with ID: " + twobhk.getTwoBhkConfigId());  
                }
            }
        } else {
            System.out.println("❌ No Two BHK Config found. Skipping save.");
        }
        
       
        // Save Three BHK Configurations
if (request.getThreeBHKConfig() != null && !request.getThreeBHKConfig().isEmpty()) {
    for (ThreeBHKConfig config : request.getThreeBHKConfig()) {
        if (config != null) {
            ThreeBHKConfig threebhk = new ThreeBHKConfig();
            threebhk.setProject(project);
            threebhk.setTypeNumber(config.getTypeNumber());
            threebhk.setType3Units(config.getType3Units());
            threebhk.setType3Area(config.getType3Area());
            threebhk.setType3FloorPlan(config.getType3FloorPlan() != null ? config.getType3FloorPlan() : new ArrayList<>());
            threebhk.setType3Images(config.getType3Images() != null ? config.getType3Images() : new ArrayList<>());
            threebhk.setType3Bathrooms(config.getType3Bathrooms());
            threebhk.setType3Balcony(config.getType3Balcony());
            threebhk.setType3Parking(config.getType3Parking());
            threebhk.setHallArea(config.getHallArea());
            threebhk.setKitchenArea(config.getKitchenArea());
            threebhk.setBedroom1Area(config.getBedroom1Area());
            threebhk.setBathroom1Area(config.getBathroom1Area());
            threebhk.setBathroom2Area(config.getBathroom2Area());

            threebhk = threeBHKConfigRepository.save(threebhk);
            System.out.println("✅ Three BHK Config Saved with ID: " + threebhk.getThreeBhkConfigId());
        }
    }
} else {
    System.out.println("❌ No Three BHK Config found. Skipping save.");
}

        // Save Four BHK Configurations
if (request.getFourBHKConfig() != null && !request.getFourBHKConfig().isEmpty()) {
    for (FourBHKConfig config : request.getFourBHKConfig()) {
        if (config != null) {
            FourBHKConfig fourbhk = new FourBHKConfig();
            fourbhk.setProject(project);
            fourbhk.setTypeNumber(config.getTypeNumber());
            fourbhk.setType4Units(config.getType4Units());
            fourbhk.setType4Area(config.getType4Area());
            fourbhk.setType4FloorPlan(config.getType4FloorPlan() != null ? config.getType4FloorPlan() : new ArrayList<>());
            fourbhk.setType4Images(config.getType4Images() != null ? config.getType4Images() : new ArrayList<>());
            fourbhk.setType4Bathrooms(config.getType4Bathrooms());
            fourbhk.setType4Balcony(config.getType4Balcony());
            fourbhk.setType4Parking(config.getType4Parking());
            fourbhk.setHallArea(config.getHallArea());
            fourbhk.setKitchenArea(config.getKitchenArea());
            fourbhk.setBedroom1Area(config.getBedroom1Area());
            fourbhk.setBedroom2Area(config.getBedroom2Area());
            fourbhk.setBedroom3Area(config.getBedroom3Area());
            fourbhk.setBedroom4Area(config.getBedroom4Area());
            fourbhk.setBathroom1Area(config.getBathroom1Area());
            fourbhk.setBathroom2Area(config.getBathroom2Area());
            fourbhk.setBathroom3Area(config.getBathroom3Area());
            fourbhk.setBathroom4Area(config.getBathroom4Area());

            fourbhk = fourBHKConfigRepository.save(fourbhk);
            System.out.println("✅ Four BHK Config Saved with ID: " + fourbhk.getFourBhkConfigId());
        }
    }
} else {
    System.out.println("❌ No Four BHK Config found. Skipping save.");
}

        
       
// Save Five BHK Configurations
if (request.getFiveBHKConfig() != null && !request.getFiveBHKConfig().isEmpty()) {
    for (FiveBHKConfig config : request.getFiveBHKConfig()) {
        if (config != null) {
            FiveBHKConfig fivebhk = new FiveBHKConfig();
            fivebhk.setProject(project);
            fivebhk.setTypeNumber(config.getTypeNumber());
            fivebhk.setType5Units(config.getType5Units());
            fivebhk.setType5Area(config.getType5Area());
            fivebhk.setType5FloorPlan(config.getType5FloorPlan() != null ? config.getType5FloorPlan() : new ArrayList<>());
            fivebhk.setType5Images(config.getType5Images() != null ? config.getType5Images() : new ArrayList<>());
            fivebhk.setType5Bathrooms(config.getType5Bathrooms());
            fivebhk.setType5Balcony(config.getType5Balcony());
            fivebhk.setType5Parking(config.getType5Parking());
            fivebhk.setHallArea(config.getHallArea());
            fivebhk.setKitchenArea(config.getKitchenArea());
            fivebhk.setBedroom1Area(config.getBedroom1Area());
            fivebhk.setBedroom2Area(config.getBedroom2Area());
            fivebhk.setBedroom3Area(config.getBedroom3Area());
            fivebhk.setBedroom4Area(config.getBedroom4Area());
            fivebhk.setBedroom5Area(config.getBedroom5Area());
            fivebhk.setBathroom1Area(config.getBathroom1Area());
            fivebhk.setBathroom2Area(config.getBathroom2Area());
            fivebhk.setBathroom3Area(config.getBathroom3Area());
            fivebhk.setBathroom4Area(config.getBathroom4Area());
            fivebhk.setBathroom5Area(config.getBathroom5Area());

            fivebhk = fiveBHKConfigRepository.save(fivebhk);
            System.out.println("✅ Five BHK Config Saved with ID: " + fivebhk.getFiveBhkConfigId());
        }
    }
} else {
    System.out.println("❌ No Five BHK Config found. Skipping save.");
}

// Save Penthouse Configurations
if (request.getPenthouseConfig() != null && !request.getPenthouseConfig().isEmpty()) {
    for (PenthouseConfig config : request.getPenthouseConfig()) {
        if (config != null) {
            PenthouseConfig ph = new PenthouseConfig();
            ph.setProject(project);
            ph.setTypeNumber(config.getTypeNumber());
            ph.setPenthouseUnits(config.getPenthouseUnits());
            ph.setPenthouseArea(config.getPenthouseArea());
            ph.setPenthouseFloorPlan(config.getPenthouseFloorPlan() != null ? config.getPenthouseFloorPlan() : new ArrayList<>());
            ph.setPenthouseImages(config.getPenthouseImages() != null ? config.getPenthouseImages() : new ArrayList<>());
            ph.setPenthouseBathrooms(config.getPenthouseBathrooms());
            ph.setPenthouseBalcony(config.getPenthouseBalcony());
            ph.setPenthouseParking(config.getPenthouseParking());
            ph.setHallArea(config.getHallArea());
            ph.setKitchenArea(config.getKitchenArea());
            ph.setBedroom1Area(config.getBedroom1Area());
            ph.setBedroom2Area(config.getBedroom2Area());
            ph.setBedroom3Area(config.getBedroom3Area());
            ph.setBedroom4Area(config.getBedroom4Area());
            ph.setBedroom5Area(config.getBedroom5Area());
            ph.setBedroom6Area(config.getBedroom6Area());
            ph.setBathroom1Area(config.getBathroom1Area());
            ph.setBathroom2Area(config.getBathroom2Area());
            ph.setBathroom3Area(config.getBathroom3Area());
            ph.setBathroom4Area(config.getBathroom4Area());
            ph.setBathroom5Area(config.getBathroom5Area());
            ph.setBathroom6Area(config.getBathroom6Area());

            ph = penthouseConfigRepository.save(ph);
            System.out.println("✅ Penthouse Config Saved with ID: " + ph.getPenthouseConfigId());
        }
    }
} else {
    System.out.println("❌ No Penthouse Config found. Skipping save.");
}

// Save Project Timelines
if (request.getProjectTimeline() != null && !request.getProjectTimeline().isEmpty()) {
    for (ProjectTimeLine timeline : request.getProjectTimeline()) {
        if (timeline != null) {
            ProjectTimeLine pt = new ProjectTimeLine();
            pt.setProject(project);
            pt.setMilestoneDate1(timeline.getMilestoneDate1());
            pt.setMilestoneStatus1(timeline.getMilestoneStatus1());

            pt.setMilestoneDate2(timeline.getMilestoneDate2());
            pt.setMilestoneStatus2(timeline.getMilestoneStatus2());

            pt.setMilestoneDate3(timeline.getMilestoneDate3());
            pt.setMilestoneStatus3(timeline.getMilestoneStatus3());

            pt.setMilestoneDate4(timeline.getMilestoneDate4());
            pt = projectTimeLineRepository.save(pt);
            System.out.println("✅ Project Timeline Saved with ID: " + pt.getId());
        }
    }
} else {
    System.out.println("❌ No Project Timeline found. Skipping save.");
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
                response.setOrganisationName(organisation.getOrgName());
                response.setOrganisationCin(organisation.getOrgCin());
                response.setOrganisationOwners(organisation.getOrgOwners());
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
                response.setProjectImages(project.getProjectImages());
                // response.setProjectImages(Arrays.asList(project.getProjectImages()));
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

                List<ProjectTimeLine> projectTimelines = projectTimeLineRepository.findByProject(project);
                response.setProjectTimeLine(!projectTimelines.isEmpty() ? projectTimelines.get(0):null);

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
        response.setOrganisationName(organisation.getOrgName());
        response.setOrganisationCin(organisation.getOrgCin());
        response.setOrganisationOwners(organisation.getOrgOwners());
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
        response.setProjectImages(latestProject.getProjectImages());
        // response.setProjectImages(Arrays.asList(latestProject.getProjectImages().split(",")));
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
