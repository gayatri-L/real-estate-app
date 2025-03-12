

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
  FormGroup,
} from "@mui/material";
import InputField from "../Components/InputField";
import DropdownField from "../Components/DropdownField";
import DatePicker from "../Components/DateController";
import CheckBox from "../Components/CheckBox";
import Header from "../Components/Header";
import ImageUpload from "../Components/ImageUpload";
import VideoUpload from "../Components/VideoUpload";


// Step Titles
const initialSteps = [
  "Add Organization", //stage 0
  "Add Project", //stage 1
  "Add Project Details", //stage 2
  "Add One BHK", // This will be Stage 3
  "Add Two BHK", // This will be Stage 4
  "Add Three BHK", // This will be Stage 5
  "Add Four BHK", // This will be Stage 6
  "Add Five BHK",
  "Add PentHouse", // This will be Stage 7
  "Review Details", // This will be Stage 8
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
  project: yup
    .object({
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
        .max(90, "Latitude must be between -90 and 90")
        .typeError("please enter a valid number"),
      longitude: yup
        .number()
        .required("Longitude is required")
        .typeError("please enter a valid number")
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
      movietheater: yup
        .string()
        .typeError("Please enter in letters")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Organization name contains unsupported characters"
        ),
      ITpark: yup
        .string()
        .typeError("Please enter in letters")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Organization name contains unsupported characters"
        ),
      Images: yup
        .array()


        .of(
          yup
            .mixed()
            .required("Image is required")
            .test(
              "fileType",
              "Only images are allowed",
              (file) =>
                file &&
                ["image/jpeg", "image/png", "image/webp"].includes(file.type)
            )
            .test("fileSize", "File size too large (max: 5MB)", (file) =>
              file ? file.size <= 5 * 1024 * 1024 : true
            )
        )
        .min(1, "You must upload at least 1 image")
        .max(1, "You can upload up to 5 images"),


      videos: yup
        .array()
        .of(
          yup
            .mixed()
            .required("A video is required")
            .test(
              "fileType",
              "Only video files are allowed (mp4, webm, ogg)",
              (file) =>
                file &&
                ["video/mp4", "video/webm", "video/ogg"].includes(file.type)
            )
            .test(
              "fileSize",
              "Video size must be less than 50MB",
              (file) => file && file.size <= 50 * 1024 * 1024
            )
        )
        .min(1, "At least one video is required")
        .max(1, "You can upload up to 5 videos"),
    })
    .default(() => ({ videos: [] })),


  projectDetails: yup.object({
    units: yup
      .number()
      .required("Units is required")
      .typeError("Units must be a number")
      .min(0, "Units cannot be negative"),
    projectstatus: yup
      .string()
      .required("Project Status is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    projectlaunch: yup.date().required("Project Launch Date is required"),
    ProjectPlannedEnd: yup
      .date()
      .required("Project Planned End Date is required"),
    pricemin: yup
      .number()
      .required("Price Min is required")
      .typeError("Price Min must be a number")
      .min(0, "Price Min cannot be negative"),


    pricemax: yup
      .number()
      .typeError("Price Max must be a number")
      .min(0, "Price Max cannot be negative")
      .required("Price Max is required"),
    allInclusive: yup.boolean().required("All Inclusive is required"),
    amenities: yup.string().required("Amenities is required"),
    coveredparking: yup
      .string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    bankapproved: yup.boolean().oneOf([true], "You must accept the terms."),
    banks: yup
      .string()
      .typeError("Banks must be a string")
      .matches(
        /^[A-Za-z\\s]+(,[A-Za-z\\s]+)*$/,
        "Organization name contains unsupported characters"
      ),
    // bhk1: yup.boolean(),
  }),
  oneBHKConfig: yup.object({
    type1Units: yup
      .number()
      .typeError("Type 1 Units must be a Number")
      .required("Type 1 Units is required")
      .min(0, "Type 1 Units cannot be negative"),
    type2Units: yup
      .number()
      .typeError("Type 1 Units must be a Number")
      .required("Type 1 Units is required")
      .min(0, "Type 1 Units cannot be negative"),
    type1area: yup
      .number()
      .typeError("Type 1 Area must be a number")
      .min(0, "Type 1 Area cannot be negative")
      .required("Type 1 Area is required"),
    type1floorplan: yup
      .array()
      .of(
        yup
          .mixed()
          .required("Image is required")
          .test(
            "fileType",
            "Only images are allowed",
            (file) =>
              file &&
              ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          )
          .test("fileSize", "File size too large (max: 5MB)", (file) =>
            file ? file.size <= 5 * 1024 * 1024 : true
          )
      )
      .min(1, "You must upload at least 1 image")
      .max(1, "You can upload up to 5 images"),


    type1images: yup
      .array()
      .of(
        yup
          .mixed()
          .required("Image is required")
          .test(
            "fileType",
            "Only images are allowed",
            (file) =>
              file &&
              ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          )
          .test("fileSize", "File size too large (max: 5MB)", (file) =>
            file ? file.size <= 5 * 1024 * 1024 : true
          )
      )
      .min(1, "You must upload at least 1 image")
      .max(1, "You can upload up to 5 images"),


    type1bathrooms: yup
      .number()
      .typeError("Type 1 Bathrooms must be a number")
      .min(0, "Type 1 Bathrooms cannot be negative")
      .required("Type 1 Bathrooms is required"),
    type2bathrooms: yup
      .number()
      .typeError("Type 2 Bathrooms must be a number")
      .min(0, "Type 2 Bathrooms cannot be negative")
      .required("Type 2 Bathrooms is required"),
    type1balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type2balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type1parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
    type2parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
    type1BedroomArea: yup
      .number()
      .typeError("Bedroom Area must be a number")
      .min(0, "Bedroom Area cannot be negative")
      .required("Bedroom Area is required"),
    type2BedroomArea: yup
      .number()
      .typeError("Bedroom Area must be a number")
      .min(0, "Bedroom Area cannot be negative")
      .required("Bedroom Area is required"),
    type1HallArea: yup
      .number()
      .typeError("Hall Area must be a number")
      .min(0, "Hall Area cannot be negative")
      .required("Hall Area is required"),
    type2HallArea: yup
      .number()
      .typeError("Hall Area must be a number")
      .min(0, "Hall Area cannot be negative")
      .required("Hall Area is required"),
    type1KitchenArea: yup
      .number()
      .typeError("Kitchen Area must be a number")
      .min(0, "Kitchen Area cannot be negative")
      .required("Kitchen Area is required"),
    type2KitchenArea: yup
      .number()
      .required("Kitchen Area is required")
      .typeError("Kitchen Area must be a number")
      .min(0, "Kitchen Area cannot be negative"),
  }),
  twoBHKConfig: yup.object({
    type2Units: yup
      .number()
      .required("Type 2 Units is required")
      .typeError("Type 2 Units must be a Number")
      .min(0, "Type 2 Units cannot be negative"),
    type2area: yup
      .number()
      .required("Type 2 Area is required")
      .typeError("Type 2 Area must be a number")
      .min(0, "Type 2 Area cannot be negative"),


    type2floorplan: yup.string(),
    type2images: yup.string(),
    type2bathrooms: yup
      .number()
      .typeError("Type 2 Bathrooms must be a number")
      .min(0, "Type 2 Bathrooms cannot be negative")
      .required("Type 2 Bathrooms is required"),
    type2balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type2parking: yup
      .number()
      .required("Parking is required")
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative"),
    type2Units2: yup
      .number()
      .required("Type 2 Units is required")
      .typeError("Type 2 Units must be a Number")
      .min(0, "Type 2 Units cannot be negative"),
    type2area2: yup
      .number()
      .required("Type 2 Area is required")
      .typeError("Type 2 Area must be a number")
      .min(0, "Type 2 Area cannot be negative"),


    type2floorplan2: yup.string(),
    type2images2: yup.string(),
    type2bathrooms2: yup
      .number()
      .typeError("Type 2 Bathrooms must be a number")
      .min(0, "Type 2 Bathrooms cannot be negative")
      .required("Type 2 Bathrooms is required"),
    type2balcony2: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type2parking2: yup
      .number()
      .required("Parking is required")
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative"),
  }),
  threeBHKConfig: yup.object({
    type3Units: yup
      .number()
      .typeError("Type 3 Units must be a Number")
      .required("Type 3 Units is required")
      .min(0, "Type 3 Units cannot be negative"),
    type3area: yup
      .number()
      .typeError("Type 3 Area must be a number")
      .min(0, "Type 3 Area cannot be negative")
      .required("Type 3 Area is required"),
    type3floorplan: yup.string(),
    type3images: yup.string(),
    type3bathrooms: yup
      .number()
      .typeError("Type 3 Bathrooms must be a number")
      .min(0, "Type 3 Bathrooms cannot be negative")
      .required("Type 3 Bathrooms is required"),
    type3balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type3parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
  }),
  fourBHKConfig: yup.object({
    type4Units: yup
      .number()
      .typeError("Type 4 Units must be a Number")
      .required("Type 4 Units is required")
      .min(0, "Type 4 Units cannot be negative"),
    type4area: yup
      .number()
      .typeError("Type 4 Area must be a number")
      .min(0, "Type 4 Area cannot be negative")
      .required("Type 4 Area is required"),
    type4floorplan: yup.string(),
    type4images: yup.string(),
    type4bathrooms: yup
      .number()
      .typeError("Type 4 Bathrooms must be a number")
      .min(0, "Type 4 Bathrooms cannot be negative")
      .required("Type 4 Bathrooms is required"),
    type4balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type4parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
  }),
  fiveBHKConfig: yup.object({
    type5Units: yup
      .number()
      .typeError("Type 5 Units must be a Number")
      .required("Type 5 Units is required")
      .min(0, "Type 5 Units cannot be negative"),
    type5area: yup
      .number()
      .typeError("Type 5 Area must be a number")
      .min(0, "Type 5 Area cannot be negative")
      .required("Type 5 Area is required"),
    type5floorplan: yup.string(),
    type5images: yup.string(),
    type5bathrooms: yup
      .number()
      .typeError("Type 5 Bathrooms must be a number")
      .min(0, "Type 5 Bathrooms cannot be negative")
      .required("Type 5 Bathrooms is required"),
    type5balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type5parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
  }),
 
});


const MultiStageForm = () => {
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
        Images: [],
        Videos: [],
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
        bankapproved: false,
        banks: "",
        deleted: false,
        ITpark: "",
      },
      oneBHKConfig: {
        type1Units: "",
        type1area: "",
        type1floorplan: [],
        type1images: [],
        type1BedroomArea: "",
        type1HallArea: "",
        type1KitchenArea: "",
        type1bathrooms: "",
        type1balcony: "",
        type1parking: "",
        type2Units: "",
        type2area: "",
        type2floorplan: [],
        type2images: [],
        type2BedroomArea: "",
        type2HallArea: "",
        type2KitchenArea: "",
        type2bathrooms: "",
        type2balcony: "",
        type2parking: "",
        enableconfig: false,
      },
  
  
      twoBHKConfig: {
        type2Units: "",
        type2area: "",
        type2floorplan: [],
        type2images: [],
        type2BedroomArea: "",
        type2HallArea: "",
        type2KitchenArea: "",
        type2bathrooms: "",
        type2balcony: "",
        type2parking: "",
        type2Units2: "",
        type2area2: "",
        type2floorplan2: [],
        type2images2: [],
        type2BedroomArea2: "",
        type2HallArea2: "",
        type2KitchenArea2: "",
        type2bathrooms2: "",
        type2balcony2: "",
        type2parking2: "",
        enableconfig: false,
      },
  
  
      threeBHKConfig: {
        type3Units: "",
        type3area: "",
        type3floorplan: [],
        type3images: [],
        type3BedroomArea: "",
        type3HallArea: "",
        type3KitchenArea: "",
        type3bathrooms: "",
        type3balcony: "",
        type3parking: "",
        type3Units2: "",
        type3area2: "",
        type3floorplan2: [],
        type3images2: [],
        type3BedroomArea2: "",
        type3HallArea2: "",
        type3KitchenArea2: "",
        type3bathrooms2: "",
        type3balcony2: "",
        type3parking2: "",
        enableconfig: false,
      },
      fourBHKConfig: {
        type4Units: "",
        type4area: "",
        type4floorplan: [],
        type4images: [],
        type4BedroomArea: "",
        type4HallArea: "",
        type4KitchenArea: "",
        type4bathrooms: "",
        type4balcony: "",
        type4parking: "",
        type4Units2: "",
        type4area2: "",
        type4floorplan2: [],
        type4images2: [],
        type4BedroomArea2: "",
        type4HallArea2: "",
        type4KitchenArea2: "",
        type4bathrooms2: "",
        type4balcony2: "",
        type4parking2: "",
        enableconfig: false,
      },
      
      fiveBHKConfig: {
        type5Units: "",
        type5area: "",
        type5floorplan: [],
        type5images: [],
        type5BedroomArea: "",
        type5HallArea: "",
        type5KitchenArea: "",
        type5bathrooms: "",
        type5balcony: "",
        type5parking: "",
        type5Units2: "",
        type5area2: "",
        type5floorplan2: [],
        type5images2: [],
        type5BedroomArea2: "",
        type5HallArea2: "",
        type5KitchenArea2: "",
        type5bathrooms2: "",
        type5balcony2: "",
        type5parking2: "",
        enableconfig: false,
      },    
      penthouseConfig: {
        penthouseUnits: "",
        penthouseArea: "",
        penthouseFloorPlan: [],
        penthouseBathrooms: "",
        penthouseBalcony: "",
        penthouseParking: "",
        penthouseImages: [],
        typeNumber: "",
        hallArea: "",
        kitchenArea: "",
        bedroom1Area: "",
        bedroom2Area: "",
        bedroom3Area: "",
        bedroom4Area: "",
        bedroom5Area: "",
        bedroom6Area: "",
        bathroom1Area: "",
        bathroom2Area: "",
        bathroom3Area: "",
        bathroom4Area: "",
        bathroom5Area: "",
        bathroom6Area: "",
        enableconfig: false,
      },  
    
    });
  
  
    const [cachedData, setCachedData] = useState({
      organization: {},
      project: {},
      projectDetails: {},
      oneBHKConfig: {},
      twoBHKConfig: {},
      threeBHKConfig: {},
      fourBHKConfig: {},
      fiveBHKConfig: {},
      PentHouse: {},
    });
  
  
    const [warnings, setWarnings] = useState({});
    const [proceedToOneBHK, setProceedToOneBHK] = useState(false);
    const [proceedToTwoBHK, setProceedToTwoBHK] = useState(false);
    const [proceedToThreeBHK, setProceedToThreeBHK] = useState(false);
    const [proceedToFourBHK, setProceedToFourBHK] = useState(false);
    const [proceedToFiveBHK, setProceedToFiveBHK] = useState(false);
    const [proceedToPentHouse, setProceedToPentHouse] = useState(false);
    const handleChange = (section, field, value) => {
      if (!section || !field) {
        console.error("❌ Missing parameters in handleChange:", {
          section,
          field,
        });
        return;
      }
  
  
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          [section]: {
            ...(prev[section] || {}),
            [field]:
              typeof value === "function"
                ? value(prev[section]?.[field] || [])
                : value,
          },
        };
  
  
        console.log("✅ Updated Form Data: ", updatedData);
  
  
        // Optionally trigger validation (if required)
        validateField(section, field, value, updatedData);
  
  
        return updatedData;
      });
    };
  
  
    const validateField = async (section, field, value, updatedData) => {
      try {
        // Validate the field using Yup schema
        console.log("🔍 Validating: ", { section, field, value });
        console.log("📊 Updated Data: ", updatedData);
        console.log("✅ Section:", section);
        console.log("✅ Field:", field);
        console.log("✅ Value:", value);
  
  
        await validationSchema.validateAt(`${section}.${field}`, updatedData);
  
  
        // ✅ Clear the error if validation is successful
        setWarnings((prev) => {
          const updatedWarnings = { ...prev };
          if (updatedWarnings[section]) {
            delete updatedWarnings[section][field];
            // If the section has no more errors, remove it entirely
            if (Object.keys(updatedWarnings[section]).length === 0) {
              delete updatedWarnings[section];
            }
          }
          return updatedWarnings;
        });
  
  
        return true; // ✅ Validation passed
      } catch (error) {
        // ❌ Set error message if validation fails
        setWarnings((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: error.message,
          },
        }));
  
  
        return false; // ❌ Validation failed
      }
    };
  
  
    // const nextStage = async () => {
    //   try {
    //   await validationSchema.validate(formData, { abortEarly: false });
    //    const isValid=await validateField();
    //    console.log(isValid);
    //    if(isValid){
    //     if (stage < 8) {
    //       setStage(stage + 1);
    //     }
    //    }
    //   } catch (error) {
    //     // Handle validation errors
    //     const newWarnings = {};
    //     error.inner.forEach((err) => {
    //       const [section, field] = err.path.split(".");
    //       if (!newWarnings[section]) newWarnings[section] = {};
    //       newWarnings[section][field] = err.message;
    //     });
    //     setWarnings(newWarnings); // Set warnings to display error messages
    //   }
  
  
    //   if (stage === 0) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       organization: formData.organization,
    //     }));
    //   } else if (stage === 1) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       project: formData.project,
    //     }));
    //   } else if (stage === 2) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       projectDetails: formData.projectDetails,
    //     }));
    //   } else if (stage === 3) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       oneBHKConfig: formData.oneBHKConfig,
    //     }));
    //   } else if (stage === 4) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       newStage: formData.newStage,
    //     }));
    //     // }
    //   } else if (stage === 5) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       twoBHKConfig: formData.twoBHKConfig,
    //     }));
    //   } else if (stage === 6) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       threeBHKConfig: formData.threeBHKConfig,
    //     }));
    //   } else if (stage === 7) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       fourBHKConfig: formData.fourBHKConfig,
    //     }));
    //   } else if (stage === 8) {
    //     setCachedData((prev) => ({
    //       ...prev,
    //       fiveBHKConfig: formData.fiveBHKConfig,
    //     }));
    //   }
  
  
    //   console.log("Current stage data saved to cache:", cachedData);
    //   switch (stage) {
    //     case 2: // Stage 2
    //       if (proceedToOneBHK && proceedToTwoBHK && proceedToThreeBHK && proceedToFourBHK && proceedToFiveBHK) {
    //         setStage(3); // Move to Review Data (Stage 6)
    //       } else if (proceedToOneBHK && proceedToTwoBHK) {
    //         setStage(3); // Move to One BHK Config (Stage 3)
    //       } else if (proceedToOneBHK) {
    //         setStage(3); // Move to One BHK Config (Stage 3)
    //       } else if (proceedToTwoBHK) {
    //         setStage(4); // Move to Two BHK Config (Stage 4)
    //       } else if (proceedToThreeBHK) {
    //         setStage(5); // Move to Three BHK Config (Stage 5)
    //       } else if (proceedToFourBHK) {
    //         setStage(6); // Move to Four BHK Config (Stage 6)
    //       } else if (proceedToFiveBHK) {
    //         setStage(7); // Move to Five BHK Config (Stage 7)
    //       } else {
    //         setStage(8); // Move to Review Data (Stage 8)
    //       }
    //       break;
  
  
    //     case 3: // Stage 3 (One BHK Config)
    //       if (proceedToTwoBHK) {
    //         setStage(4); // Move to Two BHK Config (Stage 4)
    //       } else if (proceedToThreeBHK) {
    //         setStage(5); // Move to Three BHK Config (Stage 5)
    //       } else if (proceedToFourBHK) {
    //         setStage(6); // Move to Four BHK Config (Stage 6)
    //       } else if (proceedToFiveBHK) {
    //         setStage(7); // Move to Five BHK Config (Stage 7)
    //       } else {
    //         setStage(8); // Move to Review Data (Stage 8)
    //       }
    //       break;
  
  
    //     case 4: // Stage 4 (Two BHK Config)
    //       if (proceedToThreeBHK) {
    //         setStage(5); // Move to Three BHK Config (Stage 5)
    //       } else if (proceedToFourBHK) {
    //         setStage(6); // Move to Four BHK Config (Stage 6)
    //       } else if (proceedToFiveBHK) {
    //         setStage(7); // Move to Five BHK Config (Stage 7)
    //       } else {
    //         setStage(8); // Move to Review Data (Stage 8)
    //       }
    //       break;
  
  
    //     case 5: // Stage 5 (Three BHK Config)
    //       if (proceedToFourBHK) {
    //         setStage(6); // Move to Four BHK Config (Stage 6)
    //       } else if (proceedToFiveBHK) {
    //         setStage(7); // Move to Five BHK Config (Stage 7)
    //       } else {
    //         setStage(8); // Move to Review Data (Stage 8)
    //       }
    //       break;
  
  
    //     case 6: // Stage 6 (Four BHK Config)
    //       if (proceedToFiveBHK) {
    //         setStage(7); // Move to Five BHK Config (Stage 7)
    //       } else {
    //         setStage(8); // Move to Review Data (Stage 8)
    //       }
    //       break;
  
  
    //     case 7: // Stage 7 (Five BHK Config)
    //       setStage(8); // Move to Review Data (Stage 8)
    //       break;
  
  
    //     default:
    //       // if (stage < initialSteps.length - 1) {
    //       //   setStage(stage + 1);
    //       // }
    //       break;
    //   }
    // };
  
  
    const nextStage = async () => {
      const isType2Enabled = formData.oneBHKConfig.enableconfig === "yes";
  
  
      try {
        // 1. Define required fields for each stage
        const requiredFields = {
          0: ["organization.orgName", "organization.projectsCompleted"],
          1: [
            "project.projectname",
            "project.city",
            "project.locality",
            "project.address",
            "project.latitude",
            "project.longitude",
            "project.area",
          ],
          2: [
            "projectDetails.units",
            "projectDetails.projectstatus",
            "projectDetails.projectlaunch",
            "projectDetails.ProjectPlannedEnd",
            "projectDetails.pricemin",
            "projectDetails.pricemax",
            "projectDetails.allInclusive",
            "projectDetails.amenities",
          ],
          3: [
            "oneBHKConfig.type1Units",
            "oneBHKConfig.type1area",
            "oneBHKConfig.type1bathrooms",
            "oneBHKConfig.type1balcony",
            "oneBHKConfig.type1parking",
            "oneBHKConfig.type1BedroomArea",
            "oneBHKConfig.type1HallArea",
            "oneBHKConfig.type1KitchenArea",
          ],
          4: [
            "twoBHKConfig.type2Units",
            "twoBHKConfig.type2area",
            "twoBHKConfig.type2bathrooms",
            "twoBHKConfig.type2balcony",
            "twoBHKConfig.type2parking",
          ],
          5: [
            "threeBHKConfig.type3Units",
            "threeBHKConfig.type3area",
            "threeBHKConfig.type3bathrooms",
            "threeBHKConfig.type3balcony",
            "threeBHKConfig.type3parking",
          ],
          6: [
            "fourBHKConfig.type4Units",
            "fourBHKConfig.type4area",
            "fourBHKConfig.type4bathrooms",
            "fourBHKConfig.type4balcony",
            "fourBHKConfig.type4parking",
          ],
          7: [
            "fiveBHKConfig.type5Units",
            "fiveBHKConfig.type5area",
            "fiveBHKConfig.type5bathrooms",
            "fiveBHKConfig.type5balcony",
            "fiveBHKConfig.type5parking",
          ],
        };
        if (isType2Enabled) {
          requiredFields[3].push(
            "oneBHKConfig.type2BedroomArea",
            "oneBHKConfig.type2HallArea",
            "oneBHKConfig.type2KitchenArea",
            "oneBHKConfig.type2BathroomArea"
          );
        }
 // 2. Validate required fields for the current stage
 const currentFields = requiredFields[stage] || [];
 const isValid = await Promise.all(
   currentFields.map(async (field) => {
     const [section, key] = field.split(".");
     return validateField(
       section,
       key,
       formData[section]?.[key],
       formData
     );
   })
 );


 // If any validation fails, stop here
 if (isValid.includes(false)) {
   console.error("❌ Validation failed, please correct the errors.");
   if (stage < initialSteps.length - 1) {
     setStage(stage + 1);
   }
   //return; // Stop navigation if any validation fails
 }


 // 3. Cache current stage data
 const cacheMap = {
   0: "organization",
   1: "project",
   2: "projectDetails",
   3: "oneBHKConfig",
   4: "twoBHKConfig",
   5: "threeBHKConfig",
   6: "fourBHKConfig",
   7: "fiveBHKConfig",
   8: "PentHouse",
 };


 if (cacheMap[stage]) {
   setCachedData((prev) => ({
     ...prev,
     [cacheMap[stage]]: formData[cacheMap[stage]],
   }));
 }


 console.log("✅ Stage data cached: ", cachedData);


 // 4. Navigate to the correct next stage based on conditions
 if (stage < Object.keys(requiredFields).length - 1) {
   setStage((prevStage) => prevStage + 1);
 } else {
   console.log("🎉 All stages completed!");
   setStage((prevStage) => prevStage + 1);
 }
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
 } else if (stage === 5) {
   setCachedData((prev) => ({
     ...prev,
     twoBHKConfig: formData.twoBHKConfig,
   }));
 } else if (stage === 6) {
   setCachedData((prev) => ({
     ...prev,
     threeBHKConfig: formData.threeBHKConfig,
   }));
 } else if (stage === 7) {
   setCachedData((prev) => ({
     ...prev,
     fourBHKConfig: formData.fourBHKConfig,
   }));
 } else if (stage === 8) {
   setCachedData((prev) => ({
     ...prev,
     fiveBHKConfig: formData.fiveBHKConfig,
   }));
 }
 switch (stage) {
   case 2: // Stage 2
     if (
       proceedToOneBHK &&
       proceedToTwoBHK &&
       proceedToThreeBHK &&
       proceedToFourBHK &&
       proceedToFiveBHK
     ) {
       setStage(3); // Move to Review Data (Stage 6)
     } else if (proceedToOneBHK && proceedToTwoBHK) {
       setStage(3); // Move to One BHK Config (Stage 3)
     } else if (proceedToOneBHK) {
       setStage(3); // Move to One BHK Config (Stage 3)
     } else if (proceedToTwoBHK) {
       setStage(4); // Move to Two BHK Config (Stage 4)
     } else if (proceedToThreeBHK) {
       setStage(5); // Move to Three BHK Config (Stage 5)
     } else if (proceedToFourBHK) {
       setStage(6); // Move to Four BHK Config (Stage 6)
     } else if (proceedToFiveBHK) {
       setStage(7); // Move to Five BHK Config (Stage 7)
     } else {
       setStage(8); // Move to Review Data (Stage 8)
     }
     break;


   case 3: // Stage 3 (One BHK Config)
     if (proceedToTwoBHK) {
       setStage(4); // Move to Two BHK Config (Stage 4)
     } else if (proceedToThreeBHK) {
       setStage(5); // Move to Three BHK Config (Stage 5)
     } else if (proceedToFourBHK) {
       setStage(6); // Move to Four BHK Config (Stage 6)
     } else if (proceedToFiveBHK) {
       setStage(7); // Move to Five BHK Config (Stage 7)
     } else {
       setStage(8); // Move to Review Data (Stage 8)
     }
     break;


   case 4: // Stage 4 (Two BHK Config)
     if (proceedToThreeBHK) {
       setStage(5); // Move to Three BHK Config (Stage 5)
     } else if (proceedToFourBHK) {
       setStage(6); // Move to Four BHK Config (Stage 6)
     } else if (proceedToFiveBHK) {
       setStage(7); // Move to Five BHK Config (Stage 7)
     } else {
       setStage(8); // Move to Review Data (Stage 8)
     }
     break;


   case 5: // Stage 5 (Three BHK Config)
     if (proceedToFourBHK) {
       setStage(6); // Move to Four BHK Config (Stage 6)
     } else if (proceedToFiveBHK) {
       setStage(7); // Move to Five BHK Config (Stage 7)
     } else {
       setStage(8); // Move to Review Data (Stage 8)
     }
     break;


   case 6: // Stage 6 (Four BHK Config)
     if (proceedToFiveBHK) {
       setStage(7); // Move to Five BHK Config (Stage 7)
     } else {
       setStage(8); // Move to Review Data (Stage 8)
     }
     break;


   case 7: // Stage 7 (Five BHK Config)
     setStage(8); // Move to Review Data (Stage 8)
     break;


   default:
     if (stage < initialSteps.length - 1) {
       setStage(stage + 1);
     }
     break;
 }
} catch (error) {
 console.error("🚨 Error in nextStage: ", error);
}
};


const prevStage = () => {
if (stage > 0) setStage(stage - 1);
};


const handleSubmit = async () => {
    const cleanValue = (value) => (value === "" ? null : value);

    // const payload = {
    //     organisationName: formData.organization?.orgName || "",
    //     organisationCin: formData.organization?.orgCIN || "",
    //     organisationOwners: formData.organization?.orgOwners || "",
    //     projectsCompleted: Number(formData.organization?.projectsCompleted) || 0,

    //     projectName: formData.project?.projectname || "",
    //     city: formData.project?.city || "",
    //     locality: formData.project?.locality || "",
    //     address: formData.project?.address || "",
    //     latitude: isNaN(parseFloat(formData.project?.latitude)) ? null : parseFloat(formData.project?.latitude),
    //     longitude: isNaN(parseFloat(formData.project?.longitude)) ? null : parseFloat(formData.project?.longitude),
    //     propertyAreaSqmt: isNaN(parseInt(formData.project?.area)) ? null : parseInt(formData.project?.area),

    //     reraNumber: cleanValue(formData.project?.reranumber),
    //     reraLink: cleanValue(formData.project?.reralink),
    //     projectVideoLink: cleanValue(formData.project?.projectvideolink),

    //     projectImages: typeof formData.project?.projectimages === "string" ? formData.project.projectimages.split(",") : [],

    //     schools: typeof formData.project?.schools === "string" ? formData.project.schools.split(",") : [],
    //     hospitals: typeof formData.project?.hospitals === "string" ? formData.project.hospitals.split(",") : [],
    //     malls: typeof formData.project?.malls === "string" ? formData.project.malls.split(",") : [],
    //     movieTheaters: typeof formData.project?.movietheater === "string" ? formData.project.movietheater.split(",") : [],

    //     units: Number(formData.projectDetails?.units) || 0,
    //     projectStatus: formData.projectDetails?.projectstatus || "",
    //     projectLaunch: formData.projectDetails?.projectlaunch || "",
    //     projectPlannedEnd: formData.projectDetails?.ProjectPlannedEnd|| "",
    //     priceMin: isNaN(parseFloat(formData.projectDetails?.pricemin)) ? null : parseFloat(formData.projectDetails?.pricemin),
    //     priceMax: isNaN(parseFloat(formData.projectDetails?.pricemax)) ? null : parseFloat(formData.projectDetails?.pricemax),

    //     allInclusive: Boolean(formData.projectDetails?.allInclusive),
    //     amenities: formData.projectDetails?.amenities || "",
    //     coveredParking: formData.projectDetails?.coveredparking || "",
    //     bankApproved: Boolean(formData.projectDetails?.banckapproved || ""),
    //     banks: formData.projectDetails?.banks || "",

    //      // ✅ Handle BHK Configurations dynamically
    //      oneBHKConfig: formData.oneBHKConfig ? {
    //       type1Units: Number(formData.oneBHKConfig?.type1Units) || 0,
    //       type1Area: Number(formData.oneBHKConfig?.type1area) || 0,
    //       type1floorplan: cleanValue(formData.oneBHKConfig?.type1floorplan),
    //       type1images: cleanValue(formData.oneBHKConfig?.type1images),
    //       type1Bathrooms: Number(formData.oneBHKConfig?.type1bathrooms) || 0,
    //       type1Balcony: Number(formData.oneBHKConfig?.type1balcony) || 0,
    //       type1Parking: Number(formData.oneBHKConfig?.type1parking) || 0,
    //   } : null,

    //   // twoBHKConfig: formData.twoBHKConfig ? {
    //   //     type2Units: Number(formData.twoBHKConfig?.type2Units) || 0,
    //   //     type2Area: Number(formData.twoBHKConfig?.type2area) || 0,
    //   //     type2floorplan: cleanValue(formData.twoBHKConfig?.type2floorplan),
    //   //     type2images: cleanValue(formData.twoBHKConfig?.type2images),
    //   //     type2Bathrooms: Number(formData.twoBHKConfig?.type2bathrooms) || 0,
    //   //     type2Balcony: Number(formData.twoBHKConfig?.type2balcony) || 0,
    //   //     type2Parking: Number(formData.twoBHKConfig?.type2parking) || 0,
    //   // } : null,

    //   // threeBHKConfig: formData.threeBHKConfig ? {
    //   //     type3Units: Number(formData.threeBHKConfig?.type3Units) || 0,
    //   //     type3Area: Number(formData.threeBHKConfig?.type3area) || 0,
    //   //     type3floorplan: cleanValue(formData.threeBHKConfig?.type3floorplan),
    //   //     type3images: cleanValue(formData.threeBHKConfig?.type3images),
    //   //     type3Bathrooms: Number(formData.threeBHKConfig?.type3bathrooms) || 0,
    //   //     type3Balcony: Number(formData.threeBHKConfig?.type3balcony) || 0,
    //   //     type3Parking: Number(formData.threeBHKConfig?.type3parking) || 0,
    //   // } : null,

    //   // fourBHKConfig: formData.fourBHKConfig ? {
    //   //     type4Units: Number(formData.fourBHKConfig?.type4Units) || 0,
    //   //     type4Area: Number(formData.fourBHKConfig?.type4area) || 0,
    //   //     type4floorplan: cleanValue(formData.fourBHKConfig?.type4floorplan),
    //   //     type4images: cleanValue(formData.fourBHKConfig?.type4images),
    //   //     type4Bathrooms: Number(formData.fourBHKConfig?.type4bathrooms) || 0,
    //   //     type4Balcony: Number(formData.fourBHKConfig?.type4balcony) || 0,
    //   //     type4Parking: Number(formData.fourBHKConfig?.type4parking) || 0,
    //   // } : null,

    //   // fiveBHKConfig: formData.fiveBHKConfig ? {
    //   //     type5Units: Number(formData.fiveBHKConfig?.type5Units) || 0,
    //   //     type5Area: Number(formData.fiveBHKConfig?.type5area) || 0,
    //   //     type5floorplan: cleanValue(formData.fiveBHKConfig?.type5floorplan),
    //   //     type5images: cleanValue(formData.fiveBHKConfig?.type5images),
    //   //     type5Bathrooms: Number(formData.fiveBHKConfig?.type5bathrooms) || 0,
    //   //     type5Balcony: Number(formData.fiveBHKConfig?.type5balcony) || 0,
    //   //     type5Parking: Number(formData.fiveBHKConfig?.type5parking) || 0,
    //   // } : null,

    //   penthouseConfig: formData.penthouseConfig ? {
    //       typePHUnits: Number(formData.penthouseConfig?.typePHUnits) || 0,
    //       typePHArea: Number(formData.penthouseConfig?.typePHarea) || 0,
    //       typePHfloorplan: cleanValue(formData.penthouseConfig?.typePHfloorplan),
    //       typePHimages: cleanValue(formData.penthouseConfig?.typePHimages),
    //       typePHBathrooms: Number(formData.penthouseConfig?.typePHbathrooms) || 0,
    //       typePHBalcony: Number(formData.penthouseConfig?.typePHbalcony) || 0,
    //       typePHParking: Number(formData.penthouseConfig?.typePHparking) || 0,
    //   } : null,
    // };
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
        projectPlannedEnd: formData.projectDetails?.ProjectPlannedEnd || "",
        priceMin: isNaN(parseFloat(formData.projectDetails?.pricemin)) ? null : parseFloat(formData.projectDetails?.pricemin),
        priceMax: isNaN(parseFloat(formData.projectDetails?.pricemax)) ? null : parseFloat(formData.projectDetails?.pricemax),
    
        allInclusive: Boolean(formData.projectDetails?.allInclusive),
        amenities: formData.projectDetails?.amenities || "",
        coveredParking: formData.projectDetails?.coveredparking || "",
        bankApproved: Boolean(formData.projectDetails?.banckapproved || ""),
        banks: formData.projectDetails?.banks || "",
    
        // oneBHKConfig: formData.oneBHKConfig?.map(config => ({
        //     typeNumber: config.typeNumber || 0,
        //     type1Units: Number(config.type1Units) || 0,
        //     type1Area: Number(config.type1area) || 0,
        //     type1FloorPlan: typeof config.type1floorplan === "string" ? config.type1floorplan.split(",") : [],
        //     type1Images: typeof config.type1images === "string" ? config.type1images.split(",") : [],
        //     type1Bathrooms: Number(config.type1bathrooms) || 0,
        //     type1Balcony: Number(config.type1balcony) || 0,
        //     type1Parking: Number(config.type1parking) || 0,
        //     hallArea: config.hallArea || "",
        //     kitchenArea: config.kitchenArea || "",
        //     bedroom1Area: config.bedroom1Area || "",
        //     bathroom1Area: config.bathroom1Area || "",
        //     bathroom2Area: config.bathroom2Area || ""
        // })) || [],
        oneBHKConfig: Array.isArray(formData.oneBHKConfig)
  ? formData.oneBHKConfig.map(config => ({
      typeNumber: config.typeNumber || 0,
      type1Units: Number(config.type1Units) || 0,
      type1Area: Number(config.type1Area) || 0,
      type1FloorPlan: typeof config.type1FloorPlan === "string" ? config.type1FloorPlan.split(",") : [],
      type1Images: typeof config.type1Images === "string" ? config.type1Images.split(",") : [],
      type1Bathrooms: Number(config.type1Bathrooms) || 0,
      type1Balcony: Number(config.type1Balcony) || 0,
      type1Parking: Number(config.type1Parking) || 0,
      hallArea: config.hallArea || "",
      kitchenArea: config.kitchenArea || "",
      bedroom1Area: config.bedroom1Area || "",
      bathroom1Area: config.bathroom1Area || "",
      bathroom2Area: config.bathroom2Area || ""
    }))
  : [],

    
        // penthouseConfig: formData.penthouseConfig?.map(config => ({
        //     typeNumber: config.typeNumber || 0,
        //     penthouseUnits: Number(config.penthouseUnits) || 0,
        //     penthouseArea: Number(config.penthouseArea) || 0,
        //     penthouseFloorPlan: typeof config.penthouseFloorPlan === "string" ? config.penthouseFloorPlan.split(",") : [],
        //     penthouseImages: typeof config.penthouseImages === "string" ? config.penthouseImages.split(",") : [],
        //     penthouseBathrooms: Number(config.penthouseBathrooms) || 0,
        //     penthouseBalcony: Number(config.penthouseBalcony) || 0,
        //     penthouseParking: Number(config.penthouseParking) || 0,
        //     hallArea: config.hallArea || "",
        //     kitchenArea: config.kitchenArea || "",
        //     bedroom1Area: config.bedroom1Area || "",
        //     bedroom2Area: config.bedroom2Area || "",
        //     bedroom3Area: config.bedroom3Area || "",
        //     bedroom4Area: config.bedroom4Area || "",
        //     bedroom5Area: config.bedroom5Area || "",
        //     bedroom6Area: config.bedroom6Area || "",
        //     bathroom1Area: config.bathroom1Area || "",
        //     bathroom2Area: config.bathroom2Area || "",
        //     bathroom3Area: config.bathroom3Area || "",
        //     bathroom4Area: config.bathroom4Area || "",
        //     bathroom5Area: config.bathroom5Area || "",
        //     bathroom6Area: config.bathroom6Area || ""
        // })) || []
    };
    
    console.log("Final Payload Sent to API:", JSON.stringify(payload, null, 2));

    try {
        const response = await axios.post(
            "http://localhost:8080/api/entities/create",
            payload,
            { headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                projectId: formData.projectId, // Ensure project ID is sent
                oneBHKConfig: formData.oneBHKConfig
              }), }
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
 <header className="bg-black text-white p-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
   <Header />
 </header>
 <Container
   maxWidth="md"
   className="bg-black p-4 rounded-lg text-white  sm:3/4"
 >
   <LinearProgress
     variant="determinate"
     value={stage === 0 ? 0 : ((stage + 1) / initialSteps.length) * 100}
     className="w-[745px] px mb-4 h-2 sm:h-3 md:h-4 lg:h-5"
     sx={{
       backgroundColor: "white", // Tailwind equivalent: bg-gray-300
       "& .MuiLinearProgress-bar": {
         backgroundColor: "#D4AF37", // Tailwind equivalent: bg-white
       },
     }}
   />
   {/* navigation */}
   <div className="flex justify-between items-center mb-5 ">
     <div className="flex items-center gap-2">
       {/* {Array.from({ length: stage + 1 }, (_, i) => (
         <span
           key={i}
           className="w-8 h-8 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full bg-yellow-500 text-black flex items-center justify-center text-xs sm:text-sm md:text-base"
         >
           {i < stage ? "✔" : i + 1}
         </span>
       ))} */}
       <Typography
         variant="h6"
         className="text-yellow-500 text-xs sm:text-sm md:text-base"
       >
         {initialSteps[stage]}
       </Typography>
     </div>
     {/* <div className="flex gap-2">
       {initialSteps.slice(stage + 1).map((_, index) => (
         <span
           key={index}
           className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 text-[#f5f5f5] sm:text-xs"
         >
           {stage + index + 2}
         </span>
       ))}
     </div> */}
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
         <InputField
           label="IT Parks"
           section="project"
           field="ITpark"
           value={formData.project.ITpark}
           onChange={handleChange}
           error={warnings.project?.ITpark}
         />
         <div>
           <ImageUpload
             handleChange={handleChange}
             section="project"
             field="Images"
             label="Upload project Images"
             limit={1}
           />


           {formData?.project?.Images?.length > 0 && (
             <div>
               <h3>Uploaded Images:</h3>
               <ul>
                 {formData.project.Images.map((file, index) => (
                   <li key={index}>{file.name}</li>
                 ))}
               </ul>
             </div>
           )}
         </div>
         <div>
           <VideoUpload
             handleChange={handleChange}
             section="project"
             field="Videos"
             label="Upload Project Videos"
             limit={2}
           />
           {formData?.project?.Videos?.length > 0 && (
             <div>
               <h3>Uploaded Videos :</h3>
               <ul>
                 {formData.project.Videos.map((file, index) => (
                   <li key={index}>{file.name}</li>
                 ))}
               </ul>
             </div>
           )}
         </div>
       </div>
     )}


     {stage === 2 && (
       <div className="grid grid-cols-2 items-center">
         <InputField
           label="Project Units"
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
             { label: "pre-development", value: "predevelopment" },
             { label: "construction", value: "construction" },
             { label: "closeout", value: "closeout" },
           ]}
         />
         {/* Project Launch Date Picker */}
         <DatePicker
           label={"Project Launch Date"}
           section="projectDetails"
           // placeholder="Select Project Launch Date"
           field="projectlaunch"
           value={formData.projectDetails.projectlaunch}
           onChange={handleChange}
           error={warnings.projectDetails?.projectlaunch}
         />
         <DatePicker
           label={"Project Planned-end Date"}
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
         <FormGroup>
           <CheckBox
             label="All Inclusive"
             section="projectDetails"
             field="allInclusive"
             checked={formData.allInclusive}
             onChange={handleChange}
             error={warnings.projectDetails?.allInclusive}
           />


           <CheckBox
             label="Bank Approved"
             section="projectDetails"
             field="bankapproved"
             checked={formData.bankapproved}
             onChange={handleChange}
             error={warnings.projectDetails?.bankapproved}
           />
           {/* Banks Input - Shown Only When Bank Approved is Checked */}
           {formData.projectDetails.bankapproved && (
             <InputField
               label="Banks"
               section="projectDetails"
               field="banks"
               value={formData.projectDetails.banks}
               onChange={handleChange}
               error={warnings.projectDetails?.banks}
             />
           )}
         </FormGroup>


         <FormGroup>
           <div className="grid grid-cols-2 items-center">
             <Grid item xs={12}>
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={proceedToOneBHK}
                     onChange={(e) => setProceedToOneBHK(e.target.checked)}
                     sx={{
                       "&.MuiSvgIcon-root": { fill: "white" },
                       color: "white",
                       "&.Mui-checked": {
                         color: "white",
                       },
                     }}
                   />
                 }
                 label="1 BHK"
               />
             </Grid>
             <Grid item xs={12}>
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={proceedToTwoBHK}
                     onChange={(e) => setProceedToTwoBHK(e.target.checked)}
                     sx={{
                       "&.MuiSvgIcon-root": { fill: "white" },
                       color: "white",
                       "&.Mui-checked": {
                         color: "white",
                       },
                     }}
                   />
                 }
                 label="2 BHK"
               />
             </Grid>
             <Grid item xs={12}>
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={proceedToThreeBHK}
                     onChange={(e) =>
                       setProceedToThreeBHK(e.target.checked)
                     }
                     sx={{
                       "&.MuiSvgIcon-root": { fill: "white" },
                       color: "white",
                       "&.Mui-checked": {
                         color: "white",
                       },
                     }}
                   />
                 }
                 label="3 BHK"
               />
             </Grid>
             <Grid item xs={12}>
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={proceedToFourBHK}
                     onChange={(e) =>
                       setProceedToFourBHK(e.target.checked)
                     }
                     sx={{
                       "&.MuiSvgIcon-root": { fill: "white" },
                       color: "white",
                       "&.Mui-checked": {
                         color: "white",
                       },
                     }}
                   />
                 }
                 label="4 BHK"
               />
             </Grid>


             <Grid item xs={12}>
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={proceedToFiveBHK}
                     onChange={(e) =>
                       setProceedToFiveBHK(e.target.checked)
                     }
                     sx={{
                       "&.MuiSvgIcon-root": { fill: "white" },
                       color: "white",
                       "&.Mui-checked": {
                         color: "white",
                       },
                     }}
                   />
                 }
                 label="5 BHK"
               />
             </Grid>
             <Grid item xs={12}>
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={proceedToPentHouse}
                     onChange={(e) =>
                       setProceedToPentHouse(e.target.checked)
                     }
                     sx={{
                       "&.MuiSvgIcon-root": {
                         fill: "white",
                         backgroundColor: "white",
                       },
                       color: "white",
                       "&.Mui-checked": {
                         color: "white",
                       },
                     }}
                   />
                 }
                 label="PentHouse"
               />
             </Grid>
           </div>
         </FormGroup>
       </div>
     )}


{stage === 3 && (
            <div className="grid grid-cols-2 items-center mb-1">
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
                  label="1 BHK Type 1 Bedroom Area"
                  section="oneBHKConfig"
                  field="type1BedroomArea"
                  value={formData.oneBHKConfig.type1BedroomArea}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1BedroomArea}
                />
                <InputField
                  label="1 BHK Type 1 Hall Area"
                  section="oneBHKConfig"
                  field="type1HallArea"
                  value={formData.oneBHKConfig.type1HallArea}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1HallArea}
                />
                <InputField
                  label="1 BHK Type 1 Kitchen Area"
                  section="oneBHKConfig"
                  field="type1KitchenArea"
                  value={formData.oneBHKConfig.type1KitchenArea}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1KitchenArea}
                />
                <InputField
                  label="1 BHK Type 1 Bathrooms"
                  section="oneBHKConfig"
                  field="type1bathrooms"
                  value={formData.oneBHKConfig.type1bathrooms}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1bathrooms}
                />
                <InputField
                  label="1 BHK Type 1 Balcony"
                  section="oneBHKConfig"
                  field="type1balcony"
                  value={formData.oneBHKConfig.type1balcony}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1balcony}
                />
                <InputField
                  label="1 BHK Type 1 Parking"
                  section="oneBHKConfig"
                  field="type1parking"
                  value={formData.oneBHKConfig.type1parking}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1parking}
                />


                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="oneBHKConfig"
                    field="type1floorplan"
                    label="Upload project Images"
                    limit={1}
                  />


                  {formData?.oneBHKConfig?.type1floorplan?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.oneBHKConfig.type1floorplan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="oneBHKConfig"
                    field="type1images"
                    label="Upload project Images"
                    limit={1}
                  />


                  {formData?.oneBHKConfig?.type1images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.oneBHKConfig.type1images.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>


                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for 1 BHK?"
                    section="oneBHKConfig"
                    field="enableconfig"
                    checked={formData.enableconfig}
                    onChange={handleChange}
                    error={warnings.projectDetails?.enableconfig}
                  />
                </div>


                {/* Conditionally Render Type 2 Fields */}
                {formData.oneBHKConfig.enableconfig && (
                  <>
                    <InputField
                      label="1 BHK Type 2 Units"
                      section="oneBHKConfig"
                      field="type2Units"
                      value={formData.oneBHKConfig.type2Units}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2Units}
                    />
                    <InputField
                      label="1 BHK Type 2 Bedroom Area"
                      section="oneBHKConfig"
                      field="type2BedroomArea"
                      value={formData.oneBHKConfig.type2BedroomArea}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2BedroomArea}
                    />
                    <InputField
                      label="1 BHK Type 2 Hall Area"
                      section="oneBHKConfig"
                      field="type2HallArea"
                      value={formData.oneBHKConfig.type2HallArea}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2HallArea}
                    />
                    <InputField
                      label="1 BHK Type 2 Kitchen Area"
                      section="oneBHKConfig"
                      field="type2KitchenArea"
                      value={formData.oneBHKConfig.type2KitchenArea}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2KitchenArea}
                    />
                    <InputField
                      label="1 BHK Type 2 Bathrooms"
                      section="oneBHKConfig"
                      field="type2bathrooms"
                      value={formData.oneBHKConfig.type2bathrooms}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2bathrooms}
                    />
                    <InputField
                      label="1 BHK Type 2 Balcony"
                      section="oneBHKConfig"
                      field="type2balcony"
                      value={formData.oneBHKConfig.type2balcony}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2balcony}
                    />
                    <InputField
                      label="1 BHK Type 2 Parking"
                      section="oneBHKConfig"
                      field="type2parking"
                      value={formData.oneBHKConfig.type2parking}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2parking}
                    />
                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="oneBHKConfig"
                        field="type2floorplan"
                        label="Upload Type 2 Floorplan"
                        limit={1}
                      />
                      {formData?.oneBHKConfig?.type2floorplan?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.oneBHKConfig.type2floorplan.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>


                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="oneBHKConfig"
                        field="type2images"
                        label="Upload Type 2 Images"
                        limit={1}
                      />
                      {formData?.oneBHKConfig?.type2images?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.oneBHKConfig.type2images.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>{" "}
            </div>
          )}


          {stage === 4 && (
            <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="2 BHK Type Units"
                  section="twoBHKConfig"
                  field="type2Units"
                  value={formData.twoBHKConfig.type2Units}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2Units}
                />
                <InputField
                  label="2 BHK Type Area"
                  section="twoBHKConfig"
                  field="type2area"
                  value={formData.twoBHKConfig.type2area}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2area}
                />
                <InputField
                  label="2 BHK Type Bedroom area"
                  section="twoBHKConfig"
                  field="type2BedroomArea"
                  value={formData.twoBHKConfig.type2BedroomArea}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2BedroomArea}
                />
                <InputField
                  label="2 BHK Type Hall area"
                  section="twoBHKConfig"
                  field="type2HallArea"
                  value={formData.twoBHKConfig.type2HallArea}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2HallArea}
                />
                <InputField
                  label="2 BHK Type kitchen area "
                  section="twoBHKConfig"
                  field="type2KitchenArea"
                  value={formData.twoBHKConfig.type2KitchenArea}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2KitchenArea}
                />
                <InputField
                  label="2 BHK Type Bathrooms"
                  section="twoBHKConfig"
                  field="type2bathrooms"
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
                  label="2 BHK Type Parking"
                  section="twoBHKConfig"
                  field="type2parking"
                  value={formData.twoBHKConfig.type2parking}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2parking}
                />
                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="twoBHKConfig"
                    field="type2floorplan"
                    label="Upload Type 2 Floorplan"
                    limit={1}
                  />
                  {formData?.twoBHKConfig?.type2floorplan?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.twoBHKConfig.type2floorplan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>


                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="twoBHKConfig"
                    field="type2images"
                    label="Upload Type 2 Images"
                    limit={1}
                  />
                  {formData?.twoBHKConfig?.type2images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.twoBHKConfig.type2images.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>


                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for 1 BHK?"
                    section="twoBHKConfig"
                    field="enableconfig"
                    checked={formData.enableconfig}
                    onChange={handleChange}
                    error={warnings.twoBHKConfig?.enableconfig}
                  />
                </div>


                {/* Conditionally Render Type 2 Fields */}
                {formData.twoBHKConfig.enableconfig && (
                  <>
                    <InputField
                      label="2 BHK Type 2 Units"
                      section="twoBHKConfig"
                      field="type2Units2"
                      value={formData.oneBHKConfig.type2Units2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2Units2}
                    />
                    <InputField
                      label="2 BHK Type Area"
                      section="twoBHKConfig"
                      field="type2area2"
                      value={formData.twoBHKConfig.type2area2}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2area2}
                    />
                    <InputField
                      label="2 BHK Type 2 Bedroom Area"
                      section="twoBHKConfig"
                      field="type2BedroomArea"
                      value={formData.twoBHKConfig.type2BedroomArea2}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2BedroomArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Hall Area"
                      section="twoBHKConfig"
                      field="type2HallArea"
                      value={formData.twoBHKConfig.type2HallArea2}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2HallArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Kitchen Area"
                      section="twoBHKConfig"
                      field="type2KitchenArea"
                      value={formData.oneBHKConfig.type2KitchenArea2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2KitchenArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Bathrooms"
                      section="twoBHKConfig"
                      field="type2bathrooms"
                      value={formData.oneBHKConfig.type2bathrooms2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2bathrooms2}
                    />
                    <InputField
                      label="2 BHK Type 2 Balcony"
                      section="twoBHKConfig"
                      field="type2balcony"
                      value={formData.oneBHKConfig.type2balcony2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2balcony2}
                    />
                    <InputField
                      label="2 BHK Type 2 Parking"
                      section="twoBHKConfig"
                      field="type2parking"
                      value={formData.oneBHKConfig.type2parking2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2parking2}
                    />
                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="twoBHKConfig"
                        field="type2floorplan2"
                        label="Upload Type 2 Floorplan"
                        limit={1}
                      />
                      {formData?.twoBHKConfig?.type2floorplan2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.twoBHKConfig.type2floorplan2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>


                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="twoBHKConfig"
                        field="type2images2"
                        label="Upload Type 2 Images"
                        limit={1}
                      />
                      {formData?.twoBHKConfig?.type2images2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.twoBHKConfig.type2images2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            </div>
          )}


          {stage === 5 && (
            <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="3 BHK Type 3 Units"
                  section="threeBHKConfig"
                  field="type3Units"
                  value={formData.threeBHKConfig.type3Units}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3Units}
                />
                <InputField
                  label="3 BHK Type Area"
                  section="threeBHKConfig"
                  field="type3area"
                  value={formData.threeBHKConfig.type3area}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3area}
                />
               
                <InputField
                  label="3 BHK Type Bedroom area"
                  section="threeBHKConfig"
                  field="type3BedroomArea"
                  value={formData.threeBHKConfig.type3BedroomArea}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3BedroomArea}
                />
                <InputField
                  label="3 BHK Type Hall area"
                  section="threeBHKConfig"
                  field="type3HallArea"
                  value={formData.threeBHKConfig.type3HallArea}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3HallArea}
                />
                <InputField
                  label="3 BHK Type kitchen area "
                  section="threeBHKConfig"
                  field="type3KitchenArea"
                  value={formData.threeBHKConfig.type3KitchenArea}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3KitchenArea}
                />
                <InputField
                  label="3 BHK Type Bathrooms"
                  section="threeBHKConfig"
                  field="type3bathrooms"
                  value={formData.threeBHKConfig.type3bathrooms}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3bathrooms}
                />
                <InputField
                  label="3 BHK Type Balcony"
                  section="threeBHKConfig"
                  field="type3balcony"
                  value={formData.threeBHKConfig.type3balcony}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3balcony}
                />
                <InputField
                  label="3 BHK Type Parking"
                  section="threeBHKConfig"
                  field="type3parking"
                  value={formData.threeBHKConfig.type3parking}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3parking}
                />
                 <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="threeBHKConfig"
                    field="type3floorplan"
                    label="Upload Type 3 Floorplan"
                    limit={1}
                  />
                  {formData?.threeBHKConfig?.type3floorplan?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.threeBHKConfig.type3floorplan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>




                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="threeBHKConfig"
                    field="type3images"
                    label="Upload Type 2 Images"
                    limit={1}
                  />
                  {formData?.threeBHKConfig?.type3images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.threeBHKConfig.type3images.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>


                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for 3 BHK?"
                    section="threeBHKConfig"
                    field="enableconfig"
                    checked={formData.enableconfig}
                    onChange={handleChange}
                    error={warnings.threeBHKConfig?.enableconfig}
                  />
                </div>


                {formData.threeBHKConfig.enableconfig && (
                  <>
                    <InputField
                      label="3 BHK Type 2 Units"
                      section="threeBHKConfig"
                      field="type3Units2"
                      value={formData.threeBHKConfig.type3Units2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3Units2}
                    />
                    <InputField
                      label="2 BHK Type Area"
                      section="threeBHKConfig"
                      field="type3area2"
                      value={formData.threeBHKConfig.type3area2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3area2}
                    />
                    <InputField
                      label="2 BHK Type 2 Bedroom Area"
                      section="threeBHKConfig"
                      field="type2BedroomArea"
                      value={formData.threeBHKConfig.type3BedroomArea2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3BedroomArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Hall Area"
                      section="threeBHKConfig"
                      field="type2HallArea"
                      value={formData.threeBHKConfig.type3HallArea2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3HallArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Kitchen Area"
                      section="threeBHKConfig"
                      field="type2KitchenArea"
                      value={formData.threeBHKConfig.type3KitchenArea2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3KitchenArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Bathrooms"
                      section="threeBHKConfig"
                      field="type2bathrooms"
                      value={formData.threeBHKConfig.type3bathrooms2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3bathrooms2}
                    />
                    <InputField
                      label="2 BHK Type 2 Balcony"
                      section="threeBHKConfig"
                      field="type2balcony"
                      value={formData.threeBHKConfig.type3balcony2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3balcony2}
                    />
                    <InputField
                      label="2 BHK Type 2 Parking"
                      section="threeBHKConfig"
                      field="type3parking"
                      value={formData.threeBHKConfig.type3parking2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3parking2}
                    />
                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="threeBHKConfig"
                        field="type3floorplan2"
                        label="Upload Type 3 Floorplan"
                        limit={1}
                      />
                      {formData?.threeBHKConfig?.type3floorplan2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.threeBHKConfig.type3floorplan2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>


                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="threeBHKConfig"
                        field="type3images2"
                        label="Upload Type 2 Images"
                        limit={1}
                      />
                      {formData?.threeBHKConfig?.type3images2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.threeBHKConfig.type3images2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            </div>
          )}


          {stage === 6 && (
           <div className="grid grid-cols-2 gap-3 items-center mb-1">
           <>
             <InputField
               label="4 BHK Type 4 Units"
               section="fourBHKConfig"
               field="type4Units"
               value={formData.fourBHKConfig.type4Units}
               onChange={handleChange}
               error={warnings.fourBHKConfig?.type4Units}
             />
             <InputField
               label="4 BHK Type Area"
               section="fourBHKConfig"
               field="type4area"
               value={formData.fourBHKConfig.type4area}
               onChange={handleChange}
               error={warnings.fourBHKConfig?.type4area}
             />      
             <InputField
               label="4 BHK Type Bedroom area"
               section="fourBHKConfig"
               field="type4BedroomArea"
               value={formData.fourBHKConfig.type4BedroomArea}
               onChange={handleChange}
               error={warnings.fourBHKConfig?.type4BedroomArea}
             />
             <InputField
               label="4 BHK Type Hall area"
               section="fourBHKConfig"
               field="type4HallArea"
               value={formData.fourBHKConfig.type4HallArea}
               onChange={handleChange}
               error={warnings.fourBHKConfig?.type4HallArea}
             />
             <InputField
               label="4 BHK Type Kitchen area"
               section="fourBHKConfig"
               field="type4KitchenArea"
               value={formData.fourBHKConfig.type4KitchenArea}
               onChange={handleChange}
               error={warnings.fourBHKConfig?.type4KitchenArea}
             />
             <InputField
               label="4 BHK Type Bathrooms"
               section="fourBHKConfig"
               field="type4bathrooms"
               value={formData.fourBHKConfig.type4bathrooms}
               onChange={handleChange}
               error={warnings.fourBHKConfig?.type4bathrooms}
             />
             <InputField
               label="4 BHK Type Balcony"
               section="fourBHKConfig"
               field="type4balcony"
               value={formData.fourBHKConfig.type4balcony}
               onChange={handleChange}
               error={warnings.fourBHKConfig?.type4balcony}
             />
             <InputField
               label="4 BHK Type Parking"
               section="fourBHKConfig"
               field="type4parking"
               value={formData.fourBHKConfig.type4parking}
               onChange={handleChange}
               error={warnings.fourBHKConfig?.type4parking}
             />
         
             <div>
               <ImageUpload
                 handleChange={handleChange}
                 section="fourBHKConfig"
                 field="type4floorplan"
                 label="Upload Type 4 Floorplan"
                 limit={1}
               />
               {formData?.fourBHKConfig?.type4floorplan?.length > 0 && (
                 <div>
                   <h3>Uploaded Images:</h3>
                   <ul>
                     {formData.fourBHKConfig.type4floorplan.map((file, index) => (
                       <li key={index}>{file.name}</li>
                     ))}
                   </ul>
                 </div>
               )}
             </div>
         
             <div>
               <ImageUpload
                 handleChange={handleChange}
                 section="fourBHKConfig"
                 field="type4images"
                 label="Upload Type 4 Images"
                 limit={1}
               />
               {formData?.fourBHKConfig?.type4images?.length > 0 && (
                 <div>
                   <h3>Uploaded Images:</h3>
                   <ul>
                     {formData.fourBHKConfig.type4images.map((file, index) => (
                       <li key={index}>{file.name}</li>
                     ))}
                   </ul>
                 </div>
               )}
             </div>
         
             <div className="col-span-2 md-3">
               <CheckBox
                 label="Do you want to add another configuration for 4 BHK?"
                 section="fourBHKConfig"
                 field="enableconfig"
                 checked={formData.fourBHKConfig.enableconfig}
                 onChange={handleChange}
                 error={warnings.fourBHKConfig?.enableconfig}
               />
             </div>
         
             {formData.fourBHKConfig.enableconfig && (
               <>
                 <InputField
                   label="4 BHK Type 2 Units"
                   section="fourBHKConfig"
                   field="type4Units2"
                   value={formData.fourBHKConfig.type4Units2}
                   onChange={handleChange}
                   error={warnings.fourBHKConfig?.type4Units2}
                 />
                 <InputField
                   label="4 BHK Type 2 Area"
                   section="fourBHKConfig"
                   field="type4area2"
                   value={formData.fourBHKConfig.type4area2}
                   onChange={handleChange}
                   error={warnings.fourBHKConfig?.type4area2}
                 />
                 <InputField
                   label="4 BHK Type 2 Bedroom Area"
                   section="fourBHKConfig"
                   field="type4BedroomArea2"
                   value={formData.fourBHKConfig.type4BedroomArea2}
                   onChange={handleChange}
                   error={warnings.fourBHKConfig?.type4BedroomArea2}
                 />
                 <InputField
                   label="4 BHK Type 2 Hall Area"
                   section="fourBHKConfig"
                   field="type4HallArea2"
                   value={formData.fourBHKConfig.type4HallArea2}
                   onChange={handleChange}
                   error={warnings.fourBHKConfig?.type4HallArea2}
                 />
                 <InputField
                   label="4 BHK Type 2 Kitchen Area"
                   section="fourBHKConfig"
                   field="type4KitchenArea2"
                   value={formData.fourBHKConfig.type4KitchenArea2}
                   onChange={handleChange}
                   error={warnings.fourBHKConfig?.type4KitchenArea2}
                 />
                 <InputField
                   label="4 BHK Type 2 Bathrooms"
                   section="fourBHKConfig"
                   field="type4bathrooms2"
                   value={formData.fourBHKConfig.type4bathrooms2}
                   onChange={handleChange}
                   error={warnings.fourBHKConfig?.type4bathrooms2}
                 />
                 <InputField
                   label="4 BHK Type 2 Balcony"
                   section="fourBHKConfig"
                   field="type4balcony2"
                   value={formData.fourBHKConfig.type4balcony2}
                   onChange={handleChange}
                   error={warnings.fourBHKConfig?.type4balcony2}
                 />
                 <InputField
                   label="4 BHK Type 2 Parking"
                   section="fourBHKConfig"
                   field="type4parking2"
                   value={formData.fourBHKConfig.type4parking2}
                   onChange={handleChange}
                   error={warnings.fourBHKConfig?.type4parking2}
                 />
         
                 <div>
                   <ImageUpload
                     handleChange={handleChange}
                     section="fourBHKConfig"
                     field="type4floorplan2"
                     label="Upload Type 4 Floorplan"
                     limit={1}
                   />
                   {formData?.fourBHKConfig?.type4floorplan2?.length > 0 && (
                     <div>
                       <h3>Uploaded Images:</h3>
                       <ul>
                         {formData.fourBHKConfig.type4floorplan2.map((file, index) => (
                           <li key={index}>{file.name}</li>
                         ))}
                       </ul>
                     </div>
                   )}
                 </div>
         
                 <div>
                   <ImageUpload
                     handleChange={handleChange}
                     section="fourBHKConfig"
                     field="type4images2"
                     label="Upload Type 4 Images"
                     limit={1}
                   />
                   {formData?.fourBHKConfig?.type4images2?.length > 0 && (
                     <div>
                       <h3>Uploaded Images:</h3>
                       <ul>
                         {formData.fourBHKConfig.type4images2.map((file, index) => (
                           <li key={index}>{file.name}</li>
                         ))}
                       </ul>
                     </div>
                   )}
                 </div>
               </>
             )}
           </>
         </div>
         
          )}


          {stage === 7 && (
        <div className="grid grid-cols-2 gap-3 items-center mb-1">
        <>
          <InputField
            label="5 BHK Type 5 Units"
            section="fiveBHKConfig"
            field="type5Units"
            value={formData.fiveBHKConfig.type5Units}
            onChange={handleChange}
            error={warnings.fiveBHKConfig?.type5Units}
          />
          <InputField
            label="5 BHK Type Area"
            section="fiveBHKConfig"
            field="type5area"
            value={formData.fiveBHKConfig.type5area}
            onChange={handleChange}
            error={warnings.fiveBHKConfig?.type5area}
          />
      
          <InputField
            label="5 BHK Type Bedroom area"
            section="fiveBHKConfig"
            field="type5BedroomArea"
            value={formData.fiveBHKConfig.type5BedroomArea}
            onChange={handleChange}
            error={warnings.fiveBHKConfig?.type5BedroomArea}
          />
          <InputField
            label="5 BHK Type Hall area"
            section="fiveBHKConfig"
            field="type5HallArea"
            value={formData.fiveBHKConfig.type5HallArea}
            onChange={handleChange}
            error={warnings.fiveBHKConfig?.type5HallArea}
          />
          <InputField
            label="5 BHK Type Kitchen area"
            section="fiveBHKConfig"
            field="type5KitchenArea"
            value={formData.fiveBHKConfig.type5KitchenArea}
            onChange={handleChange}
            error={warnings.fiveBHKConfig?.type5KitchenArea}
          />
          <InputField
            label="5 BHK Type Bathrooms"
            section="fiveBHKConfig"
            field="type5bathrooms"
            value={formData.fiveBHKConfig.type5bathrooms}
            onChange={handleChange}
            error={warnings.fiveBHKConfig?.type5bathrooms}
          />
          <InputField
            label="5 BHK Type Balcony"
            section="fiveBHKConfig"
            field="type5balcony"
            value={formData.fiveBHKConfig.type5balcony}
            onChange={handleChange}
            error={warnings.fiveBHKConfig?.type5balcony}
          />
          <InputField
            label="5 BHK Type Parking"
            section="fiveBHKConfig"
            field="type5parking"
            value={formData.fiveBHKConfig.type5parking}
            onChange={handleChange}
            error={warnings.fiveBHKConfig?.type5parking}
          />
      
          <div>
            <ImageUpload
              handleChange={handleChange}
              section="fiveBHKConfig"
              field="type5floorplan"
              label="Upload Type 5 Floorplan"
              limit={1}
            />
            {formData?.fiveBHKConfig?.type5floorplan?.length > 0 && (
              <div>
                <h3>Uploaded Images:</h3>
                <ul>
                  {formData.fiveBHKConfig.type5floorplan.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      
          <div>
            <ImageUpload
              handleChange={handleChange}
              section="fiveBHKConfig"
              field="type5images"
              label="Upload Type 5 Images"
              limit={1}
            />
            {formData?.fiveBHKConfig?.type5images?.length > 0 && (
              <div>
                <h3>Uploaded Images:</h3>
                <ul>
                  {formData.fiveBHKConfig.type5images.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      
          <div className="col-span-2 md-3">
            <CheckBox
              label="Do you want to add another configuration for 5 BHK?"
              section="fiveBHKConfig"
              field="enableconfig"
              checked={formData.fiveBHKConfig.enableconfig}
              onChange={handleChange}
              error={warnings.fiveBHKConfig?.enableconfig}
            />
          </div>
      
          {formData.fiveBHKConfig.enableconfig && (
            <>
              <InputField
                label="5 BHK Type 2 Units"
                section="fiveBHKConfig"
                field="type5Units2"
                value={formData.fiveBHKConfig.type5Units2}
                onChange={handleChange}
                error={warnings.fiveBHKConfig?.type5Units2}
              />
              <InputField
                label="5 BHK Type 2 Area"
                section="fiveBHKConfig"
                field="type5area2"
                value={formData.fiveBHKConfig.type5area2}
                onChange={handleChange}
                error={warnings.fiveBHKConfig?.type5area2}
              />
              <InputField
                label="5 BHK Type 2 Bedroom Area"
                section="fiveBHKConfig"
                field="type5BedroomArea2"
                value={formData.fiveBHKConfig.type5BedroomArea2}
                onChange={handleChange}
                error={warnings.fiveBHKConfig?.type5BedroomArea2}
              />
              <InputField
                label="5 BHK Type 2 Hall Area"
                section="fiveBHKConfig"
                field="type5HallArea2"
                value={formData.fiveBHKConfig.type5HallArea2}
                onChange={handleChange}
                error={warnings.fiveBHKConfig?.type5HallArea2}
              />
              <InputField
                label="5 BHK Type 2 Kitchen Area"
                section="fiveBHKConfig"
                field="type5KitchenArea2"
                value={formData.fiveBHKConfig.type5KitchenArea2}
                onChange={handleChange}
                error={warnings.fiveBHKConfig?.type5KitchenArea2}
              />
              <InputField
                label="5 BHK Type 2 Bathrooms"
                section="fiveBHKConfig"
                field="type5bathrooms2"
                value={formData.fiveBHKConfig.type5bathrooms2}
                onChange={handleChange}
                error={warnings.fiveBHKConfig?.type5bathrooms2}
              />
              <InputField
                label="5 BHK Type 2 Balcony"
                section="fiveBHKConfig"
                field="type5balcony2"
                value={formData.fiveBHKConfig.type5balcony2}
                onChange={handleChange}
                error={warnings.fiveBHKConfig?.type5balcony2}
              />
              <InputField
                label="5 BHK Type 2 Parking"
                section="fiveBHKConfig"
                field="type5parking2"
                value={formData.fiveBHKConfig.type5parking2}
                onChange={handleChange}
                error={warnings.fiveBHKConfig?.type5parking2}
              />
      
              <div>
                <ImageUpload
                  handleChange={handleChange}
                  section="fiveBHKConfig"
                  field="type5floorplan2"
                  label="Upload Type 5 Floorplan"
                  limit={1}
                />
                {formData?.fiveBHKConfig?.type5floorplan2?.length > 0 && (
                  <div>
                    <h3>Uploaded Images:</h3>
                    <ul>
                      {formData.fiveBHKConfig.type5floorplan2.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
      
              <div>
                <ImageUpload
                  handleChange={handleChange}
                  section="fiveBHKConfig"
                  field="type5images2"
                  label="Upload Type 5 Images"
                  limit={1}
                />
                {formData?.fiveBHKConfig?.type5images2?.length > 0 && (
                  <div>
                    <h3>Uploaded Images:</h3>
                    <ul>
                      {formData.fiveBHKConfig.type5images2.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      </div>
      


          )}


          {stage ===8 && (
           <div className="grid grid-cols-2 gap-3 items-center mb-1">
           <>
             <InputField
               label="Penthouse Units"
               section="penthouseConfig"
               field="penthouseUnits"
               value={formData.penthouseConfig.penthouseUnits}
               onChange={handleChange}
               error={warnings.penthouseConfig?.penthouseUnits}
             />
             <InputField
               label="Penthouse Area"
               section="penthouseConfig"
               field="penthouseArea"
               value={formData.penthouseConfig.penthouseArea}
               onChange={handleChange}
               error={warnings.penthouseConfig?.penthouseArea}
             />
             <InputField
               label="Penthouse Hall Area"
               section="penthouseConfig"
               field="hallArea"
               value={formData.penthouseConfig.hallArea}
               onChange={handleChange}
               error={warnings.penthouseConfig?.hallArea}
             />
             <InputField
               label="Penthouse Kitchen Area"
               section="penthouseConfig"
               field="kitchenArea"
               value={formData.penthouseConfig.kitchenArea}
               onChange={handleChange}
               error={warnings.penthouseConfig?.kitchenArea}
             />
         
             {Array.from({ length: 6 }, (_, i) => (
               <InputField
                 key={i}
                 label={`Penthouse Bedroom ${i + 1} Area`}
                 section="penthouseConfig"
                 field={`bedroom${i + 1}Area`}
                 value={formData.penthouseConfig[`bedroom${i + 1}Area`]}
                 onChange={handleChange}
                 error={warnings.penthouseConfig?.[`bedroom${i + 1}Area`]}
               />
             ))}
         
             {Array.from({ length: 6 }, (_, i) => (
               <InputField
                 key={i}
                 label={`Penthouse Bathroom ${i + 1} Area`}
                 section="penthouseConfig"
                 field={`bathroom${i + 1}Area`}
                 value={formData.penthouseConfig[`bathroom${i + 1}Area`]}
                 onChange={handleChange}
                 error={warnings.penthouseConfig?.[`bathroom${i + 1}Area`]}
               />
             ))}
         
             <InputField
               label="Penthouse Balcony"
               section="penthouseConfig"
               field="penthouseBalcony"
               value={formData.penthouseConfig.penthouseBalcony}
               onChange={handleChange}
               error={warnings.penthouseConfig?.penthouseBalcony}
             />
             <InputField
               label="Penthouse Parking"
               section="penthouseConfig"
               field="penthouseParking"
               value={formData.penthouseConfig.penthouseParking}
               onChange={handleChange}
               error={warnings.penthouseConfig?.penthouseParking}
             />
         
             <div>
               <ImageUpload
                 handleChange={handleChange}
                 section="penthouseConfig"
                 field="penthouseFloorPlan"
                 label="Upload Penthouse Floorplan"
                 limit={1}
               />
               {formData?.penthouseConfig?.penthouseFloorPlan?.length > 0 && (
                 <div>
                   <h3>Uploaded Images:</h3>
                   <ul>
                     {formData.penthouseConfig.penthouseFloorPlan.map((file, index) => (
                       <li key={index}>{file.name}</li>
                     ))}
                   </ul>
                 </div>
               )}
             </div>
         
             <div>
               <ImageUpload
                 handleChange={handleChange}
                 section="penthouseConfig"
                 field="penthouseImages"
                 label="Upload Penthouse Images"
                 limit={1}
               />
               {formData?.penthouseConfig?.penthouseImages?.length > 0 && (
                 <div>
                   <h3>Uploaded Images:</h3>
                   <ul>
                     {formData.penthouseConfig.penthouseImages.map((file, index) => (
                       <li key={index}>{file.name}</li>
                     ))}
                   </ul>
                 </div>
               )}
             </div>
         
             <div className="col-span-2 md-3">
               <CheckBox
                 label="Do you want to add another configuration for the Penthouse?"
                 section="penthouseConfig"
                 field="enableconfig"
                 checked={formData.penthouseConfig.enableconfig}
                 onChange={handleChange}
                 error={warnings.penthouseConfig?.enableconfig}
               />
             </div>
         
             {formData.penthouseConfig.enableconfig && (
               <>
                 <InputField
                   label="Penthouse Type Number"
                   section="penthouseConfig"
                   field="typeNumber"
                   value={formData.penthouseConfig.typeNumber}
                   onChange={handleChange}
                   error={warnings.penthouseConfig?.typeNumber}
                 />
         
                 <div>
                   <ImageUpload
                     handleChange={handleChange}
                     section="penthouseConfig"
                     field="penthouseFloorPlan2"
                     label="Upload Penthouse Floorplan (Type 2)"
                     limit={1}
                   />
                   {formData?.penthouseConfig?.penthouseFloorPlan2?.length > 0 && (
                     <div>
                       <h3>Uploaded Images:</h3>
                       <ul>
                         {formData.penthouseConfig.penthouseFloorPlan2.map(
                           (file, index) => (
                             <li key={index}>{file.name}</li>
                           )
                         )}
                       </ul>
                     </div>
                   )}
                 </div>
         
                 <div>
                   <ImageUpload
                     handleChange={handleChange}
                     section="penthouseConfig"
                     field="penthouseImages2"
                     label="Upload Penthouse Images (Type 2)"
                     limit={1}
                   />
                   {formData?.penthouseConfig?.penthouseImages2?.length > 0 && (
                     <div>
                       <h3>Uploaded Images:</h3>
                       <ul>
                         {formData.penthouseConfig.penthouseImages2.map((file, index) => (
                           <li key={index}>{file.name}</li>
                         ))}
                       </ul>
                     </div>
                   )}
                 </div>
               </>
             )}
           </>
         </div>
         
          
          )}


          {/* Display Cached Data on the Last Stage */}
          {stage === 9 && (
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
                  T
                  wo twoBHKConfig
                </Typography>
                <Typography className="text-white">
                  two bhk Config:{" "}
                  {cachedData.twoBHKConfig.type2Units || "Not Provided"}
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


export default MultiStageForm;


