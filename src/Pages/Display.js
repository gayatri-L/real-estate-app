import React, { useState, useEffect } from "react";
import PropertyList from "../components/PropertyList";
import PropertyFilters from "../components/PropertyFilters";
import MapComponent from "../components/GoogleMap";

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
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters */}
        <div className="md:w-1/4 bg-gray-800 p-4 rounded-lg text-white">
          <PropertyFilters filters={filters} updateFilter={updateFilter} />
        </div>

        {/* Map */}
        <div className="md:w-3/4">
          <MapComponent center={mapCenter} properties={filteredProperties} />
        </div>
      </div>

      {/* Property List */}
      <div className="mt-4">
        <PropertyList properties={filteredProperties} />
      </div>
    </div>
  );
};

export default Display_D;
