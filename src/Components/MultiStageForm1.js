import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

import {
  Button,
  Container,
  Typography,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  // TextField,
  Grid,
} from "@mui/material";
import InputField from "./InputField";
import DropdownField from "./DropdownField";
import DemoNavbar from "./DemoNavbar";
import DatePicker from "./DateController";
import CheckBox from "./CheckBoxControl";


// Step Titles
const initialSteps = [
  "Organization",
  "Project",
  "Project Details",
  "One BHK", // This will be Stage 4
  "Two BHK", // This will be Stage 5
  "Three BHK",
  "Four BHK",
  "Five BHK",
  "Review Data", // This will be Stage 6


];


const validationSchema = yup.object().shape({
  organization: yup.object({
    orgName: yup
      .string()
      .required("Organization name is required")
      .max(100, "Organization name cannot exceed 100 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    orgCIN: yup
      .string()
      .max(21, "CIN cannot exceed 21 characters")
      .matches(/^[a-zA-Z0-9]+$/, "CIN must contain only letters and numbers"),
    orgOwners: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Owner Name must contain only letters"),
    projectsCompleted: yup
      .number()
      .required("Projects Completed is required")
      .typeError("Projects Completed must be a number")
      .min(0, "Projects completed cannot be negative")
      .max(999, "Projects completed cannot exceed 999"),
  }),
  project: yup.object({
    projectname: yup
      .string()
      .max(200, "Project Name cannot exceed 100 characters")
      .required("Project Name is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    city: yup
      .string()
      .required("City is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      )
      .max(50, "City cannot exceed 50 characters"),
    locality: yup
      .string()
      .required("Locality is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      )
      .max(100, "City cannot exceed 100 characters"),
    address: yup.string().required("Address is required"),
    latitude: yup
      .number()
      .required("Latitude is required")
      .min(-90, "Latitude must be between -90 and 90") // Minimum value
      .max(90, "Latitude must be between -90 and 90"),
    longitude: yup
      .number()
      .required("Longitude is required")
      .min(-180, "Latitude must be between -180 and 180") // Minimum value
      .max(180, "Latitude must be between -180 and 180"),
    area: yup
      .number()
      .required("Area is required")
      .typeError("Area must be a number")
      .max(999, "Area cannot exceed 3 digits"),
    reranumber: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/, "CIN must contain only letters and numbers"),
    reralink: yup.string(),
    projectvideolink: yup.string(),
    projectimages: yup.string(),
    schools: yup.string(),
    hospitals: yup.string(),
    malls: yup.string(),
    movietheaters: yup.string(),
  }),
  projectDetails: yup.object({
    units: yup
      .number()
      .typeError("Units must be a number")
      .min(0, "Units cannot be negative")
      .required("Units is required"),
    projectstatus: yup
      .string()
      .required("Project Status is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    projectlaunch: yup
      .date()
      .nullable()
      .required("Project Launch Date is required"),
    ProjectPlannedEnd: yup
      .date()
      .nullable()
      .required("Project Planned End Date is required"),
    pricemin: yup
      .number()
      .typeError("Price Min must be a number")
      .min(0, "Price Min cannot be negative")
      .required("Price Min is required"),
    pricemax: yup
      .number()
      .typeError("Price Max must be a number")
      .min(0, "Price Max cannot be negative")
      .required("Price Max is required"),
    allInclusive: yup.boolean().required("All Inclusive is required"),
    amenities: yup
      .string()
      .required("Amenities is required")
      .matches(
        /^[a-zA-Z\s]+(,[a-zA-Z\s]+)*$/,
        "Organization name contains unsupported characters"
      ),
    coveredparking: yup
    .string()
    .required("Project Status is required")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Organization name contains unsupported characters"
    ),
    banckapproved: yup.boolean().required("Bank Approved is required"),
    banks: yup
      .string()
      .typeError("Banks must be a string")
      .matches(
        /^[A-Za-z\\s]+(,[A-Za-z\\s]+)*$/,
        "Organization name contains unsupported characters"
      ),
    bhk1: yup.boolean(),
    bhk2:yup.boolean(),
  }),
  oneBHKConfig: yup.object({
    type1Units: yup.string().when("bhk1", {
      is: true,
      then: yup
        .number()
        .typeError("Type 1 Units must be a Number")
        .required("Type 1 Units is required")
        .min(0, "Type 1 Units cannot be negative"),
    }),
    type1area: yup
      .number()
      .typeError("Type 1 Area must be a number")
      .min(0, "Type 1 Area cannot be negative")
      .required("Type 1 Area is required"),
    type1floorplan: yup.string(),
    type1images: yup.string(),
    type1bathrooms: yup
      .number()
      .typeError("Type 1 Bathrooms must be a number")
      .min(0, "Type 1 Bathrooms cannot be negative")
      .required("Type 1 Bathrooms is required"),
    type1balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type1parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
  }),
  newStage: yup.object({
    newStageInput: yup
      .number()
      .typeError("Units must be a number")
      .min(0, "Units cannot be negative")
      .required("Units is required"),
  }),
});


const MultiStageForm1 = () => {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({
    organization: {
      orgName: "",
      orgCIN: "",
      orgOwners: "",
      projectsCompleted: "",
    },


    project: {
      projectname: "",
      city: "Pune",
      locality: "",
      address: "",
      latitude: "",
      longitude: "",
      area: "",
      reranumber: "",
      reralink: "",
      projectvideolink: "",
      projectimages: "",
      schools: "",
      hospitals: "",
      malls: "",
      movietheater: "",
    },
    projectDetails: {
      units: "",
      allInclusive: false,
      projectstatus: "",
      projectlaunch: null,
      ProjectPlannedEnd: null,
      pricemin: "",
      pricemax: "",
      amenities: "",
      coveredparking: "",
      banckapproved: false,
      banks: "",
      deleted: false,
      bhk1: false,
    },
    oneBHKConfig: {
      type1Units: "",
      type1area: "",
      type1floorplan: "",
      type1images: "",
      type1bathrooms: "",
      type1balcony: "",
      type1parking: "",
    },


    twoBHKConfig: {
      type2Units: "",
      type2area: "",
      type2floorplan: "",
      type2images: "",
      type2bathrooms: "",
      type2balcony: "",
      type2parking: "",
    },


    threeBHKConfig: {
      type3Units: "",
      type3area: "",
      type3floorplan: "",
      type3images: "",
      type3bathrooms: "",
      type3balcony: "",
      type3parking: "",
    },
  });


  const [cachedData, setCachedData] = useState({
    organization: {},
    project: {},
    projectDetails: {},
    oneBHKConfig: {},
    twoBHKConfig: {},
  });


  const [warnings, setWarnings] = useState({});
  const [proceedToOneBHK, setProceedToOneBHK] = useState(false);
  const [proceedToNewStageInput, setProceedToNewStageInput] = useState(false);


  const handleChange = async (section, field, value) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [section]: { ...prev[section], [field]: value },
      };
      validateField(section, field, value, updatedData);
      return updatedData;
    });
  };


  const validateField = async (section, field, value, updatedData) => {
    try {
      await validationSchema.validateAt(`${section}.${field}`, updatedData);
      setWarnings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: undefined, // Clear error if valid
        },
      }));
    } catch (error) {
      setWarnings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: error.message, // Set error message
        },
      }));
    }
  };


  const nextStage = async () => {
    try {
      if (stage < 5) {
        setStage(stage + 1);
      }
    } catch (error) {
      // Handle validation errors
      const newWarnings = {};
      error.inner.forEach((err) => {
        const [section, field] = err.path.split(".");
        if (!newWarnings[section]) newWarnings[section] = {};
        newWarnings[section][field] = err.message;
      });
      setWarnings(newWarnings); // Set warnings to display error messages
    }
    // const isValid = await validateField();
    // if (isValid) {
    // Save current stage data to cache
    if (stage === 0) {
      setCachedData((prev) => ({
        ...prev,
        organization: formData.organization,
      }));
    } else if (stage === 1) {
      setCachedData((prev) => ({
        ...prev,
        project: formData.project,
      }));
    } else if (stage === 2) {
      setCachedData((prev) => ({
        ...prev,
        projectDetails: formData.projectDetails,
      }));
    } else if (stage === 3) {
      setCachedData((prev) => ({
        ...prev,
        oneBHKConfig: formData.oneBHKConfig,
      }));
    } else if (stage === 4) {
      setCachedData((prev) => ({
        ...prev,
        newStage: formData.newStage,
      }));
      // }
      console.log("Current stage data saved to cache:", cachedData);
      // Stage transition logic
      if (stage === 2) {
        if (proceedToOneBHK && proceedToNewStageInput) {
          setStage(3); // Move to One BHK Config (Stage 4)
        } else if (proceedToOneBHK) {
          setStage(3); // Move to One BHK Config (Stage 4)
        } else if (proceedToNewStageInput) {
          setStage(4); // Move to New Stage Input (Stage 5)
        } else {
          setStage(5); // Move to Review Data (Stage 6)
        }
      } else if (stage === 3) {
        if (proceedToNewStageInput) {
          setStage(4); // Move to New Stage Input (Stage 5)
        } else {
          setStage(5); // Move to Review Data (Stage 6)
        }
      } else if (stage === 4) {
        setStage(5); // Move to Review Data (Stage 6)
      } else if (stage < initialSteps.length - 1) {
        setStage(stage + 1);
      }
    }
  };


  const prevStage = () => {
    if (stage > 0) setStage(stage - 1);
  };

  // const handleSubmit = async () => {
  //   // ✅ Construct payload dynamically from formData with default values
  //   const payload = {
  //       organisationName: formData.organization?.orgName || "",
  //       organisationCin: formData.organization?.orgCIN || "",
  //       organisationOwners: formData.organization?.orgOwners || "",
  //       projectsCompleted: Number(formData.organization?.projectsCompleted) || 0,
   
  //       projectName: formData.project?.projectname || "",
  //       city: formData.project?.city || "",
  //       locality: formData.project?.locality || "",
  //       address: formData.project?.address || "",
  //       latitude: parseFloat(formData.project?.latitude) || 0,
  //       longitude: parseFloat(formData.project?.longitude) || 0,
  //       propertyAreaSqmt: parseInt(formData.project?.area) || 0,
   
  //       reraNumber: formData.project?.reranumber || "",
  //       reraLink: formData.project?.reralink || "",
  //       projectVideoLink: formData.project?.projectvideolink || "",
   
  //       projectImages: formData.project?.projectimages ? formData.project.projectimages.split(",") : [],
   
  //       schools: formData.project?.schools ? formData.project.schools.split(",") : [],
  //       hospitals: formData.project?.hospitals ? formData.project.hospitals.split(",") : [],
  //       malls: formData.project?.malls ? formData.project.malls.split(",") : [],
  //       movieTheaters: formData.project?.movietheater ? formData.project.movietheater.split(",") : [],
   
  //       units: Number(formData.projectDetails?.units) || 0,
  //       projectStatus: formData.projectDetails?.projectstatus || "",
  //       projectLaunch: formData.projectDetails?.projectlaunch || "",
  //       projectPlannedEnd: formData.projectDetails?.projectplanedend || "",
  //       priceMin: parseFloat(formData.projectDetails?.pricemin) || 0,
  //       priceMax: parseFloat(formData.projectDetails?.pricemax) || 0,
   
  //       allInclusive: formData.projectDetails?.allInclusive || "",
  //       amenities: formData.projectDetails?.amenities || "",
  //       coveredParking: formData.projectDetails?.coveredparking || "",
  //       bankApproved: formData.projectDetails?.banckapproved || "",
  //       banks: formData.projectDetails?.banks || "",
   
  //       // ✅ Handle BHK Configurations dynamically
  //       oneBHKConfig: formData.oneBHKConfig?.bhk1
  //           ? {
  //                 type1Units: Number(formData.oneBHKConfig?.type1Units) || 0,
  //                 type1Area: Number(formData.oneBHKConfig?.type1area) || 0,
  //                 type1floorplan: formData.oneBHKConfig?.type1floorplan || "",
  //                 type1images: formData.oneBHKConfig?.type1images || "",
  //                 type1Bathrooms: Number(formData.oneBHKConfig?.type1bathrooms) || 0,
  //                 type1Balcony: Number(formData.oneBHKConfig?.type1balcony) || 0,
  //                 type1Parking: Number(formData.oneBHKConfig?.type1parking) || 0,
  //             }
  //           : null,
   
  //       twoBHKConfig: formData.twoBHKConfig?.bhk2
  //           ? {
  //                 type2Units: Number(formData.twoBHKConfig?.type2Units) || 0,
  //                 type2Area: Number(formData.twoBHKConfig?.type2area) || 0,
  //                 type2floorplan: formData.twoBHKConfig?.type2floorplan || "",
  //                 type2images: formData.twoBHKConfig?.type2images || "",
  //                 type2Bathrooms: Number(formData.twoBHKConfig?.type2bathrooms) || 0,
  //                 type2Balcony: Number(formData.twoBHKConfig?.type2balcony) || 0,
  //                 type2Parking: Number(formData.twoBHKConfig?.type2parking) || 0,
  //             }
  //           : null,
   
  //       threeBHKConfig: formData.threeBHKConfig?.bhk3
  //           ? {
  //                 type3Units: Number(formData.threeBHKConfig?.type3Units) || 0,
  //                 type3Area: Number(formData.threeBHKConfig?.type3area) || 0,
  //                 type3floorplan: formData.threeBHKConfig?.type3floorplan || "",
  //                 type3images: formData.threeBHKConfig?.type3images || "",
  //                 type3Bathrooms: Number(formData.threeBHKConfig?.type3bathrooms) || 0,
  //                 type3Balcony: Number(formData.threeBHKConfig?.type3balcony) || 0,
  //                 type3Parking: Number(formData.threeBHKConfig?.type3parking) || 0,
  //             }
  //           : null,
   
  //       fourBHKConfig: formData.fourBHKConfig?.bhk4
  //           ? {
  //                 type4Units: Number(formData.fourBHKConfig?.type4Units) || 0,
  //                 type4Area: Number(formData.fourBHKConfig?.type4area) || 0,
  //                 type4floorplan: formData.fourBHKConfig?.type4floorplan || "",
  //                 type4images: formData.fourBHKConfig?.type4images || "",
  //                 type4Bathrooms: Number(formData.fourBHKConfig?.type4bathrooms) || 0,
  //                 type4Balcony: Number(formData.fourBHKConfig?.type4balcony) || 0,
  //                 type4Parking: Number(formData.fourBHKConfig?.type4parking) || 0,
  //             }
  //           : null,
   
  //       fiveBHKConfig: formData.fiveBHKConfig?.bhk5
  //           ? {
  //                 type5Units: Number(formData.fiveBHKConfig?.type5Units) || 0,
  //                 type5Area: Number(formData.fiveBHKConfig?.type5area) || 0,
  //                 type5floorplan: formData.fiveBHKConfig?.type5floorplan || "",
  //                 type5images: formData.fiveBHKConfig?.type5images || "",
  //                 type5Bathrooms: Number(formData.fiveBHKConfig?.type5bathrooms) || 0,
  //                 type5Balcony: Number(formData.fiveBHKConfig?.type5balcony) || 0,
  //                 type5Parking: Number(formData.fiveBHKConfig?.type5parking) || 0,
  //             }
  //           : null,
   
  //       penthouseConfig: formData.penthouseConfig?.penthouse
  //           ? {
  //                 typephUnits: Number(formData.penthouseConfig?.typephUnits) || 0,
  //                 typephArea: Number(formData.penthouseConfig?.typepharea) || 0,
  //                 typephBathrooms: Number(formData.penthouseConfig?.typephbathrooms) || 0,
  //                 typephBalcony: Number(formData.penthouseConfig?.typephbalcony) || 0,
  //                 typephParking: Number(formData.penthouseConfig?.typephparking) || 0,
  //             }
  //           : null,
  //   };
   
  //   console.log("Final Payload Sent to API:", JSON.stringify(payload, null, 2));
   
  //   try {
  //       const response = await axios.post(
  //           "http://localhost:8080/api/entities/create",
  //           payload,
  //           { headers: { "Content-Type": "application/json" } }
  //       );
   
  //       console.log("Server Response:", response.data);
  //       alert("Entity created successfully!");
  //   } catch (error) {
  //       console.error("Error submitting form:", error);
  //       alert("Error: " + (error.response?.data?.message || "API error occurred"));
  //   }
  // };
  const handleSubmit = async () => {
    const cleanValue = (value) => (value === "" ? null : value);

    const payload = {
        organisationName: formData.organization?.orgName || "",
        organisationCin: formData.organization?.orgCIN || "",
        organisationOwners: formData.organization?.orgOwners || "",
        projectsCompleted: Number(formData.organization?.projectsCompleted) || 0,

        projectName: formData.project?.projectname || "",
        city: formData.project?.city || "",
        locality: formData.project?.locality || "",
        address: formData.project?.address || "",
        latitude: isNaN(parseFloat(formData.project?.latitude)) ? null : parseFloat(formData.project?.latitude),
        longitude: isNaN(parseFloat(formData.project?.longitude)) ? null : parseFloat(formData.project?.longitude),
        propertyAreaSqmt: isNaN(parseInt(formData.project?.area)) ? null : parseInt(formData.project?.area),

        reraNumber: cleanValue(formData.project?.reranumber),
        reraLink: cleanValue(formData.project?.reralink),
        projectVideoLink: cleanValue(formData.project?.projectvideolink),

        projectImages: typeof formData.project?.projectimages === "string" ? formData.project.projectimages.split(",") : [],

        schools: typeof formData.project?.schools === "string" ? formData.project.schools.split(",") : [],
        hospitals: typeof formData.project?.hospitals === "string" ? formData.project.hospitals.split(",") : [],
        malls: typeof formData.project?.malls === "string" ? formData.project.malls.split(",") : [],
        movieTheaters: typeof formData.project?.movietheater === "string" ? formData.project.movietheater.split(",") : [],

        units: Number(formData.projectDetails?.units) || 0,
        projectStatus: formData.projectDetails?.projectstatus || "",
        projectLaunch: formData.projectDetails?.projectlaunch || "",
        projectPlannedEnd: formData.projectDetails?.ProjectPlannedEnd|| "",
        priceMin: isNaN(parseFloat(formData.projectDetails?.pricemin)) ? null : parseFloat(formData.projectDetails?.pricemin),
        priceMax: isNaN(parseFloat(formData.projectDetails?.pricemax)) ? null : parseFloat(formData.projectDetails?.pricemax),

        allInclusive: Boolean(formData.projectDetails?.allInclusive),
        amenities: formData.projectDetails?.amenities || "",
        coveredParking: formData.projectDetails?.coveredparking || "",
        bankApproved: Boolean(formData.projectDetails?.banckapproved || ""),
        banks: formData.projectDetails?.banks || "",

         // ✅ Handle BHK Configurations dynamically
         oneBHKConfig: formData.oneBHKConfig ? {
          type1Units: Number(formData.oneBHKConfig?.type1Units) || 0,
          type1Area: Number(formData.oneBHKConfig?.type1area) || 0,
          type1floorplan: cleanValue(formData.oneBHKConfig?.type1floorplan),
          type1images: cleanValue(formData.oneBHKConfig?.type1images),
          type1Bathrooms: Number(formData.oneBHKConfig?.type1bathrooms) || 0,
          type1Balcony: Number(formData.oneBHKConfig?.type1balcony) || 0,
          type1Parking: Number(formData.oneBHKConfig?.type1parking) || 0,
      } : null,

      // twoBHKConfig: formData.twoBHKConfig ? {
      //     type2Units: Number(formData.twoBHKConfig?.type2Units) || 0,
      //     type2Area: Number(formData.twoBHKConfig?.type2area) || 0,
      //     type2floorplan: cleanValue(formData.twoBHKConfig?.type2floorplan),
      //     type2images: cleanValue(formData.twoBHKConfig?.type2images),
      //     type2Bathrooms: Number(formData.twoBHKConfig?.type2bathrooms) || 0,
      //     type2Balcony: Number(formData.twoBHKConfig?.type2balcony) || 0,
      //     type2Parking: Number(formData.twoBHKConfig?.type2parking) || 0,
      // } : null,

      // threeBHKConfig: formData.threeBHKConfig ? {
      //     type3Units: Number(formData.threeBHKConfig?.type3Units) || 0,
      //     type3Area: Number(formData.threeBHKConfig?.type3area) || 0,
      //     type3floorplan: cleanValue(formData.threeBHKConfig?.type3floorplan),
      //     type3images: cleanValue(formData.threeBHKConfig?.type3images),
      //     type3Bathrooms: Number(formData.threeBHKConfig?.type3bathrooms) || 0,
      //     type3Balcony: Number(formData.threeBHKConfig?.type3balcony) || 0,
      //     type3Parking: Number(formData.threeBHKConfig?.type3parking) || 0,
      // } : null,

      // fourBHKConfig: formData.fourBHKConfig ? {
      //     type4Units: Number(formData.fourBHKConfig?.type4Units) || 0,
      //     type4Area: Number(formData.fourBHKConfig?.type4area) || 0,
      //     type4floorplan: cleanValue(formData.fourBHKConfig?.type4floorplan),
      //     type4images: cleanValue(formData.fourBHKConfig?.type4images),
      //     type4Bathrooms: Number(formData.fourBHKConfig?.type4bathrooms) || 0,
      //     type4Balcony: Number(formData.fourBHKConfig?.type4balcony) || 0,
      //     type4Parking: Number(formData.fourBHKConfig?.type4parking) || 0,
      // } : null,

      // fiveBHKConfig: formData.fiveBHKConfig ? {
      //     type5Units: Number(formData.fiveBHKConfig?.type5Units) || 0,
      //     type5Area: Number(formData.fiveBHKConfig?.type5area) || 0,
      //     type5floorplan: cleanValue(formData.fiveBHKConfig?.type5floorplan),
      //     type5images: cleanValue(formData.fiveBHKConfig?.type5images),
      //     type5Bathrooms: Number(formData.fiveBHKConfig?.type5bathrooms) || 0,
      //     type5Balcony: Number(formData.fiveBHKConfig?.type5balcony) || 0,
      //     type5Parking: Number(formData.fiveBHKConfig?.type5parking) || 0,
      // } : null,

      penthouseConfig: formData.penthouseConfig ? {
          typePHUnits: Number(formData.penthouseConfig?.typePHUnits) || 0,
          typePHArea: Number(formData.penthouseConfig?.typePHarea) || 0,
          typePHfloorplan: cleanValue(formData.penthouseConfig?.typePHfloorplan),
          typePHimages: cleanValue(formData.penthouseConfig?.typePHimages),
          typePHBathrooms: Number(formData.penthouseConfig?.typePHbathrooms) || 0,
          typePHBalcony: Number(formData.penthouseConfig?.typePHbalcony) || 0,
          typePHParking: Number(formData.penthouseConfig?.typePHparking) || 0,
      } : null,
    };

    console.log("Final Payload Sent to API:", JSON.stringify(payload, null, 2));

    try {
        const response = await axios.post(
            "http://localhost:8080/api/entities/create",
            payload,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Server Response:", response.data);
        alert("Entity created successfully!");
    } catch (error) {
        console.error("Error submitting form:", error);
        console.error("Response Data:", error.response?.data);
        console.error("Status Code:", error.response?.status);
        console.error("Headers:", error.response?.headers);

        alert(
            `Error: ${error.response?.data?.message || "API error occurred"} \n
             Status Code: ${error.response?.status}`
        );
    }
};

  return (
    <div>
      <DemoNavbar />
      <Container maxWidth="md" className="bg-black p-4 rounded-lg text-white">
        <LinearProgress
          variant="determinate"
          value={stage === 0 ? 0 : ((stage + 1) / initialSteps.length) * 100}
          className="w-full mb-4 h-2 sm:h-3 md:h-4 lg:h-5"
          sx={{
            backgroundColor: "grey", // Tailwind equivalent: bg-gray-300
            "& .MuiLinearProgress-bar": {
              backgroundColor: "white", // Tailwind equivalent: bg-white
            },
          }}
        />
        {/* navigation */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            {Array.from({ length: stage + 1 }, (_, i) => (
              <span
                key={i}
                className="w-8 h-8 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full bg-yellow-500 text-black flex items-center justify-center text-xs sm:text-sm md:text-base"
              >
                {i < stage ? "✔" : i + 1}
              </span>
            ))}
            <Typography
              variant="h6"
              className="text-yellow-500 text-xs sm:text-sm md:text-base"
            >
              {initialSteps[stage]}
            </Typography>
          </div>
          <div className="flex gap-2">
            {initialSteps.slice(stage + 1).map((_, index) => (
              <span
                key={index}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 text-[#f5f5f5] sm:text-xs"
              >
                {stage + index + 2}
              </span>
            ))}
          </div>
        </div>


        <div className="w-full">
          {stage === 0 && (
            <div className="flex flex-col w-2/4">
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
              />
            </div>
          )}


          {stage === 1 && (
            <div className="grid grid-cols-2 items-center">
              <InputField
                label="Project Name"
                section="project"
                field="projectname"
                value={formData.project.projectname}
                onChange={handleChange}
                error={warnings.project?.projectname}
              />
              <InputField
                label="City"
                section="project"
                field="city"
                value={formData.project.city}
                onChange={handleChange}
                error={warnings.project?.city}
              />
              <DropdownField
                label="Enter Locality"
                section="project"
                field="locality"
                value={formData.project.locality}
                onChange={handleChange}
                error={warnings.project?.locality}
                options={[
                  { label: "Hadapsar", value: "hadapsar" },
                  { label: "Kothrud", value: "kothrud" },
                  { label: "Airoli", value: "airoli" },
                ]}
              />
              <InputField
                label="Address"
                section="project"
                field="address"
                value={formData.project.address}
                onChange={handleChange}
                error={warnings.project?.address}
              />
              <InputField
                label="Latitude"
                section="project"
                field="latitude"
                value={formData.project.latitude}
                onChange={handleChange}
                error={warnings.project?.latitude}
              />
              <InputField
                label="Longitude"
                section="project"
                field="longitude"
                value={formData.project.longitude}
                onChange={handleChange}
                error={warnings.project?.longitude}
              />
              <InputField
                label="Area in sqft"
                section="project"
                field="area"
                value={formData.project.area}
                onChange={handleChange}
                error={warnings.project?.area}
              />
              <InputField
                label="Rera Number"
                section="project"
                field="reranumber"
                value={formData.project.reranumber}
                onChange={handleChange}
                error={warnings.project?.reranumber}
              />
              <InputField
                label="Rera Link"
                section="project"
                field="reralink"
                value={formData.project.reralink}
                onChange={handleChange}
                error={warnings.project?.reralink}
              />
              <InputField
                label="Project Video Link"
                section="project"
                field="projectvideolink"
                value={formData.project.projectvideolink}
                onChange={handleChange}
                error={warnings.project?.projectvideolink}
              />
              <InputField
                label="Images"
                section="project"
                field="projectimages"
                value={formData.project.projectimages}
                onChange={handleChange}
                error={warnings.project?.projectimages}
              />
              <InputField
                label="Schools"
                section="project"
                field="schools"
                value={formData.project.schools}
                onChange={handleChange}
                error={warnings.project?.schools}
              />
              <InputField
                label="Hospitals"
                section="project"
                field="hospitals"
                value={formData.project.hospitals}
                onChange={handleChange}
                error={warnings.project?.hospitals}
              />
              <InputField
                label="Malls"
                section="project"
                field="malls"
                value={formData.project.malls}
                onChange={handleChange}
                error={warnings.project?.malls}
              />
              <InputField
                label="Movie Theaters"
                section="project"
                field="movietheater"
                value={formData.project.movietheater}
                onChange={handleChange}
                error={warnings.project?.movietheater}
              />
            </div>
          )}


          {stage === 2 && (
            <div className="grid grid-cols-2 items-center">
              <InputField
                label="Units"
                section="projectDetails"
                field="units"
                value={formData.projectDetails.units}
                onChange={handleChange}
                error={warnings.projectDetails?.units}
              />
              <DropdownField
                label="Project Status"
                section="projectDetails"
                field="projectstatus"
                value={formData.projectDetails.projectstatus}
                onChange={handleChange}
                error={warnings.projectDetails?.projectstatus}
                options={[
                  { label: "pre-development", value: "pre-development" },
                  { label: "construction", value: "construction" },
                  { label: "closeout", value: "closeout" },
                ]}
              />
              {/* Project Launch Date Picker */}
              <DatePicker
                section="projectDetails"
                placeholder="Select Project Launch Date"
                field="projectlaunch"
                value={formData.projectDetails.projectlaunch}
                onChange={handleChange}
                error={warnings.projectDetails?.projectplanedend}
              />
              <DatePicker
                section="projectDetails"
                placeholder="Select Project Planned-end Date"
                field="ProjectPlannedEnd"
                value={formData.projectDetails.ProjectPlannedEnd}
                onChange={handleChange}
                error={warnings.projectDetails?.ProjectPlannedEnd}
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


              <InputField
                label="Amenities"
                section="projectDetails"
                field="amenities"
                value={formData.projectDetails.amenities}
                onChange={handleChange}
                error={warnings.projectDetails?.amenities}
              />
              <DropdownField
                label="Covered Parking"
                section="projectDetails"
                field="coveredparking"
                value={formData.projectDetails.coveredparking}
                onChange={handleChange}
                error={warnings.projectDetails?.coveredparking}
                options={[
                  { label: "Available", value: "Available" },
                  { label: "Not Available", value: "Not Available" },
                  { label: "Reserved", value: "Reserved" },
                ]}
              />
              <InputField
                label="Banks"
                section="projectDetails"
                field="banks"
                value={formData.projectDetails.banks}
                onChange={handleChange}
                error={warnings.projectDetails?.banks}
              />
              <CheckBox
                label="Bank Approved"
                section="projectDetails"
                field="bankApproved"
                checked={formData.bankApproved}
                onChange={handleChange}
                error={warnings.projectDetails?.bankApproved}
              />
              <CheckBox
                label="All Inclusive"
                section="projectDetails"
                field="allInclusive"
                checked={formData.allInclusive}
                onChange={handleChange}
              />


              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={proceedToOneBHK}
                      onChange={(e) => setProceedToOneBHK(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="1 BHK"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={proceedToNewStageInput}
                      onChange={(e) =>
                        setProceedToNewStageInput(e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label="2 BHK"
                />
              </Grid>
            </div>
          )}


          {stage === 3 && (
            <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="1 BHK Type 1 Units"
                  section="oneBHKConfig"
                  field="type1Units"
                  value={formData.oneBHKConfig.type1Units}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1Units}
                />
                <InputField
                  label="1 BHK Type Area"
                  section="oneBHKConfig"
                  field="type1area"
                  value={formData.oneBHKConfig.type1area}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1area}
                />
                <InputField
                  label="1 BHK Type Floor plan"
                  section="oneBHKConfig"
                  field="type1floorplan"
                  value={formData.oneBHKConfig.type1floorplan}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1floorplan}
                />
                <InputField
                  label="1 BHK Type Images "
                  section="oneBHKConfig"
                  field="type1images"
                  value={formData.oneBHKConfig.type1images}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1images}
                />
                <InputField
                  label="1 BHK Type Bathrooms"
                  section="oneBHKConfig"
                  field="type1bathrooms"
                  value={formData.oneBHKConfig.type1bathrooms}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1bathrooms}
                />
                <InputField
                  label="1 BHK Type Balcony"
                  section="oneBHKConfig"
                  field="type1balcony"
                  value={formData.oneBHKConfig.type1balcony}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1balcony}
                />
                <InputField
                  label="1 BHK Type Parking"
                  section="oneBHKConfig"
                  field="type1parking"
                  value={formData.oneBHKConfig.type1parking}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1parking}
                />
               
              </>
            </div>
          )}

       
          {stage === 4 && (
              <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="2 BHK Type 2 Units"
                  section="twoBHKConfig"
                  field="type2Units"
                  value={formData.twoBHKConfig.type2Units}
                  onChange={handleChange}
                  error={warnings.twpBHKConfig?.type2Units}
                />
                <InputField
                  label="2 BHK Type Area"
                  section="twoBHKConfig"
                  field="type2area"
                  value={formData.twoBHKConfig.type1area}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1area}
                />
                <InputField
                  label="2 BHK Type Floor plan"
                  section="twoBHKConfig"
                  field="type2floorplan"
                  value={formData.twoBHKConfig.type2floorplan}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2floorplan}
                />
                <InputField
                  label="2 BHK Type Images "
                  section="twoBHKConfig"
                  field="type2images"
                  value={formData.twoBHKConfig.type2images}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2images}
                />
                <InputField
                  label="2 BHK Type Bathrooms"
                  section="twoBHKConfig"
                  field="type1bathrooms"
                  value={formData.twoBHKConfig.type2bathrooms}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2bathrooms}
                />
                <InputField
                  label="2 BHK Type Balcony"
                  section="twoBHKConfig"
                  field="type2balcony"
                  value={formData.twoBHKConfig.type2balcony}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2balcony}
                />
                <InputField
                  label="1 BHK Type Parking"
                  section="twoBHKConfig"
                  field="type1parking"
                  value={formData.twoBHKConfig.type2parking}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2parking}
                />
              </>
              <Button
              onClick={handleSubmit}
              sx={{
                color: "yellow", // Set text color to yellow
                backgroundColor: "transparent", // Remove background color
                "&:hover": {
                  textDecoration: "underline", // Add underline on hover
                  backgroundColor: "transparent", // Ensure background remains transparent on hover
                },
              }}
            >
              Submit
            </Button>
            </div>

          )}


          {/* Display Cached Data on the Last Stage */}
          {stage === 5 && (
            <div className="mt-4">
              <Typography variant="h6">Review Your Data:</Typography>
              <div className="flex flex-col">
                <Typography variant="subtitle1" className="text-white">
                  Organization:
                </Typography>
                <Typography className="text-white">
                  Organization Name:{" "}
                  {cachedData.organization.orgName || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  Organization CIN:{" "}
                  {cachedData.organization.orgCIN || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  Organization Owners:{" "}
                  {cachedData.organization.orgOwners || "Not Provided"}
                </Typography>
                <Typography variant="subtitle1" className="text-white">
                  Project:
                </Typography>
                <Typography className="text-white">
                  Project Name:{" "}
                  {cachedData.project.projectname || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  City: {cachedData.project.city || "Not Provided"}
                </Typography>
                <Typography variant="subtitle1" className="text-white">
                  Project Details:
                </Typography>
                <Typography className="text-white">
                  Units: {cachedData.projectDetails.units || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  Project Status:{" "}
                  {cachedData.projectDetails.projectstatus || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  Project Launch date:{" "}
                  {cachedData.projectDetails.projectlaunch || "Not Provided"}
                </Typography>
                <Typography variant="subtitle1" className="text-white">
                  One BHK Config:
                </Typography>
                <Typography className="text-white">
                  Type 1 Units:{" "}
                  {cachedData.oneBHKConfig.type1Units || "Not Provided"}
                </Typography>
                <Typography variant="subtitle1" className="text-white">
                  New Stage Input:
                </Typography>
                <Typography className="text-white">
                  New Stage Input:{" "}
                  {cachedData.twoBHKConfig.newStageInput || "Not Provided"}
                </Typography>
              </div>
            </div>
          )}
        </div>


        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={prevStage}
            disabled={stage === 0}
            sx={{
              color: "yellow", // Set text color to yellow
              backgroundColor: "transparent", // Remove background color
              "&:hover": {
                textDecoration: "underline", // Add underline on hover
                backgroundColor: "transparent", // Ensure background remains transparent on hover
              },
            }}
          >
            Back
          </Button>
          {stage < initialSteps.length - 1 ? (
            <div>
              <Button
                onClick={nextStage}
                sx={{
                  color: "yellow", // Set text color to yellow
                  backgroundColor: "transparent", // Remove background color
                  "&:hover": {
                    textDecoration: "underline", // Add underline on hover
                    backgroundColor: "transparent", // Ensure background remains transparent on hover
                  },
                }}
              >
                Next
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleSubmit}
              sx={{
                color: "yellow", // Set text color to yellow
                backgroundColor: "transparent", // Remove background color
                "&:hover": {
                  textDecoration: "underline", // Add underline on hover
                  backgroundColor: "transparent", // Ensure background remains transparent on hover
                },
              }}
            >
              Submit
            </Button>
          )}
        </div>
      </Container>{" "}
    </div>
  );
};


export default MultiStageForm1;


