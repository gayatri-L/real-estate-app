import React from "react";
import Home from "./Pages/Home"; // Import Home page
import Display from "./Pages/Display_D"; // Import Display page
import Footer from "./components/Footer"

//import GoogleMap from "./components/GoogleMap";


const App = () => {
  return (
    <body className="w-full overflow-x-hidden">
    {/* <div className="bg-black text-white min-h-screen"> */}
      {/* <Header/> */}
      {/* Responsive Layout */}
      {/* <div className="p-4 flex flex-col md:flex-row gap-4"> */}
        {/* Filters on Top in Mobile, Sidebar in Desktop */}
        {/* <div className="w-full md:w-1/3 lg:w-1/4">
          <PropertyFilters onFilterChange={setFilteredProperties} />
        </div> */}
 
        {/* Map & Property Listings */}
        {/* <div className="flex-1 flex flex-col gap-4">
          <GoogleMap />
          <PropertyList properties={filteredProperties} />
        </div> */}
      {/* </div> */}
      <Home/>
    {/* </div> */}
    <Display/>
    <Footer/>
    </body>
  );
};

export default App;
