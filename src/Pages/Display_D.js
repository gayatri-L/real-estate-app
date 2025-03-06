
<<<<<<< HEAD
// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// import Header from "../components/Header";
// import PropertyFilters from "../components/PropertyFilters";
// import PropertyList from "../components/PropertyList";

// const Display_D = () => {
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [selectedBHK, setSelectedBHK] = useState("");
//   const [selectedBudget, setSelectedBudget] = useState("");
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });
//   const [mapZoom, setMapZoom] = useState(12);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [propertiesData, setPropertiesData] = useState([]); // Store original properties data

//   // Fetch properties from the database
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/filter-details");
//         const data = await response.json();
//         setPropertiesData(data);
//         setFilteredProperties(data); // Initialize filtered properties with all properties initially
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []); // Run only once on initial load

//   // Apply filters to properties
//   useEffect(() => {
//     let filtered = propertiesData;

//     if (selectedLocation) {
//       filtered = filtered.filter((property) => property.location === selectedLocation);
//     }

//     if (selectedArea) {
//       filtered = filtered.filter((property) => property.area === selectedArea);
//     }

//     if (selectedBHK) {
//       filtered = filtered.filter((property) => property.bhk === selectedBHK);
//     }

//     if (selectedBudget) {
//       filtered = filtered.filter((property) => property.price <= selectedBudget);
//     }

//     setFilteredProperties(filtered);
//   }, [selectedLocation, selectedArea, selectedBHK, selectedBudget, propertiesData]); // Filters only when a filter changes

//   // Adjust map center and zoom based on filtered properties
//   useEffect(() => {
//     if (filteredProperties.length > 0) {
//       const areaCenter = filteredProperties[0];
//       setMapCenter({ lat: areaCenter.lat, lng: areaCenter.lng });
//       setMapZoom(14);
//     } else {
//       setMapCenter({ lat: 18.5204, lng: 73.8567 });
//       setMapZoom(12);
//     }
//   }, [filteredProperties]);

//   // Unique dropdown options for filters (from propertiesData)
//   const uniqueLocations = [...new Set(propertiesData.map((prop) => prop.location))];
//   const uniqueAreas = [...new Set(propertiesData.map((prop) => prop.area))];
//   const uniqueBHKs = [...new Set(propertiesData.map((prop) => prop.bhk))];
//   const uniqueBudgets = [...new Set(propertiesData.map((prop) => prop.price))];

//   return (
//     <div className="w-full overflow-x-hidden">
//       <div className="bg-black text-white min-h-screen">
//         <Header />
//         <div className="p-4 flex flex-col md:flex-row gap-4">
//           {/* Filters Component */}
//           <div className="w-full md:w-1/3 lg:w-1/4">
//             <PropertyFilters
//               onLocationChange={setSelectedLocation}
//               onAreaChange={setSelectedArea}
//               onBHKChange={setSelectedBHK}
//               onBudgetChange={setSelectedBudget}
//               uniqueLocations={uniqueLocations}
//               uniqueAreas={uniqueAreas}
//               uniqueBHKs={uniqueBHKs}
//               uniqueBudgets={uniqueBudgets}
//               selectedLocation={selectedLocation}
//               selectedArea={selectedArea}
//               selectedBHK={selectedBHK}
//               selectedBudget={selectedBudget}
//             />
//           </div>

//           {/* Map & Property Listings */}
//           <div className="flex-1 flex flex-col gap-4">
//             <LoadScript googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg">
//               <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={mapCenter} zoom={mapZoom}>
//                 {filteredProperties.map((property) => (
//                   <Marker
//                     key={property.id}
//                     position={{ lat: property.lat, lng: property.lng }}
//                     onClick={() => setSelectedProperty(property)}
//                   />
//                 ))}
//                 {selectedProperty && (
//                   <InfoWindow position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }} onCloseClick={() => setSelectedProperty(null)}>
//                     <div>
//                       <h4>{selectedProperty.name}</h4>
//                       <p>Price: ₹{selectedProperty.price.toLocaleString()}</p>
//                     </div>
//                   </InfoWindow>
//                 )}
//               </GoogleMap>
//             </LoadScript>
//             <PropertyList properties={filteredProperties} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Display_D;


import React, { useState, useEffect } from "react";
import PropertyList from "../components/PropertyList";
import PropertyFilters from "../components/PropertyFilters";
import MapComponent from "../components/GoogleMap";
=======
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// import Header from "../Components/Header";
import PropertyFilters from "../Components/PropertyFilters";
import PropertyList from "../Components/PropertyList";
>>>>>>> origin/main

const Display_D = () => {
  const [selectedBHK, setSelectedBHK] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(5000000);
  const [selectedLocation, setSelectedLocation] = useState("Pune");
  const [selectedArea, setSelectedArea] = useState("");
  //Display Property List
 // Store all properties and filtered properties
 const [allProperties, setAllProperties] = useState([]);
 const [filteredProperties, setFilteredProperties] = useState([]);

 const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });

  useEffect(() => {

    const fetchProperties = async () => { //Fetch the all Properties
      try {
        const response = await fetch("http://localhost:5000/filter-details");
        const data = await response.json();
        console.log("Fetched Properties:", data);

      // Validate and transform data
      const validProperties = data
        .filter((property) => property.latitude && property.longitude)
        .map((property) => ({
          ...property,
          latitude: parseFloat(property.latitude),
          longitude: parseFloat(property.longitude),
        }));

      console.log("Valid Properties for Map and Table:", validProperties);

      setAllProperties(validProperties);
      setFilteredProperties(validProperties);

     // Update center to the first valid property if available
     if (validProperties.length > 0) {
       setMapCenter({
         lat: validProperties[0].latitude,
         lng: validProperties[0].longitude,
       });
     }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

   // Filter properties based on user input
   useEffect(() => {
    const applyFilters = () => {
      const filtered = allProperties.filter((property) => {
        const matchesLocation =
          !selectedLocation || property.location.includes(selectedLocation);
        const matchesArea = !selectedArea || property.location.includes(selectedArea);
        const matchesBHK =
          !selectedBHK ||
          (selectedBHK === "1" && property.bhk_1) ||
          (selectedBHK === "2" && property.bhk_2) ||
          (selectedBHK === "3" && property.bhk_3);
        const matchesBudget = property.price <= selectedBudget;

        return matchesLocation && matchesArea && matchesBHK && matchesBudget;
      });

      setFilteredProperties(filtered);

      // Update map center if results exist
      if (filtered.length > 0) {
        setMapCenter({
          lat: filtered[0].latitude,
          lng: filtered[0].longitude,
        });
      }

      console.log("Filtered Properties:", filtered);
    };

    applyFilters();
  }, [selectedLocation, selectedArea, selectedBHK, selectedBudget, allProperties]);


  return (
<<<<<<< HEAD
    <div className="w-full p-4 bg-white min-h-screen">
       {/* Display PropertyFilters */}
       <div className="flex flex-col md:flex-row gap-4">
       <div className="md:w-1/4 bg-gray-900 p-4 rounded-lg text-white">
       <PropertyFilters
            onLocationChange={setSelectedLocation}
            onAreaChange={setSelectedArea}
            onBHKChange={setSelectedBHK}
            onBudgetChange={setSelectedBudget}
            selectedBudget={selectedBudget}
          />
=======
    <div className="w-full overflow-x-hidden">
      <div className="bg-black text-white min-h-screen">
        {/* <Header /> */}
        <div className="p-4 flex flex-col md:flex-row gap-4">
          {/* Filters Component */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <PropertyFilters
              onLocationChange={setSelectedLocation}
              onAreaChange={setSelectedArea}
              onBHKChange={setSelectedBHK}
              onBudgetChange={setSelectedBudget}
              uniqueLocations={uniqueLocations}
              uniqueAreas={uniqueAreas}
              uniqueBHKs={uniqueBHKs}
              uniqueBudgets={uniqueBudgets}
              selectedLocation={selectedLocation}
              selectedArea={selectedArea}
              selectedBHK={selectedBHK}
              selectedBudget={selectedBudget}
            />
          </div>

          {/* Map & Property Listings */}
          <div className="flex-1 flex flex-col gap-4">
            <LoadScript googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg">
              <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={mapCenter} zoom={mapZoom}>
                {filteredProperties.map((property) => (
                  <Marker
                    key={property.id}
                    position={{ lat: property.lat, lng: property.lng }}
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
                {selectedProperty && (
                  <InfoWindow position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }} onCloseClick={() => setSelectedProperty(null)}>
                    <div>
                      <h4>{selectedProperty.name}</h4>
                      <p>Price: ₹{selectedProperty.price.toLocaleString()}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
            <PropertyList1 properties={filteredProperties} />
          </div>
>>>>>>> origin/main
        </div>
      {/* Render Google Map Component */}
      <div className="md:w-3/4">
      <MapComponent center={mapCenter} properties={filteredProperties} />
      </div>
    </div>
    {/* Render Property List component*/}
     <div className="mt-4">
     <PropertyList properties={filteredProperties} />
     </div>
      
    </div>
  );
  
};

export default Display_D;


