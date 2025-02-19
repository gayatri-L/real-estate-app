// import React, { useEffect, useState } from "react";
// import Lottie from "lottie-react";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import YourPreferences from "../Components/YourPreferences";
// import { Send } from "@mui/icons-material";
// import useOpenAI from "../hook/useOpenAI";

// const Home = () => {
//   const [showFirstPage, setShowFirstPage] = useState(true);
//   const [animationData, setAnimationData] = useState(null);
//   const [userInput, setUserInput] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const { aiResponse, preferences, fetchAIResponse } = useOpenAI(); // Get AI response & parsed data

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

//   const handleSend = () => {
//     if (userInput.trim() !== "") {
//       setIsSubmitted(true);
//       fetchAIResponse(userInput);
//     }
//   };

//   if (!animationData) return <p className="text-yellow-500">Loading animation...</p>;

//   return (
//     <div className="bg-black min-h-screen text-white flex flex-col">
//       <Header />

//       {showFirstPage ? (
//         <main className="flex flex-col items-center justify-center flex-grow text-center">
//           <h1 className="text-4xl text-yellow-500 font-bold">Hola, Welcome to EstateBuddy</h1>
//           <Lottie animationData={animationData} className="w-48 h-48 sm:w-64 sm:h-64" loop autoplay />
//         </main>
//       ) : (
//         <main className="flex flex-row flex-grow">
//           {/* Sidebar */}
//           <aside className="w-1/4 p-4 flex flex-col relative">
//             <div className="absolute top-0 bottom-0 left-52 w-[2px] bg-yellow-500"></div>
//             <ul className="space-y-2">
//               {["Our Recommendations", "Affordability Check", "Home Loan Eligibility", "Book Consultation", "Sale Property"]
//                 .map((item, index) => (
//                   <li key={index}><p className="hover:text-yellow-500 cursor-pointer py-2">{item}</p></li>
//                 ))}
//             </ul>

//             <div className="flex-grow"></div>

//             <ul className="space-y-2">
//               {["About Us", "Real Estate Guidelines", "RERA Link"].map((item, index) => (
//                 <li key={index}><p className="hover:text-yellow-500 cursor-pointer py-2">{item}</p></li>
//               ))}
//             </ul>
//           </aside>

//           {/* Chat Section */}
//           <section className="w-2/4 p-6 relative flex flex-col justify-center items-center">
//             {/* Lottie Animation - Moves to top-left on Send */}
//             <div className={`transition-all duration-700 ${isSubmitted ? "absolute top-4 left-4 w-20 h-20" : "w-48 h-48"}`}>
//               <Lottie animationData={animationData} loop autoplay />
//             </div>

//             {/* Chat Input Section */}
//             <div className={`transition-all duration-700 w-full ${isSubmitted ? "absolute bottom-6" : "mt-6"}`}>
//               <h2 className="text-xl text-yellow-500 text-center">Hello, How can I help you today?</h2>
//               <div className="mt-4 flex items-center space-x-2 w-full">
//                 <input
//                   type="text"
//                   placeholder="Type your real estate question here..."
//                   className="flex-grow p-3 bg-gray-800 rounded-lg border border-yellow-500 text-white"
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                 />
//                 <button className="align-middle rounded-3xl" onClick={handleSend}>
//                   <Send className="p-1 text-yellow-500" style={{ fontSize: "60px" }} />
//                 </button>
//               </div>
//             </div>

//             {/* AI Response (User Input & Extracted Question) */}
//             {isSubmitted && (
//               <div className="mt-6 p-4 bg-gray-900 text-yellow-500 rounded-lg w-full text-center">
//                 <p><strong>You:</strong> {userInput}</p>
//                 <p><strong>AI:</strong> {aiResponse}</p>
//               </div>
//             )}
//           </section>

//           {/* Right Side - Your Preferences (Display Extracted Data) */}
//           <YourPreferences data={preferences} />
//         </main>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
//import Header from "../Components/Header";
import Footer from "../Components/Footer";
import YourPreferences from "../Components/YourPreferences";
import ChatResponse from "../Components/ChatResponse"; // Import ChatResponse
import useOpenAI from "../hook/useOpenAI";

const Home = () => {
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [animationData, setAnimationData] = useState(null);
  const { fetchAIResponse, preferences } = useOpenAI(); // Fetch AI response

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

  if (!animationData) return <p className="text-yellow-500">Loading animation...</p>;

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
    {/* <Header /> */}

      {showFirstPage ? (
        <main className="flex flex-col items-center justify-center flex-grow text-center">
          <h1 className="text-4xl text-yellow-500 font-bold">Hola, Welcome to EstateBuddy</h1>
          <Lottie animationData={animationData} className="w-48 h-48 sm:w-64 sm:h-64" loop autoplay />
        </main>
      ) : (
        <main className="flex flex-row flex-grow">
          {/* Sidebar */}
          <aside className="w-1/4 p-4 flex flex-col relative">
            <div className="absolute top-0 bottom-0 left-52 w-[2px] bg-yellow-500"></div>
            <ul className="space-y-2">
              {["Our Recommendations", "Affordability Check", "Home Loan Eligibility", "Book Consultation", "Sale Property"]
                .map((item, index) => (
                  <li key={index}><p className="hover:text-yellow-500 cursor-pointer py-2">{item}</p></li>
                ))}
            </ul>
            <div className="flex-grow"></div>
            <ul className="space-y-2">
              {["About Us", "Real Estate Guidelines", "RERA Link"].map((item, index) => (
                <li key={index}><p className="hover:text-yellow-500 cursor-pointer py-2">{item}</p></li>
              ))}
            </ul>
          </aside>

          {/* Chat Section */}
          <ChatResponse animationData={animationData} fetchAIResponse={fetchAIResponse} />

          {/* Right Side - Your Preferences (Display Extracted Data) */}
          <YourPreferences data={preferences} />
          
        </main>
      )}
      <Footer />
    </div>
  );
};

export default Home;

