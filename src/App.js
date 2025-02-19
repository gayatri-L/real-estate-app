import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Display from "./Pages/Display_D";

const App = () => {

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
