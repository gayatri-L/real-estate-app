// import React, { useState } from 'react';
// import { Button, Checkbox, FormControlLabel, Container, Typography, Box } from '@mui/material';
// import InputField from '../components/InputField';
// import DropdownField from '../components/DropdownField';
// import ToggleButton from '../components/ToggleButton';

// const MultiStageForm = () => {
//   const [stage, setStage] = useState(1);
//   const [formData, setFormData] = useState({
//     organization: { orgName: '', orgCIN: '', orgOwners: '', projectsCompleted: '', description: '',  orgEmail: '' },
//     project: { city: 'Pune', locality: '', address: '', projectname: '',latitude:'',longitude:'',area:'', reraNumber: '',
//       reralink:'',projectvideolink:'',projectimgaes:'',schools:'',hospitals:'', malls:'', movietheaters:''
//     },
//     projectDetails: { units: '', allInclusive: false,projectstatus:'',projectlaunch:'',projectplanedend:'',
//       pricemin:'',pricemax:'',amenities:'',coveredparking:'',banckapproved:'',banks:'',deleted:false, bhk1:false
//      },
//     oneBHKConfig: { type1Units: '', type2Units: '', type3Units: '' }
//   });

//   const [warnings, setWarnings] = useState({});

//   const handleChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: value }
//     }));
//     validateField(section, field, value);
//   };

//   const validateField = (section, field, value) => {
//     let warning = '';
//     if (typeof value === 'string' && !value.trim()) {
//       warning = `${field} cannot be empty.`;
//     }
//     setWarnings((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: warning }
//     }));
//   };

//   const nextStage = () => {
//     // Skip to stage 4 only if bhk1 is true
//     if (stage === 3 && !formData.projectDetails.bhk1) {
//       setStage(4);
//     } else {
//       stage < 4 && setStage(stage + 1);
//     }
//   };
//   const prevStage = () => stage > 1 && setStage(stage - 1);
//   const handleSubmit = () => console.log('Form Submitted:', formData);

//   return (
//     <Container maxWidth="md" style={{ backgroundColor: 'black', padding: '2rem', borderRadius: '12px', color: 'white' }}>
//       <Box display="flex">
//         <Box width="25%" paddingRight="1rem">
//           {['Organization', 'Projects', 'Project Details',  formData.projectDetails.bhk1 && 'One BHK Config'].map((item, index) => (
//             <Typography
//               key={index}
//               style={{
//                 padding: '0.5rem 1rem',
//                 borderRadius: '8px',
//                 backgroundColor: stage === index + 1 ? '#FFD700' : 'transparent',
//                 color: stage === index + 1 ? 'black' : 'white'
//               }}
//             >
//               {item}
//             </Typography>
//           ))}
//         </Box>

//         <Box flex={1}>
//           {stage === 1 && (
//             <>
//               <InputField label="Organization Name" section="organization" field="orgName" value={formData.organization.orgName} onChange={handleChange} error={warnings.organization?.orgName} type="text" maxLength={100} />
//               <InputField label="Organization CIN" section="organization" field="orgCIN" value={formData.organization.orgCIN} onChange={handleChange} error={warnings.organization?.orgCIN} maxLength={21}/>
//               <InputField label="Organization Owners" section="organization" field="orgOwners" value={formData.organization.orgOwners} onChange={handleChange} error={warnings.organization?.orgOwners} />
//               <InputField label="Projects Completed" section="organization" field="projectsCompleted" value={formData.organization.projectsCompleted} onChange={handleChange} error={warnings.organization?.projectsCompleted}  type="integer" maxLength={3}/>
//             </>
//           )}

//           {stage === 2 && (
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(2, 1fr)',
//               gap: '20px',
//               alignItems: 'center'
//             }}>
//             <>
//               <InputField label="Project Name" section="project" field="projectname" value={formData.project.projectname} onChange={handleChange} error={warnings.project?.projectname} />
//               <InputField label="City" section="project" field="city" value="Pune" error={warnings.project?.city} />
//               <DropdownField
//                 label="Enter Locality"
//                 section="project"
//                 field="locality"
//                 value={formData.project.locality}
//                 onChange={handleChange}
//                 error={warnings.project?.locality}
//                 options={[
//                   { label: 'hadpsar', value: 'hadpsar' },
//                   { label: 'kothrud', value: 'kothrud' },
//                   { label: 'aroli', value: 'aroli' }
//                 ]}
//               />

//               <InputField label="Address" section="project" field="address" value={formData.project.address} onChange={handleChange} error={warnings.project?.address} />
//               <InputField label="Latitude" section="project" field="latitude" value={formData.project.latitude} onChange={handleChange} error={warnings.project?.latitude} type="float"/>
//               <InputField label="Longitude" section="project" field="longitude" value={formData.project.longitude} onChange={handleChange} error={warnings.project?.longitude}type="float" />
//               <InputField label="Area in sqrt" section="project" field="area" value={formData.project.area} onChange={handleChange} error={warnings.project?.area} type="integer" maxLength={3}/>
//               <InputField label="Rera Number" section="project" field="reranumber" value={formData.project.reraNumber} onChange={handleChange} error={warnings.project?.reraNumber} />
//               <InputField label="Rera Link" section="project" field="reralink" value={formData.project.reralink} onChange={handleChange} error={warnings.project?.reralink} />
//               <InputField label="Project Video Link" section="project" field="projectvideolink" value={formData.project.projectvideolink} onChange={handleChange} error={warnings.project?.projectvideolink} />
//               <InputField label="Images" section="project" field="projectimages" value={formData.project.projectimgaes} onChange={handleChange} error={warnings.project?.projectimgaes} />
//               <InputField label="Schools" section="project" field="schools" value={formData.project.schools} onChange={handleChange} error={warnings.project?.schools} />
//               <InputField label="Malls" section="project" field="malls" value={formData.project.malls} onChange={handleChange} error={warnings.project?.malls} />
//               <InputField label="Movie Theaters" section="project" field="movietheater" value={formData.project.movietheaters} onChange={handleChange} error={warnings.project?.movietheaters} />
//               <ToggleButton
//       label="Deleted"
//       section="projectDetails"
//       field="deleted"
//       value={formData.projectDetails.deleted}
//       onChange={handleChange}
//     />
//             </></div>
//           )}

//           {stage === 3 && (
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(2, 1fr)',
//               gap: '20px',
//               alignItems: 'center'
//             }}>
//             <>
//               <InputField label="Units" section="projectDetails" field="units" value={formData.projectDetails.units} onChange={handleChange} error={warnings.projectDetails?.units} />
//               <InputField label="Project Status" section="projectDetails" field="projectstatus" value={formData.projectDetails.projectstatus} onChange={handleChange} error={warnings.projectDetails?.projectstatus} />
//               <InputField label="Project Launch" section="projectDetails" field="projectlaunch" value={formData.projectDetails.projectlaunch} onChange={handleChange} error={warnings.projectDetails?.projectlaunch} />
//               <InputField label="Project Status" section="projectDetails" field="projectstatus" value={formData.projectDetails.projectstatus} onChange={handleChange} error={warnings.projectDetails?.projectstatus} />
//               <InputField label="Project Planned End" section="projectDetails" field="projectplannedend" value={formData.projectDetails.projectplanedend} onChange={handleChange} error={warnings.projectDetails?.projectplanedend} />
//               <InputField label="Price Min" section="projectDetails" field="pricemin" value={formData.projectDetails.pricemin} onChange={handleChange} error={warnings.projectDetails?.pricemin} />
//               <InputField label="Price Max" section="projectDetails" field="pricemax" value={formData.projectDetails.pricemax} onChange={handleChange} error={warnings.projectDetails?.pricemax} />
//               <FormControlLabel
//   control={
//     <Checkbox
//       checked={formData.projectDetails.allInclusive}
//       onChange={(e) =>
//         handleChange('projectDetails', 'allInclusive', e.target.checked)
//       }
//       sx={{
//         color: 'gray', // Unchecked border color
//         '&.Mui-checked': {
//           color: 'white', // Checked color
//         },
//       }}
//     />
//   }
//   label="All Inclusive"
// />

//               <InputField label="Amenities" section="projectDetails" field="amenities" value={formData.projectDetails.amenities} onChange={handleChange} error={warnings.projectDetails?.amenities} />
//               <InputField label="Covered Parking" section="projectDetails" field="coveredparking" value={formData.projectDetails.coveredparking} onChange={handleChange} error={warnings.projectDetails?.coveredparking} />
//               <InputField label="Bank Approved" section="projectDetails" field="bankapproved" value={formData.projectDetails.banckapproved} onChange={handleChange} error={warnings.projectDetails?.banckapproved} />
//               <InputField label="Banks" section="projectDetails" field="banks" value={formData.projectDetails.banks} onChange={handleChange} error={warnings.projectDetails?.banks} />
//               <FormControlLabel
//   control={
//     <Checkbox
//       checked={formData.projectDetails.bhk1}
//       onChange={(e) =>
//         handleChange('projectDetails', 'bhk1', e.target.checked)
//       }
//       sx={{
//         color: 'gray', // Unchecked border color
//         '&.Mui-checked': {
//           color: 'white', // Checked color
//         },
//       }}
//     />
//   }
//   label="1 BHK Available"
// />
//             </></div>
//           )}

//           {formData.projectDetails.bhk1 && stage === 4 && (
//             <>
//               <InputField label="1 BHK Type 1 Units" section="oneBHKConfig" field="type1Units" value={formData.oneBHKConfig.type1Units} onChange={handleChange} error={warnings.oneBHKConfig?.type1Units} />
//               <InputField label="1 BHK Type 2 Units" section="oneBHKConfig" field="type2Units" value={formData.oneBHKConfig.type2Units} onChange={handleChange} error={warnings.oneBHKConfig?.type2Units} />
//               <InputField label="1 BHK Type 3 Units" section="oneBHKConfig" field="type3Units" value={formData.oneBHKConfig.type3Units} onChange={handleChange} error={warnings.oneBHKConfig?.type3Units} />
//             </>
//           )}

//           <Box mt={3} display="flex" justifyContent="center">
//             <Button onClick={prevStage} style={{ backgroundColor: 'black', color: '#808080' }} disabled={stage === 1}>
//               Back
//             </Button>
//             {stage < 4 ? (
//               <Button onClick={nextStage} style={{ backgroundColor: 'black', color: '#808080' }} disabled={stage === 3 && !formData.projectDetails.bhk1}>
//                 Next
//               </Button>
//             ) : (
//               <Button onClick={handleSubmit} style={{ backgroundColor: 'black', color: '#808080' }}>
//                 Submit
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default MultiStageForm;
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  
} from "@mui/material";
import InputField from "../components/InputField";
import DropdownField from "../components/DropdownField";
import ToggleButton from "../components/ToggleButton";

const MultiStageForm = () => {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    organization: {
      orgName: "",
      orgCIN: "",
      orgOwners: "",
      projectsCompleted: "",
      description: "",
      orgEmail: "",
    },
    project: {
      city: "Pune",
      locality: "",
      address: "",
      projectname: "",
      latitude: "",
      longitude: "",
      area: "",
      reraNumber: "",
      reralink: "",
      projectvideolink: "",
      projectimgaes: "",
      schools: "",
      hospitals: "",
      malls: "",
      movietheaters: "",
    },
    projectDetails: {
      units: "",
      allInclusive: false,
      projectstatus: "",
      projectlaunch: "",
      projectplanedend: "",
      pricemin: "",
      pricemax: "",
      amenities: "",
      coveredparking: "",
      banckapproved: "",
      banks: "",
      deleted: false,
      bhk1: false,
    },
    oneBHKConfig: { type1Units: "", type2Units: "", type3Units: "" },
  });

  const [warnings, setWarnings] = useState({});

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    validateField(section, field, value);
  };

  const validateField = (section, field, value) => {
    let warning = "";
    if (typeof value === "string" && !value.trim()) {
      warning = `${field} cannot be empty.`;
    }
    setWarnings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: warning },
    }));
  };

  const nextStage = () => {
    // Skip to stage 4 only if bhk1 is true
    if (stage === 3 && !formData.projectDetails.bhk1) {
      setStage(4);
    } else {
      stage < 4 && setStage(stage + 1);
    }
  };
  const prevStage = () => stage > 1 && setStage(stage - 1);
  const handleSubmit = () => console.log("Form Submitted:", formData);

  return (
    <Container maxWidth="md" className="bg-black p-8 rounded-lg text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 pr-4">
          {[
            "Organization",
            "Projects",
            "Project Details",
            formData.projectDetails.bhk1 && "One BHK Config",
          ].map((item, index) => (
            <Typography
              key={index}
              className={`p-2 rounded-md ${
                stage === index + 1 ? "bg-white text-black" : "text-white"
              }`}
            >
              {item}
            </Typography>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1">
          {stage === 1 && (
            <>
              <InputField
                label="Organization Name"
                section="organization"
                field="orgName"
                value={formData.organization.orgName}
                onChange={handleChange}
                error={warnings.organization?.orgName}
                type="text"
                maxLength={100}
              />
              <InputField
                label="Organization CIN"
                section="organization"
                field="orgCIN"
                value={formData.organization.orgCIN}
                onChange={handleChange}
                error={warnings.organization?.orgCIN}
                maxLength={21}
              />
              <InputField
                label="Organization Owners"
                section="organization"
                field="orgOwners"
                value={formData.organization.orgOwners}
                onChange={handleChange}
                error={warnings.organization?.orgOwners}
              />
              <InputField
                label="Projects Completed"
                section="organization"
                field="projectsCompleted"
                value={formData.organization.projectsCompleted}
                onChange={handleChange}
                error={warnings.organization?.projectsCompleted}
                type="integer"
                maxLength={3}
              />
            </>
          )}

          {stage === 2 && (
            <div className="grid grid-cols-2 gap-5 items-center">
              <>
           <InputField label="Project Name" section="project" field="projectname" value={formData.project.projectname} onChange={handleChange} error={warnings.project?.projectname} />
           <InputField label="City" section="project" field="city" value="Pune" error={warnings.project?.city} />
              <DropdownField
                label="Enter Locality"
                section="project"
                field="locality"
                value={formData.project.locality}
                onChange={handleChange}
                error={warnings.project?.locality}
                options={[
                  { label: 'hadpsar', value: 'hadpsar' },
                  { label: 'kothrud', value: 'kothrud' },
                  { label: 'aroli', value: 'aroli' }
                ]}
              />

              <InputField label="Address" section="project" field="address" value={formData.project.address} onChange={handleChange} error={warnings.project?.address} />
              <InputField label="Latitude" section="project" field="latitude" value={formData.project.latitude} onChange={handleChange} error={warnings.project?.latitude} type="float"/>
              <InputField label="Longitude" section="project" field="longitude" value={formData.project.longitude} onChange={handleChange} error={warnings.project?.longitude}type="float" />
              <InputField label="Area in sqrt" section="project" field="area" value={formData.project.area} onChange={handleChange} error={warnings.project?.area} type="integer" maxLength={3}/>
              <InputField label="Rera Number" section="project" field="reranumber" value={formData.project.reraNumber} onChange={handleChange} error={warnings.project?.reraNumber} />
              <InputField label="Rera Link" section="project" field="reralink" value={formData.project.reralink} onChange={handleChange} error={warnings.project?.reralink} />
              <InputField label="Project Video Link" section="project" field="projectvideolink" value={formData.project.projectvideolink} onChange={handleChange} error={warnings.project?.projectvideolink} />
              <InputField label="Images" section="project" field="projectimages" value={formData.project.projectimgaes} onChange={handleChange} error={warnings.project?.projectimgaes} />
              <InputField label="Schools" section="project" field="schools" value={formData.project.schools} onChange={handleChange} error={warnings.project?.schools} />
              <InputField label="Malls" section="project" field="malls" value={formData.project.malls} onChange={handleChange} error={warnings.project?.malls} />
              <InputField label="Movie Theaters" section="project" field="movietheater" value={formData.project.movietheaters} onChange={handleChange} error={warnings.project?.movietheaters} />
              <ToggleButton
      label="Deleted"
      section="projectDetails"
      field="deleted"
      value={formData.projectDetails.deleted}
      onChange={handleChange}
    />
         </> </div>)}

        {stage === 3 && (
            <div className="grid grid-cols-2 gap-5 items-center">
              <InputField
                label="Units"
                section="projectDetails"
                field="units"
                value={formData.projectDetails.units}
                onChange={handleChange}
                error={warnings.projectDetails?.units}
              />
              <InputField
                label="Project Status"
                section="projectDetails"
                field="projectstatus"
                value={formData.projectDetails.projectstatus}
                onChange={handleChange}
                error={warnings.projectDetails?.projectstatus}
              />
              <InputField
                label="Project Launch"
                section="projectDetails"
                field="projectlaunch"
                value={formData.projectDetails.projectlaunch}
                onChange={handleChange}
                error={warnings.projectDetails?.projectlaunch}
              />
              <InputField
                label="Project Status"
                section="projectDetails"
                field="projectstatus"
                value={formData.projectDetails.projectstatus}
                onChange={handleChange}
                error={warnings.projectDetails?.projectstatus}
              />
              <InputField
                label="Project Planned End"
                section="projectDetails"
                field="projectplannedend"
                value={formData.projectDetails.projectplanedend}
                onChange={handleChange}
                error={warnings.projectDetails?.projectplanedend}
              />
              <InputField
                label="Price Min"
                section="projectDetails"
                field="pricemin"
                value={formData.projectDetails.pricemin}
                onChange={handleChange}
                error={warnings.projectDetails?.pricemin}
              />
              <InputField
                label="Price Max"
                section="projectDetails"
                field="pricemax"
                value={formData.projectDetails.pricemax}
                onChange={handleChange}
                error={warnings.projectDetails?.pricemax}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.projectDetails.allInclusive}
                    onChange={(e) =>
                      handleChange(
                        "projectDetails",
                        "allInclusive",
                        e.target.checked
                      )
                    }
                    sx={{
                      color: "gray", // Unchecked border color
                      "&.Mui-checked": {
                        color: "white", // Checked color
                      },
                    }}
                  />
                }
                label="All Inclusive"
              />

              <InputField
                label="Amenities"
                section="projectDetails"
                field="amenities"
                value={formData.projectDetails.amenities}
                onChange={handleChange}
                error={warnings.projectDetails?.amenities}
              />
              <InputField
                label="Covered Parking"
                section="projectDetails"
                field="coveredparking"
                value={formData.projectDetails.coveredparking}
                onChange={handleChange}
                error={warnings.projectDetails?.coveredparking}
              />
              <InputField
                label="Bank Approved"
                section="projectDetails"
                field="bankapproved"
                value={formData.projectDetails.banckapproved}
                onChange={handleChange}
                error={warnings.projectDetails?.banckapproved}
              />
              <InputField
                label="Banks"
                section="projectDetails"
                field="banks"
                value={formData.projectDetails.banks}
                onChange={handleChange}
                error={warnings.projectDetails?.banks}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.projectDetails.bhk1}
                    onChange={(e) =>
                      handleChange("projectDetails", "bhk1", e.target.checked)
                    }
                    sx={{
                      color: "gray", // Unchecked border color
                      "&.Mui-checked": {
                        color: "white", // Checked color
                      },
                    }}
                  />
                }
                label="1 BHK Available"
              />

              <InputField
                label="Amenities"
                section="projectDetails"
                field="amenities"
                value={formData.projectDetails.amenities}
                onChange={handleChange}
                error={warnings.projectDetails?.amenities}
              />
              <InputField
                label="Covered Parking"
                section="projectDetails"
                field="coveredparking"
                value={formData.projectDetails.coveredparking}
                onChange={handleChange}
                error={warnings.projectDetails?.coveredparking}
              />
            </div>
          )}
          {formData.projectDetails.bhk1 && stage === 4 && (
            <>
              <InputField label="1 BHK Type 1 Units" section="oneBHKConfig" field="type1Units" value={formData.oneBHKConfig.type1Units} onChange={handleChange} error={warnings.oneBHKConfig?.type1Units} />
              <InputField label="1 BHK Type 2 Units" section="oneBHKConfig" field="type2Units" value={formData.oneBHKConfig.type2Units} onChange={handleChange} error={warnings.oneBHKConfig?.type2Units} />
              <InputField label="1 BHK Type 3 Units" section="oneBHKConfig" field="type3Units" value={formData.oneBHKConfig.type3Units} onChange={handleChange} error={warnings.oneBHKConfig?.type3Units} />
            </>
          )}


          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <Button
              onClick={prevStage}
              className="text-gray-300 hover:text-white transition duration-300"
              disabled={stage === 1}
            >
              Back
            </Button>
            {stage < 4 ? (
              <Button
                onClick={nextStage}
                className="text-gray-400 hover:text-white transition duration-300"
                disabled={stage === 3 && !formData.projectDetails.bhk1}
              >
                Next 
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="text-gray-400 hover:text-white transition duration-300">
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MultiStageForm;
