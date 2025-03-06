
import React from "react";
import { WhatsApp, Facebook, Instagram } from "@mui/icons-material";
 
const DemoFooter = () => {
  return (
    <footer className=" text-white py-6 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center border-t border-gray-700">
      <div className="text-center md:text-left">
        <h2 className="text-xl font-bold text-yellow-400">🏡 Real Estate Buddy</h2>
        <p className="text-sm text-gray-400 mt-1">Finding your dream home, made easy.</p>
      </div>
      
      <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
        <span className="text-sm sm:text-base font-medium">Follow us on</span>
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