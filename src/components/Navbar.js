import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold ml-4">Real Estate</h1>
      <div className="flex space-x-4 mr-4">
        <a href="/" className="hover:text-yellow-400">Home</a>
        <a href="/buy" className="hover:text-yellow-400">Buy</a>
      </div>
    </nav>
  );
};

export default Navbar;
