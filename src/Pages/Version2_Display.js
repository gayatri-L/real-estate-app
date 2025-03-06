import React, { useState, useEffect } from "react";
import PropertyDetails from "../components/PropertyDetails";
import PropertyDropdowns from "../components/Propertydropdowns";
import MapComponent from "../components/GoogleMap";
import DemoNavbar from "../components/Navbar";
//import DemoFooter from "../components/Footer";

const Display_D = () => {
  // States for filters and properties
  const [filters, setFilters] = useState({
    location: "",
    bhk: "",
    budget:100000000,
  });

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune Default

  // Fetch properties from backend when component loads
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/full-details");
        const data = await response.json();

        // Ensure valid latitude & longitude
        const validProperties = data.map((property) => ({
          ...property,
          latitude: parseFloat(property.latitude),
          longitude: parseFloat(property.longitude),
          bhk: property.bhk_1 || property.bhk_2 || property.bhk_3, // Ensure BHK status
          name: property.project_name, // Ensure name is sent
          image:property.bhk2_type1_images,
        }));

        setAllProperties(validProperties);
        setFilteredProperties(validProperties); // Initially display all properties

        // Set map to the first property if available
        if (validProperties.length > 0) {
          setMapCenter({
            lat: validProperties[0].latitude,
            lng: validProperties[0].longitude,
          });
        }
        console.log("DATa",validProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Apply filters dynamically
  useEffect(() => {
    const applyFilters = () => {
      const { location, bhk, budget  } = filters;

      const filtered = allProperties.filter((property) => {
        const matchesLocation =
          !location || property.location.toLowerCase().includes(location.toLowerCase());
        const matchesBHK =
          !bhk ||
          (bhk === "1" && property.bhk_1) ||
          (bhk === "2" && property.bhk_2) ||
          (bhk === "3" && property.bhk_3);

        const matchesBudget = !budget || property.budget <= budget;

        return matchesLocation && matchesBHK  && matchesBudget;
      });

      setFilteredProperties(filtered);

      // Update map center based on the first filtered property
      if (filtered.length > 0) {
        setMapCenter({
          lat: filtered[0].latitude,
          lng: filtered[0].longitude,
        });
      }
    };

    applyFilters();
  }, [filters, allProperties]);

  // Update filter handler
  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  return (
   
    <div className="w-full p-4 bg-black min-h-screen">
    <DemoNavbar />

    {/* Horizontal Filter Section */}
    <div className="flex justify-center items-center gap-4 bg-black p-4 rounded-lg mt-4">
      <PropertyDropdowns filters={filters} updateFilter={updateFilter} />
    </div>

    {/* Map and Properties Section */}

      {/* Map Section */}
      <div className="w-full h-96 mb-4">
        <MapComponent center={mapCenter} properties={filteredProperties} />
      </div>

      {/* Property List */}
      <div className="w-full p-4 mb-4">
        <PropertyDetails properties={filteredProperties} />
      </div>
 

  </div> 
  );
};

export default Display_D;
