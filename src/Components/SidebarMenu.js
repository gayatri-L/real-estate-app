import React, { useState } from "react";
import { Star, CreditCard, Phone, ShoppingBag, Building2, Info, FileText, Link2, Menu, X } from "lucide-react";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const primaryItems=[
    {name: "Home", icon: <Star size={20} />},
    {name:"Buy", icon: <CreditCard size={20} />},
    {name:"Rent", icon: <Building2 size={20} />},
    {name:"Contact", icon: <Phone size={20} />},
  ]

  const menuItems = [
    
    { name: "Our Recommendations", icon: <Star size={20} /> },
    { name: "Affordability Check", icon: <CreditCard size={20} /> },
    { name: "Home Loan Eligibility", icon: <Building2 size={20} /> },
    { name: "Book Consultation", icon: <Phone size={20} /> },
    { name: "Sale Property", icon: <ShoppingBag size={20} /> },
  ];

  const bottomItems = [
    { name: "About Us", icon: <Info size={20} /> },
    { name: "Rera Guidelines", icon: <FileText size={20} /> },
    { name: "Rera Link", icon: <Link2 size={20} /> },
  ];

  return (
    <div>
      {/* Mobile Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white fixed top-4 left-4 z-50">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-auto bg-black text-white p-6 border-r border-gray-700 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:w-64 h-auto w-3/4 sm:w-2/3 md:w-1/2 flex flex-col`}
      >
        {/* Primary Items - Hidden in lg */}
        <ul className="lg:hidden space-y-2">
          {primaryItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2 p-2 hover:text-yellow-500 cursor-pointer">
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
        {/* Main Menu Items */}
        <div className="flex-grow">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2 p-2 hover:text-yellow-500 cursor-pointer">
                {item.icon} {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Items - Stick to Bottom */}
        <div className="mt-auto border-t border-gray-700 pt-4">
          <ul className="space-y-2">
            {bottomItems.map((item, index) => (
              <li key={index} className="flex items-center gap-3 p-2 hover:text-yellow-500 cursor-pointer">
                {item.icon} {item.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SidebarMenu;
