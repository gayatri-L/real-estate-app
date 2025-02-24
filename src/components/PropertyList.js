
// // import React from "react";

// // const PropertyList = ({ properties }) => {
// //   return (
// //     <div className="property-list">
// //       <h3>Available Properties</h3>
// //       {properties.length === 0 ? (
// //         <p>No properties found for selected filters.</p>
// //       ) : (
// //         <ul>
// //           {properties.map((property) => (
// //             <li key={property.id}>
// //               <h4>{property.name}</h4>
// //               <p>Location: {property.location}</p>
// //               <p>Area: {property.area}</p>
// //               <p>Price: ₹{property.price.toLocaleString()}</p>
// //               <p>BHK: {property.bhk}</p>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default PropertyList;
// import React from "react";

// //Display the Details from fetched data

// const PropertyList = ({ properties }) => {
//   console.log("Properties for list", properties);
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Property List</h2>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2">Project Name</th>
//             <th className="border border-gray-300 px-4 py-2">Location</th>
//             <th className="border border-gray-300 px-4 py-2">BHK Types</th>
//             <th className="border border-gray-300 px-4 py-2">Phone</th>
//             <th className="border border-gray-300 px-4 py-2">Rera Phone</th>
//           </tr>
//         </thead>
//         <tbody>
//           {properties.length > 0 ? (
//             properties.map((property, index) => (
//               <tr key={index} className="text-center">
//                 <td className="border border-gray-300 px-4 py-2">{property.project_name || "N/A"}</td>
//                 <td className="border border-gray-300 px-4 py-2">{property.location || "N/A"}</td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {property.bhk_1 ? "1 BHK, " : ""}
//                   {property.bhk_2 ? "2 BHK, " : ""}
//                   {property.bhk_3 ? "3 BHK" : ""}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">{property.project_phone || "N/A"}</td>
//                 <td className="border border-gray-300 px-4 py-2">{property.rera_phone || "N/A"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center py-4">No properties found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PropertyList;
const PropertyList = ({ properties }) => {
  if (properties.length === 0) {
    return <p className="text-gray-600">No properties found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className=" border border-yellow-500 p-4 rounded-lg shadow-lg bg-gray-900">
          <h2 className="text-lg font-semibold text-white">{property.project_name || "Unnamed Property"}</h2>
          <p className="text-white">Location: {property.location || "Unknown"}</p>
          
          <p className="text-white">
            BHK: 
            {property.bhk_1 ? " 1 BHK" : ""}
            {property.bhk_2 ? " 2 BHK" : ""}
            {property.bhk_3 ? " 3 BHK" : ""}
          </p>
          
          <p className="text-white">Budget: ₹{property.budget ? property.budget.toLocaleString() : "N/A"}</p>

        </div>
      ))}
    </div>
  );
};

export default PropertyList;

