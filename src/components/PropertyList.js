// import React from "react";

// const PropertyList = ({ properties }) => {
//   return (
//     <div className="property-list">
//       <h3>Available Properties</h3>
//       <ul>
//         {properties.map((property) => (
//           <li key={property.id}>
//             <h4>{property.name}</h4>
//             <p>Location: {property.location}</p>
//             <p>Area:{property.area}</p>
//             <p>Price: ₹{property.price.toLocaleString()}</p>
//             <p>BHK: {property.bhk}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
import React from "react";

const PropertyList = ({ properties }) => {
  return (
    <div className="property-list">
      <h3>Available Properties</h3>
      {properties.length === 0 ? (
        <p>No properties found for selected filters.</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h4>{property.name}</h4>
              <p>Location: {property.location}</p>
              <p>Area: {property.area}</p>
              <p>Price: ₹{property.price.toLocaleString()}</p>
              <p>BHK: {property.bhk}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyList;
