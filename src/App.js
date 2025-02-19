import React, { useState } from "react";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from "./Pages/Home";
import Display_D from "./Pages/Display_D";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YourPreferences from "./Components/YourPreferences";
import Display from "./Pages/Display_D";

const App = () => {

  const userData = { bedrooms: "3", budget: "50L", location: "Mumbai" }; // Example data

  return (
    <Router> {/* ✅ Wrap everything inside Router */}
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Route path="/" element={<YourPreferences data={userData} />} /> */}
        <Route path="/Display_D" element={<Display />} />
      </Routes>
    </Router>
    
  );
};

export default App;
