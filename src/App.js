import React from "react";
import Home from "./Pages/Home"; // Import Home page
import Display from "./Pages/Display"; // Import Display page
import Footer from "./components/Footer"
//import Search from "./Pages/SearchOrganization";

const App = () => {
  return (
    <body className="w-full overflow-x-hidden">
      <Home/>
    {/* </div> */}
    <Display/>
          {/* <Search/> */}
    <Footer/>
    </body>
  );
};

export default App;
