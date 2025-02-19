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
//   const [propertiesData, setPropertiesData] = useState([]); // Fetch from database

//   // Fetch properties from database
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const queryParams = new URLSearchParams({
//           location: selectedLocation || "",
//           area: selectedArea || "",
//           bhk: selectedBHK || "",
//           budget: selectedBudget || "",
//         });
  
//         const response = await fetch(`http://localhost:5000/properties?${queryParams}`);
//         const data = await response.json();
//         setPropertiesData(data);
//         setFilteredProperties(data); // Initialize filtered properties
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };
  
//     if (selectedLocation || selectedArea || selectedBHK || selectedBudget) {
//       fetchProperties();
//     }
//   }, [selectedLocation, selectedArea, selectedBHK, selectedBudget]); 
  

//   // Adjust map center and zoom based on first filtered property
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

//   // Unique dropdown options for filters (from database)
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
//   onLocationChange={setSelectedLocation}
//   onAreaChange={setSelectedArea}
//   onBHKChange={setSelectedBHK}
//   onBudgetChange={setSelectedBudget}
//   uniqueLocations={uniqueLocations}
//   uniqueAreas={uniqueAreas}
//   uniqueBHKs={uniqueBHKs}
//   uniqueBudgets={uniqueBudgets}
//   selectedLocation={selectedLocation}
//   selectedArea={selectedArea}
//   selectedBHK={selectedBHK}
//   selectedBudget={selectedBudget}
// />

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


// // import React, { useState, useEffect, useCallback } from "react";
// // import PropertyFilters from "../components/PropertyFilters";
// // import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// // const App = () => {
// //   const [location, setLocation] = useState("");
// //   const [area, setArea] = useState("");
// //   const [budget, setBudget] = useState("");
// //   const [bhk, setBHK] = useState("");
// //   const [properties, setProperties] = useState([]);
// //   const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Default Pune
// //   const [mapZoom, setMapZoom] = useState(12);

// //   const fetchProperties = useCallback(async () => {
// //     try {
// //       let url = `http://localhost:5000/properties?`;
// //       if (location) url += `location=${location}&`;
// //       if (area) url += `area=${area}&`;
// //       if (budget) url += `budget=${budget}&`;
// //       if (bhk) url += `bhk=${bhk}`;

// //       const response = await fetch(url);
// //       if (!response.ok) throw new Error("Failed to fetch properties");

// //       const data = await response.json();
// //       setProperties(data);

// //       if (data.length > 0) {
// //         setMapCenter({ lat: data[0].lat, lng: data[0].lng });
// //         setMapZoom(14);
// //       } else {
// //         setMapCenter({ lat: 18.5204, lng: 73.8567 }); // Default Pune
// //         setMapZoom(12);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching properties:", error);
// //     }
// //   }, [location, area, budget, bhk]);

// //   useEffect(() => {
// //     fetchProperties();
// //   }, [fetchProperties]);

// //   return (
// //     <div className="bg-black min-h-screen text-white p-6">
// //       <h1 className="text-center text-3xl font-bold text-yellow-500 mb-4">
// //         Real Estate Listings
// //       </h1>

// //       <div className="flex flex-col md:flex-row gap-6">
// //         {/* Map Section */}
// //         <div className="w-full md:w-3/4">
// //           <LoadScript googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg">
// //             <GoogleMap
// //               mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "10px" }}
// //               center={mapCenter}
// //               zoom={mapZoom}
// //             >
// //               {properties.map((property) => (
// //                 <Marker key={property.id} position={{ lat: property.lat, lng: property.lng }} />
// //               ))}
// //             </GoogleMap>
// //           </LoadScript>
// //         </div>

// //         {/* Filters Section */}
// //         <div className="w-full md:w-1/4 bg-gray-900 p-5 rounded-lg border border-yellow-500">
// //           <h2 className="text-xl font-bold mb-3 text-yellow-500">Your Preferences</h2>

// //           <PropertyFilters
// //             onLocationChange={setLocation}
// //             onAreaChange={setArea}
// //             onBHKChange={setBHK}
// //             onBudgetChange={setBudget}
// //             uniqueLocations={["Pune", "Mumbai", "Delhi"]}
// //             uniqueAreas={["Kothrud", "Baner", "Wakad"]}
// //             uniqueBHKs={["1 BHK", "2 BHK", "3 BHK"]}
// //             uniqueBudgets={[500000, 1000000, 2000000]}
// //           />
// //         </div>
// //       </div>

// //       {/* Property List Section */}
// //       <div className="mt-6 bg-gray-800 p-5 rounded-lg">
// //         <h2 className="text-lg font-bold mb-4 text-yellow-500">Available Properties</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {properties.length > 0 ? (
// //             properties.map((property) => (
// //               <div key={property.id} className="bg-gray-900 p-4 rounded-lg border border-yellow-500">
// //                 <img src={property.image} alt={property.name} className="w-full rounded-md mb-3" />
// //                 <h3 className="text-xl font-semibold text-yellow-500">{property.name}</h3>
// //                 <p>Price: ₹{property.price.toLocaleString()}</p>
// //                 <p>Area: {property.area}</p>
// //                 <p>BHK: {property.bhk}</p>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-400">No properties found for the selected filters.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // export default App;
// // import React, { useState, useEffect, useCallback } from "react";
// // import PropertyFilters from "../components/PropertyFilters";
// // import PropertyList from "../components/PropertyList";
// // import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// // const areaCoordinates = {
// //   "Hadapsar": { lat: 18.5089, lng: 73.9259, zoom: 14 },
// //   "Kothrud": { lat: 18.5074, lng: 73.8077, zoom: 14 },
// //   "Karve Nagar": { lat: 18.4880, lng: 73.8245, zoom: 14 },
// //   "Shivaji Nagar": { lat: 18.5308, lng: 73.8473, zoom: 14 },
// //   "Viman Nagar": { lat: 18.5679, lng: 73.9143, zoom: 14 }
// // };

// // const App = () => {
// //   const [area, setArea] = useState("");
// //   const [budget, setBudget] = useState("");
// //   const [bhk, setBHK] = useState("");
// //   const [properties, setProperties] = useState([]);
// //   const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });
// //   const [mapZoom, setMapZoom] = useState(12);

// //   const fetchProperties = useCallback(async () => {
// //     try {
// //       let url = `http://localhost:5000/properties?location=Pune&`;
// //       if (area) url += `area=${area}&`;
// //       if (budget) url += `budget=${budget}&`;
// //       if (bhk) url += `bhk=${bhk}`;

// //       const response = await fetch(url);
// //       if (!response.ok) throw new Error("Failed to fetch properties");

// //       const data = await response.json();
// //       setProperties(data);

// //       if (area && areaCoordinates[area]) {
// //         setMapCenter({ lat: areaCoordinates[area].lat, lng: areaCoordinates[area].lng });
// //         setMapZoom(areaCoordinates[area].zoom);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching properties:", error);
// //     }
// //   }, [area, budget, bhk]);

// //   useEffect(() => {
// //     fetchProperties();
// //   }, [fetchProperties]);

// //   return (
// //     <div className="bg-black min-h-screen text-white p-6">
// //       <h1 className="text-center text-3xl font-bold text-yellow-500 mb-4">
// //         Real Estate Listings
// //       </h1>

// //       <div className="flex flex-col md:flex-row gap-6">
// //         {/* Map Section */}
// //         <div className="w-full md:w-3/4">
// //           <LoadScript googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg">
// //             <GoogleMap
// //               mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "10px" }}
// //               center={mapCenter}
// //               zoom={mapZoom}
// //             >
// //               {properties.map((property) => (
// //                 <Marker key={property.id} position={{ lat: property.lat, lng: property.lng }} />
// //               ))}
// //             </GoogleMap>
// //           </LoadScript>
// //         </div>

// //         {/* Filters Section */}
// //         <div className="w-full md:w-1/4 bg-gray-900 p-5 rounded-lg border border-yellow-500">
// //           <h2 className="text-xl font-bold mb-3 text-yellow-500">Your Preferences</h2>

// //           <PropertyFilters
// //             onAreaChange={setArea}
// //             onBHKChange={setBHK}
// //             onBudgetChange={setBudget}
// //             uniqueLocations={["Pune"]}
// //             uniqueAreas={Object.keys(areaCoordinates)}
// //             uniqueBHKs={["1 BHK", "2 BHK", "3 BHK"]}
// //             uniqueBudgets={[500000, 1000000, 2000000]}
// //           />
// //         </div>
// //       </div>

// //       {/* Property List Component */}
// //       <PropertyList properties={properties} />
// //     </div>
// //   );
// // };

// // export default App;

// // import React, { useState, useEffect, useCallback } from "react";
// // import PropertyFilters from "../components/PropertyFilters";
// // import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
// // import PropertyList from "../components/PropertyList";

// // const areaCoordinates = {
// //   "Hadapsar": { lat: 18.5089, lng: 73.9259, zoom: 14 },
// //   "Kothrud": { lat: 18.5074, lng: 73.8077, zoom: 14 },
// //   "Karve Nagar": { lat: 18.4880, lng: 73.8245, zoom: 14 },
// //   "Shivaji Nagar": { lat: 18.5308, lng: 73.8473, zoom: 14 },
// //   "Viman Nagar": { lat: 18.5679, lng: 73.9143, zoom: 14 }
// // };

// // const App = () => {
// //   const [area, setArea] = useState("");
// //   const [budget, setBudget] = useState("");
// //   const [bhk, setBHK] = useState("");
// //   const [properties, setProperties] = useState([]);
// //   const [filteredProperties, setFilteredProperties] = useState([]);
// //   const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });
// //   const [mapZoom, setMapZoom] = useState(12);

// //   // Fetch properties from backend API
// //   const fetchProperties = useCallback(async () => {
// //     try {
// //       let url = `http://localhost:5000/properties?location=Pune&`;
// //       if (area) url += `area=${area}&`;
// //       if (budget) url += `budget=${budget}&`;
// //       if (bhk) url += `bhk=${bhk}`;

// //       const response = await fetch(url);
// //       if (!response.ok) throw new Error("Failed to fetch properties");

// //       const data = await response.json();
// //       setProperties(data);

// //       // Automatically adjust map when area is selected
// //       if (area && areaCoordinates[area]) {
// //         setMapCenter({
// //           lat: areaCoordinates[area].lat,
// //           lng: areaCoordinates[area].lng,
// //         });
// //         setMapZoom(areaCoordinates[area].zoom);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching properties:", error);
// //     }
// //   }, [area, budget, bhk]);

// //   // Apply filtering when properties or dropdown values change
// //   useEffect(() => {
// //     fetchProperties();
// //   }, [fetchProperties]);

// //   useEffect(() => {
// //     const filtered = properties.filter((property) => {
// //       return (
// //         (!area || property.area === area) &&
// //         (!budget || property.price <= budget) &&
// //         (!bhk || property.bhk === bhk)
// //       );
// //     });

// //     setFilteredProperties(filtered);
// //   }, [properties, area, budget, bhk]);

// //   return (
// //     <div className="bg-black min-h-screen text-white p-6">
// //       <h1 className="text-center text-3xl font-bold text-yellow-500 mb-4">
// //         Real Estate Listings
// //       </h1>

// //       <div className="flex flex-col md:flex-row gap-6">
// //         {/* Map Section */}
// //         <div className="w-full md:w-3/4">
// //           <LoadScript googleMapsApiKey="AIzaSyA2ddaLdvbkN_17pvuYqXp1YoM7zJAm2qg">
// //             <GoogleMap
// //               mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "10px" }}
// //               center={mapCenter}
// //               zoom={mapZoom}
// //             >
// //               {filteredProperties.map((property) => (
// //                 <Marker key={property.id} position={{ lat: property.lat, lng: property.lng }} />
// //               ))}
// //             </GoogleMap>
// //           </LoadScript>
// //         </div>

// //         {/* Filters Section */}
// //         <div className="w-full md:w-1/4 bg-gray-900 p-5 rounded-lg border border-yellow-500">
// //           <h2 className="text-xl font-bold mb-3 text-yellow-500">Your Preferences</h2>

// //           <PropertyFilters
// //             onAreaChange={setArea}
// //             onBHKChange={setBHK}
// //             onBudgetChange={setBudget}
// //             uniqueLocations={["Pune"]}
// //             uniqueAreas={Object.keys(areaCoordinates)}
// //             uniqueBHKs={["1 BHK", "2 BHK", "3 BHK"]}
// //             uniqueBudgets={[500000, 1000000, 2000000]}
// //           />
// //         </div>
// //       </div>

// //       {/* Property List Component */}
// //       <PropertyList properties={filteredProperties} />
// //     </div>
// //   );
// // };

// // export default App;

import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Header from "../components/Header";
import PropertyFilters from "../components/PropertyFilters";
import PropertyList from "../components/PropertyList";

const Display_D = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedBHK, setSelectedBHK] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });
  const [mapZoom, setMapZoom] = useState(12);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertiesData, setPropertiesData] = useState([]); // Store original properties data

  // Fetch properties from the database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-details");
        const data = await response.json();
        setPropertiesData(data);
        setFilteredProperties(data); // Initialize filtered properties with all properties initially
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []); // Run only once on initial load

  // Apply filters to properties
  useEffect(() => {
    let filtered = propertiesData;

    if (selectedLocation) {
      filtered = filtered.filter((property) => property.location === selectedLocation);
    }

    if (selectedArea) {
      filtered = filtered.filter((property) => property.area === selectedArea);
    }

    if (selectedBHK) {
      filtered = filtered.filter((property) => property.bhk === selectedBHK);
    }

    if (selectedBudget) {
      filtered = filtered.filter((property) => property.price <= selectedBudget);
    }

    setFilteredProperties(filtered);
  }, [selectedLocation, selectedArea, selectedBHK, selectedBudget, propertiesData]); // Filters only when a filter changes

  // Adjust map center and zoom based on filtered properties
  useEffect(() => {
    if (filteredProperties.length > 0) {
      const areaCenter = filteredProperties[0];
      setMapCenter({ lat: areaCenter.lat, lng: areaCenter.lng });
      setMapZoom(14);
    } else {
      setMapCenter({ lat: 18.5204, lng: 73.8567 });
      setMapZoom(12);
    }
  }, [filteredProperties]);

  // Unique dropdown options for filters (from propertiesData)
  const uniqueLocations = [...new Set(propertiesData.map((prop) => prop.location))];
  const uniqueAreas = [...new Set(propertiesData.map((prop) => prop.area))];
  const uniqueBHKs = [...new Set(propertiesData.map((prop) => prop.bhk))];
  const uniqueBudgets = [...new Set(propertiesData.map((prop) => prop.price))];

  return (
    <div className="w-full overflow-x-hidden">
      <div className="bg-black text-white min-h-screen">
        <Header />
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
            <PropertyList properties={filteredProperties} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display_D;
