import React from "react";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
      <h2 className="text-xl font-bold">Real Estate</h2>
      <nav className="space-x-6">
        <a href="/" className="hover:text-yellow-500">Home</a>
        <a href="/" className="hover:text-yellow-500">Buy</a>
      </nav>
      <AccountCircle className="text-white" style={{ fontSize: "40px" }} />
    </header>
  );
};

export default Header;
