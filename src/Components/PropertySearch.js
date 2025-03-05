import React, { useState } from "react";
import { MenuItem, FormControl, Select, InputLabel, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import DemoNavbar from "./DemoNavbar";
import DemoFooter from "./DemoFooter";
import PropertyList from "./PropertyList";

const mockProperties = [
  {
    id: 1,
    name: "Luxury Villa",
    location: "Mumbai",
    area: 2500,
    price: 45000000,
    bhk: 4,
    images: [
      "https://tse4.mm.bing.net/th?id=OIP.CUIYCrPCBwOs-o_smQCDOgHaEc&pid=Api&P=0&h=220", 
      "https://tse3.mm.bing.net/th?id=OIP.p0CjSHnH8aDfmPIrmwh3gQHaEj&pid=Api&P=0&h=220"
    ]
  },
  {
    id: 2,
    name: "Skyline Apartment",
    location: "Pune",
    area: 1800,
    price: 32000000,
    bhk: 3,
    images: [
      "https://tse4.mm.bing.net/th?id=OIP.eDC1-1ml5C1TSyuZAWauWwHaEK&pid=Api&P=0&h=220",
      "https://tse4.mm.bing.net/th?id=OIP.lWL83GM1QuqbaAa_B_yY4QHaE7&pid=Api&P=0&h=220"
    ]
  }
];


const PropertySearch = () => {
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  const handleSearch = () => {
    let filtered = mockProperties;

    if (location) {
      filtered = filtered.filter((property) => property.location === location);
    }
    if (bedrooms) {
      filtered = filtered.filter((property) => property.bhk === parseInt(bedrooms));
    }
    if (budget) {
      const [min, max] = budget.split("-").map((b) => parseInt(b.replace(/\D/g, "")));
      filtered = filtered.filter((property) => property.price >= min * 100000 && property.price <= (max || Infinity) * 100000);
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* ✅ Navbar */}
      <DemoNavbar />

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
              <MenuItem value="2000000-4000000">20-40 Lakh</MenuItem>
              <MenuItem value="4000000-6000000">40-60 Lakh</MenuItem>
              <MenuItem value="6000000-10000000">60 Lakh - 1 Crore</MenuItem>
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
            onClick={handleSearch}
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

      {/* ✅ Property List (Displays filtered properties) */}
      <div className="px-6 pb-6">
        <PropertyList properties={filteredProperties} />
      </div>

       {/* ✅ Property List (Displays filtered properties) */}
       {/* <div className="px-6 pb-6">
        <ImageSwapper />
      </div> */}

      {/* ✅ Footer */}
      <DemoFooter />
    </div>
  );
};

export default PropertySearch;
// import React, { useState } from "react";
// import { MenuItem, FormControl, Select, InputLabel, Button, IconButton } from "@mui/material";
// import { Search, FavoriteBorder } from "@mui/icons-material";
// import DemoNavbar from "./DemoNavbar";
// import DemoFooter from "./DemoFooter";
// import PropertyList from "./PropertyList";
// // import SwiperCore, { Navigation, Pagination } from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // SwiperCore.use([Navigation, Pagination]);

// const mockProperties = [
//   {
//     id: 1,
//     name: "Luxury Villa",
//     location: "Mumbai",
//     area: 2500,
//     price: 45000000,
//     bhk: 4,
//     images: [
//       "https://tse4.mm.bing.net/th?id=OIP.CUIYCrPCBwOs-o_smQCDOgHaEc&pid=Api&P=0&h=220", 
//       "https://tse3.mm.bing.net/th?id=OIP.p0CjSHnH8aDfmPIrmwh3gQHaEj&pid=Api&P=0&h=220"
//     ]
//   },
//   {
//     id: 2,
//     name: "Skyline Apartment",
//     location: "Pune",
//     area: 1800,
//     price: 32000000,
//     bhk: 3,
//     images: [
//       "https://tse4.mm.bing.net/th?id=OIP.eDC1-1ml5C1TSyuZAWauWwHaEK&pid=Api&P=0&h=220",
//       "https://tse4.mm.bing.net/th?id=OIP.lWL83GM1QuqbaAa_B_yY4QHaE7&pid=Api&P=0&h=220"
//     ]
//   }
// ];

// const PropertyCard = ({ property }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
//       <Swiper 
//       modules
//       navigation pagination className="w-full h-64">
//         {property.images.map((image, index) => (
//           <SwiperSlide key={index}>
//             <img src={image} alt={property.name} className="w-full h-64 object-cover" />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <IconButton className="absolute top-2 right-2 bg-white/70 rounded-full">
//         <FavoriteBorder sx={{ color: "black" }} />
//       </IconButton>
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">{property.name}</h2>
//         <p className="text-gray-500">{property.location}</p>
//         <p className="font-bold text-xl">₹{property.price.toLocaleString()}</p>
//         <p className="text-sm">{property.bhk} BHK | {property.area} sqft</p>
//       </div>
//     </div>
//   );
// };

// const PropertySearch = () => {
//   const [budget, setBudget] = useState("");
//   const [location, setLocation] = useState("");
//   const [bedrooms, setBedrooms] = useState("");
//   const [filteredProperties, setFilteredProperties] = useState(mockProperties);

//   const handleSearch = () => {
//     let filtered = mockProperties;
//     if (location) filtered = filtered.filter((p) => p.location === location);
//     if (bedrooms) filtered = filtered.filter((p) => p.bhk === parseInt(bedrooms));
//     if (budget) {
//       const [min, max] = budget.split("-").map((b) => parseInt(b.replace(/\D/g, "")));
//       filtered = filtered.filter((p) => p.price >= min * 100000 && p.price <= (max || Infinity) * 100000);
//     }
//     setFilteredProperties(filtered);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-black">
//       <DemoNavbar />
//       <div className="flex flex-col justify-center items-center flex-grow p-6">
//         <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
//           <FormControl variant="outlined" className="w-full sm:w-40">
//             <InputLabel>Budget</InputLabel>
//             <Select value={budget} onChange={(e) => setBudget(e.target.value)} label="Budget" sx={{ backgroundColor: "white" }}>
//               <MenuItem value=""><em>None</em></MenuItem>
//               <MenuItem value="2000000-4000000">20-40 Lakh</MenuItem>
//               <MenuItem value="4000000-6000000">40-60 Lakh</MenuItem>
//               <MenuItem value="6000000-10000000">60 Lakh - 1 Crore</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl variant="outlined" className="w-full sm:w-40">
//             <InputLabel>Location</InputLabel>
//             <Select value={location} onChange={(e) => setLocation(e.target.value)} label="Location" sx={{ backgroundColor: "white" }}>
//               <MenuItem value=""><em>None</em></MenuItem>
//               <MenuItem value="Mumbai">Mumbai</MenuItem>
//               <MenuItem value="Pune">Pune</MenuItem>
//               <MenuItem value="Delhi">Delhi</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl variant="outlined" className="w-full sm:w-40">
//             <InputLabel>Bedrooms</InputLabel>
//             <Select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} label="Bedrooms" sx={{ backgroundColor: "white" }}>
//               <MenuItem value=""><em>None</em></MenuItem>
//               <MenuItem value="1">1 BHK</MenuItem>
//               <MenuItem value="2">2 BHK</MenuItem>
//               <MenuItem value="3">3 BHK</MenuItem>
//             </Select>
//           </FormControl>
//           <Button variant="contained" endIcon={<Search />} onClick={handleSearch} className="w-full sm:w-auto" sx={{ backgroundColor: "#ffc107", color: "black", "&:hover": { backgroundColor: "#ffb300" } }}>
//             Find
//           </Button>
//         </div>
//       </div>
//       <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
//       </div>
//       <DemoFooter />
//     </div>
//   );
// };

// export default PropertySearch;
