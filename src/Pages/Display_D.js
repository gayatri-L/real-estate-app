import React, { useState,useEffect } from "react";
import PropertyFilters from "../Components/PropertyFilters";
import PropertyList from "../Components/PropertyList";
import GoogleMap from "../Components/GoogleMap";
import { useLocation } from "react-router-dom";
 
const Display_D = () => {
  const [filteredProperties, setFilteredProperties] = useState([
    { name: "Rose Shine", price: 6300000, image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"},
    { name: "Sunshine", price: 5000000, image: "https://images.pexels.com/photos/14495927/pexels-photo-14495927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  ]);
  const location = useLocation();
  const data = location.state || {}; // Get passed data

  useEffect(() => {
    console.log("Received Data:", data); // ✅ Log data when component loads
  }, [data]);
 
  return (
    <body className="w-full overflow-x-hidden">
    <div className="bg-black text-white min-h-screen">
      {/* Responsive Layout */}
      <div className="p-4 flex flex-col md:flex-row gap-4">
        {/* Filters on Top in Mobile, Sidebar in Desktop */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <PropertyFilters onFilterChange={setFilteredProperties} />
        </div>
 
        {/* Map & Property Listings */}
        <div className="flex-1 flex flex-col gap-4">
          <GoogleMap />
          <PropertyList properties={filteredProperties} />
        </div>
      </div>
    </div>
    </body>
  );
};
 
export default Display_D;
 
 