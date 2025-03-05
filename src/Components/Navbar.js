import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Navbar = () => {
  return (
    <nav className="bg-black text-white py-4 px-6 sm:px-8 md:px-16 lg:px-24 flex items-center justify-between border-b border-gray-700 relative">
    
{/* Left Side: Brand Name (Visible on Desktop) */}
{/* <div className="text-xl font-bold text-yellow-400 hidden sm:block">Real Estate Buddy</div> */}

{/* Mobile Centered Brand Name */}
<div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-yellow-400">
  Real Estate Buddy
</div>

      {/* Center: Navigation Links (Responsive) */}
      <div className="hidden lg:flex space-x-6 text-lg font-semibold">
        <a href="/" className="hover:text-yellow-500">Home</a>
      </div>

      {/* Right Side: Brand & Mobile Menu */}
      <div className="ml-auto flex items-center gap-2 cursor-pointer"> 
          <AccountCircleIcon fontSize="large" className="text-yellow-400" />
      </div> 
    </nav>
  );
};

export default Navbar;
