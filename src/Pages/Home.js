// import React, { useEffect, useState } from "react";
// import Lottie from "lottie-react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import YourPreferences from "../Components/YourPreferences";
// import ChatResponse from "../Components/ChatResponse";
// import useOpenAI from "../hook/useOpenAI";

// // Import Material-UI Icons
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import SidebarMenu from "../Components/SidebarMenu";

// const Home = () => {
//   const [showFirstPage, setShowFirstPage] = useState(true);
//   const [animationData, setAnimationData] = useState(null);
//   const { fetchAIResponse, preferences } = useOpenAI();

//   const [menuOpen, setMenuOpen] = useState(false); // State for sidebar visibility

//   useEffect(() => {
//     fetch("/assets/CatAnimation.json")
//       .then((response) => response.json())
//       .then((data) => setAnimationData(data))
//       .catch((error) => console.error("Error loading animation:", error));

//     const timer = setTimeout(() => {
//       setShowFirstPage(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (!animationData) return <p className="text-yellow-500">Loading animation...</p>;

//   return (
//     <div className="bg-black min-h-screen text-white flex flex-col">
//       <Navbar />

//       {showFirstPage ? (
//         <main className="flex flex-col items-center justify-center flex-grow text-center">
//           <h1 className="text-2xl sm:text-4xl text-yellow-500 font-bold">
//             Hola, Welcome to EstateBuddy
//           </h1>
//           <Lottie animationData={animationData} className="w-40 sm:w-64" loop autoplay />
//         </main>
//       ) : (
//         <main className="flex flex-col md:flex-row flex-grow relative">
//           {/* Burger Menu Button (Only for Mobile) */}
//           <button
//             className="lg:hidden fixed top-4 left-4 text-yellow-500 z-50"
//             onClick={() => setMenuOpen(true)}
//           >
//             <MenuIcon fontSize="large" />
//           </button>
//           <SidebarMenu/>

//           {/* <aside
//             className={`fixed top-0 left-0 h-full bg-black text-white z-50 p-6 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
//               } transition-transform duration-300 ease-in-out 
//   lg:relative lg:translate-x-0 lg:w-1/5 border-r-2 lg:border-yellow-500 flex flex-col`}
//           >
//             {/* Close Button (Only for Mobile) */}
//             {/* <button
//               className="lg:hidden absolute top-4 right-4 text-yellow-500"
//               onClick={() => setMenuOpen(false)}
//             >
//               <CloseIcon fontSize="large" />
//             </button> */}

//             {/* Navigation List */}
//             {/* <ul className="space-y-4 mt-10 flex-grow">
//               {[
//                 "Our Recommendations",
//                 "Affordability Check",
//                 "Home Loan Eligibility",
//                 "Book Consultation",
//                 "Sale Property",
//               ].map((item, index) => (
//                 <li
//                   key={index}
//                   className="p-2 hover:text-yellow-500 cursor-pointer"
//                 >
//                   <p className="text-lg">{item}</p>
//                 </li>
//               ))}
//             </ul> */}

//             {/* Footer Section (Second Menu) */}
//             {/* <ul className="space-y-4 pt-4">
//               {["About Us", "Real Estate Guidelines", "RERA Link"].map((item, index) => (
//                 <li
//                   key={index}
//                   className="py-3 px-4 hover:text-yellow-500 "
//                 >
//                   <p className="text-lg">{item}</p>
//                 </li>
//               ))}
//             </ul>
//           </aside>  */}

//           {/* Chat Section & Preferences */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow p-4">
//             <div className="md:col-span-2">
//               <ChatResponse animationData={animationData} fetchAIResponse={fetchAIResponse} />
//             </div>

//             <div className="md:col:span-1">
//               <YourPreferences data={preferences} />
//             </div>
//           </div>
//         </main>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import YourPreferences from "../Components/YourPreferences";
import ChatResponse from "../Components/ChatResponse";
import useOpenAI from "../hook/useOpenAI";

// Import Material-UI Icons
// import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenu from "../Components/SidebarMenu";

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
      <Navbar />

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

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Home;
