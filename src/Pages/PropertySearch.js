import React, { useState } from "react";
import { MenuItem, FormControl, Select, InputLabel, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
// import DemoFooter from "../Components/Footer";
// import DemoNavbar from "../components/Navbar";

const PropertySearch = () => {
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
 
  const handleSubmit = () => {
    console.log({ Budget: budget, Location: location, Bedrooms: bedrooms });
  };
 
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* ✅ Navbar at the top */}
      {/* <DemoNavbar /> */}
 
      {/* ✅ Search Form */}
      <div className="flex flex-col justify-center items-center flex-grow p-6">
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
          <FormControl variant="outlined" className="w-full sm:w-40">
            <InputLabel>Budget</InputLabel>
            <Select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              label="Budget"
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="20-40L">20-40 Lakh</MenuItem>
              <MenuItem value="40-60L">40-60 Lakh</MenuItem>
              <MenuItem value="60L-1Cr">60 Lakh - 1 Crore</MenuItem>
            </Select>
          </FormControl>
 
          <FormControl variant="outlined" className="w-full sm:w-40">
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="Location"
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Pune">Pune</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
            </Select>
          </FormControl>
 
          <FormControl variant="outlined" className="w-full sm:w-40">
            <InputLabel>Bedrooms</InputLabel>
            <Select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              label="Bedrooms"
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="1">1 BHK</MenuItem>
              <MenuItem value="2">2 BHK</MenuItem>
              <MenuItem value="3">3 BHK</MenuItem>
            </Select>
          </FormControl>
 
          <Button
            variant="contained"
            endIcon={<Search />}
            onClick={handleSubmit}
            className="w-full sm:w-auto"
            sx={{
              backgroundColor: "#ffc107",
              color: "black",
              "&:hover": { backgroundColor: "#ffb300" },
            }}
          >
            Find
          </Button>
        </div>
      </div>
 
      {/* ✅ Footer (Sticky at the Bottom) */}
      {/* <DemoFooter /> */}
    </div>
  );
};
 
export default PropertySearch;