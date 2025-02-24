import React from "react";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-6 py-4 border-t border-gray-700 bg-black text-white">
      <h2 className="text-lg text-yellow-500">Real Estate</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm sm:text-base">FOLLOW US ON</span>
        <Facebook className="cursor-pointer hover:text-blue-500" />
        <WhatsApp className="cursor-pointer hover:text-green-500" />
        <Instagram className="cursor-pointer hover:text-pink-500" />
      </div>
    </footer>
  );
};

export default Footer;
