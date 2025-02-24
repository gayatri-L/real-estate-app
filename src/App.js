import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import React from "react";
import DisplayImages from "./Components/DisplayImages";
import MultipleImageUpload from "./Components/MultipleImageUpload";
import SingleImageDisplay from "./Components/SingleImageDisplay";
import SingleImageUpload from "./Components/SingleImageUpload";

const App = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Home />}></Route>
       <Route path="/display" element={<DisplayImages />}></Route>
       <Route path="/multiple-upload" element={<MultipleImageUpload />}></Route>
       <Route path="/single-upload" element={<SingleImageUpload />}></Route>
       <Route path="/single-display" element={<SingleImageDisplay />}></Route>
       </Routes>
    </Router>
  );
};

export default App;
