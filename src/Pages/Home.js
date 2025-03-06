

 
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import DemoNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import YourPreferences from "../Components/YourPreferences";
import ChatResponse from "../Components/ChatResponse";
import useOpenAI from "../hook/useOpenAI";
// import ImageSlider from "../Components/ImageSlider";
// import ProjectPriceChart from "./ProjectPriceChart";
// import PropertySearch from "../Components/PropertySearch";
 import SidebarMenu from "../Components/SidebarMenu";
// Import Material-UI Icons
// import MenuIcon from "@mui/icons-material/Menu";
 
const Home = () => {
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [animationData, setAnimationData] = useState(null);
  const { fetchAIResponse, preferences } = useOpenAI();
  const [menuOpen, setMenuOpen] = useState(false); // State for sidebar visibility
 
  useEffect(() => {
    fetch("/assets/CatAnimation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
 
    const timer = setTimeout(() => {
      setShowFirstPage(false);
    }, 2000);
 
    return () => clearTimeout(timer);
  }, []);
 
  if (!animationData) return <p className="text-yellow-400">Loading animation...</p>;
 
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      {/* Navbar at the top */}
      <DemoNavbar />
 
      {showFirstPage ? (
        <main className="flex flex-col items-center justify-center flex-grow text-center">
          <h1 className="text-2xl sm:text-4xl text-yellow-400 font-bold">
            Hola, Welcome to EstateBuddy
          </h1>
          <Lottie animationData={animationData} className="w-40 sm:w-64" loop autoplay />
        </main>
      ) : (
        <main className="flex flex-grow relative">
          {/* Sidebar (Positioned under Navbar, above Footer) */}
          <SidebarMenu isOpen={menuOpen} toggleSidebar={() => setMenuOpen(!menuOpen)} />
 
          {/* Main Content Area */}
          <div className="flex flex-col flex-grow p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
              {/* Chat Section */}
              <div className="md:col-span-2">
                <ChatResponse animationData={animationData} fetchAIResponse={fetchAIResponse} />
              </div>
 
              {/* User Preferences Section */}
              <div className="md:col-span-1">
                <YourPreferences data={preferences} />
              </div>
            </div>
          </div>
        </main>
      )}
      {/* <div className="flex flex-col items-center justify-center flex-grow text-center">
        <ImageSlider projectId={41}/>
        <ImageSlider projectId={40}/>
      </div> */}
 
      {/* <div className="flex flex-col items-center justify-center flex-grow text-center"> */}
        {/* <ProjectPriceChart /> */}
      {/* </div> */}
 
     
      {/* <div className="flex flex-col items-center justify-center flex-grow text-center">
      <PropertySearch/>
      </div> */}
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};
 
export default Home;