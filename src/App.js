import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import React from "react";
import DisplayImages from "./components/DisplayImages";
import MultipleImageUpload from "./components/MultipleImageUpload";
import SingleImageDisplay from "./components/SingleImageDisplay";
import SingleImageUpload from "./components/SingleImageUpload";
import PropertySearch from "./Pages/PropertySearch";
import VersionDisplay from "./Pages/Version2_Display";
import WingDetails from "./components/wing_details";
import ShowNeedle from "./components/showneedle"
import FormDataInput from "./Pages/FormData";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Home />}></Route>
       <Route path="/displayimages" element={<DisplayImages />}></Route>
       <Route path="/multiple-upload" element={<MultipleImageUpload />}></Route>
       <Route path="/single-upload" element={<SingleImageUpload />}></Route>
       <Route path="/single-display" element={<SingleImageDisplay />}></Route>
       <Route path="/property-search" element={<PropertySearch />}></Route>
       <Route path="/version-display" element={<VersionDisplay />}></Route>
       <Route path="/wing-details" element={<WingDetails />}></Route>
       <Route path="/show-needle" element={<ShowNeedle />}></Route>
       <Route path="/show-formdata" element={<FormDataInput />}></Route>
       </Routes>
    </Router>
   
  );
};

export default App;
