import React from "react";

const PropertyList = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property, index) => (
        <div key={index} className="bg-gray-900 p-4 rounded-lg text-center border border-yellow-500">
          <img src={property.image} alt={property.name} className="w-full rounded-md mb-2" />
          <h4 className="text-lg font-semibold">{property.name}</h4>
          <p className="text-yellow-500">{property.price.toLocaleString()} ₹</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
