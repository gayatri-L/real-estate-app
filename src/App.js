
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DisplayImages from "./Components/DisplayImages";
import MultipleImageUpload from "./Components/MultipleImageUpload";
import SingleImageDisplay from "./Components/SingleImageDisplay";
import SingleImageUpload from "./Components/SingleImageUpload";
import Display from "./Pages/Display";
import PropertySearch from "./Components/PropertySearch";
import Project from "./Components/ImageSwapper1";
import ProjectPriceChart from "./Pages/ProjectPriceChart"; // ✅ Import ProjectPriceChart
import SinChartdisplay from "./Components/SinChart";
import PriceScatterChart from "./Components/PriceScatterChart";
import PriceBarChart from "./Components/PriceBarChart";
import ScatterChartComponent from "./Components/ScatterChartComponent";
import Organizations from "./Components/Organizations";
// import MultiStageForm1 from "./Components/MultiStageForm1";
// import DisplayImages from "./components/DisplayImages";
// import MultipleImageUpload from "./components/MultipleImageUpload";
// import SingleImageDisplay from "./components/SingleImageDisplay";
// import SingleImageUpload from "./components/SingleImageUpload";
import PropertySearch1 from "./Pages/PropertySearch";
import VersionDisplay from "./Pages/Version2_Display";
import WingDetails from "./Components/wing_details";
import ShowNeedle from "./Components/showneedle"
import FormDataInput from "./Pages/FormData";
import MultiStageForm from "./Components/MultiStageForm";
import ProjectList from "./Pages/PropertyAllData";
import LatestEntity from "./Components/LatestEntity";
import "./App.css";
import DisplayProperty from "./Pages/DisplayProperty";
import PostwithForm from "./Pages/PostwithForm";


const App = () => {
  return (
   // <Router>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Display" element={<Display />} />
        <Route path="/DisplayImages" element={<DisplayImages />} />
        <Route path="/multiple-upload" element={<MultipleImageUpload />} />
        <Route path="/single-upload" element={<SingleImageUpload />} />
        <Route path="/single-display" element={<SingleImageDisplay />} />
        <Route path="/property-search" element={<PropertySearch />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/project-price-chart" element={<ProjectPriceChart />} /> {/* ✅ Added Route */}
        <Route path="/sin-chart-display" element={<SinChartdisplay />} />
        <Route path="/price-scatter-chart" element={<PriceScatterChart />} />
        <Route path="/price-bar-chart" element={<PriceBarChart />} />
        <Route path="/scatter-chart" element={<ScatterChartComponent />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/version-display" element={<VersionDisplay />}></Route>
        <Route path="/show-needle" element={<ShowNeedle />}></Route>
        <Route path="/property-search" element={<PropertySearch1 />}></Route>
       <Route path="/wing-details" element={<WingDetails />}></Route>
       <Route path="/show-formdata" element={<FormDataInput />}></Route>
       {/* <Route path="/multi-stage-form" element={<MultiStageForm1 />}></Route> */}
      <Route path="/ShowForm" element={<MultiStageForm />}></Route>
      <Route path="/project-list" element={<ProjectList />}></Route>
      <Route path="/latest-entity" element={<LatestEntity />}></Route>
      <Route path="/display-property" element={<DisplayProperty />}></Route>
      <Route path="/post-with-form" element={<PostwithForm/>}></Route>
      </Routes>
       {/* <Route path="/" element={<Home />}></Route>
       <Route path="/displayimages" element={<DisplayImages />}></Route>
       <Route path="/multiple-upload" element={<MultipleImageUpload />}></Route>
       <Route path="/single-upload" element={<SingleImageUpload />}></Route>
       <Route path="/single-display" element={<SingleImageDisplay />}></Route>
       </Routes> */}
    </Router>
   
  );
};

export default App;
