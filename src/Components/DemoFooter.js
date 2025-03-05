
// import React from "react";
// import { Email, Facebook, Twitter, Instagram, LinkedIn, Phone } from "@mui/icons-material";

// const DemoFooter = () => {
//   return (
//     <footer className="bg-black text-white py-10 px-6 border-t border-yellow-500">
//       {/* 🔝 New Line at the Top */}
//       {/* <div className="text-center text-gray-400 text-sm pb-4">
//         Your gateway to luxurious real estate opportunities.
//       </div> */}

//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
//         {/* 🏠 Company Info */}
//         <div className="flex flex-col items-center">
//           <h2 className="text-xl font-semibold text-yellow-500">EstateBuddy</h2>
//           <p className="text-sm text-gray-400 mt-2">
//             Your trusted partner in luxury real estate. Find your dream property with ease.
//           </p>
//           {/* 🔗 About Us Link */}
//           <a href="/about" className="text-yellow-500 font-semibold mt-3 hover:underline">
//             About Us
//           </a>
//         </div>

//         {/* 📩 Contact Details */}
//         <div>
//           <h2 className="text-lg font-semibold text-yellow-500">Get In Touch</h2>
//           <p className="text-sm text-gray-400 mt-2">We’re here to assist you 24/7.</p>
//           <div className="flex justify-center md:justify-start items-center gap-3 mt-3">
//             <Phone className="text-yellow-500" />
//             <span className="text-gray-400">+91 98765 43210</span>
//           </div>
//           <div className="flex justify-center md:justify-start items-center gap-3 mt-2">
//             <Email className="text-yellow-500" />
//             <span className="text-gray-400">support@estatebuddy.com</span>
//           </div>
//         </div>

//         {/* 🌎 Social Media */}
//         <div>
//           <h2 className="text-lg font-semibold text-yellow-500">Follow Us</h2>
//           <div className="flex justify-center md:justify-start space-x-4 mt-3">
//             {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform, index) => (
//               <a 
//                 key={index} 
//                 href="/" 
//                 className="text-gray-400 transition-transform transform hover:text-yellow-500 hover:scale-110"
//               >
//                 {platform === "Facebook" && <Facebook fontSize="large" />}
//                 {platform === "Twitter" && <Twitter fontSize="large" />}
//                 {platform === "Instagram" && <Instagram fontSize="large" />}
//                 {platform === "LinkedIn" && <LinkedIn fontSize="large" />}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 🌟 Bottom Section */}
//       <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
//         <p>© {new Date().getFullYear()} EstateBuddy. Crafted with ❤️ for luxury real estate.</p>
//       </div>
//     </footer>
//   );
// };

// export default DemoFooter;
import React from "react";
import { Facebook, Instagram, WhatsApp, Email, Phone } from "@mui/icons-material";

const DemoFooter = () => {
  return (
    <footer className="bg-black text-white py-6 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center border-t border-gray-700">
      {/* Left Section: Company Info */}
      <div className="text-center md:text-left">
        <h2 className="text-xl font-bold text-yellow-400">🏡 EstateBuddy</h2>
        <p className="text-sm text-gray-400 mt-1">Your trusted partner in luxury real estate.</p>
        <a href="/about" className="text-yellow-500 font-semibold mt-2 hover:underline block">About Us</a>
      </div>
      
      {/* Middle Section: Contact Details */}
      <div className="mt-4 md:mt-0 text-center md:text-left">
        <span className="text-sm sm:text-base font-medium">Get In Touch</span>
        <div className="flex items-center gap-2 mt-1">
          <Phone className="text-yellow-500" />
          <span className="text-gray-400">+91 98765 43210</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Email className="text-yellow-500" />
          <span className="text-gray-400">support@estatebuddy.com</span>
        </div>
      </div>
      
      {/* Right Section: Social Media */}
      <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
        <span className="text-md sm:text-base font-medium">Follow us on</span>
        <div className="flex items-center gap-4 mt-2">
          <Facebook className="cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-110" />
          <WhatsApp className="cursor-pointer hover:text-green-500 transition-transform transform hover:scale-110" />
          <Instagram className="cursor-pointer hover:text-pink-500 transition-transform transform hover:scale-110" />
        </div>
      </div>
    </footer>
  );
};

export default DemoFooter;
