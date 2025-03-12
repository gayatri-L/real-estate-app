// import React from "react";
// import ImageCarousel from "../Components/ImageCarousel";
// import Header from "../Components/Header";

// const DisplayProperty = () => {
//     const property = {
//       name: "Shiva Heights, Kothrud",
//       zipcode: "413053",
//       images: [
//        "/Images/1.jpg",
//        "/Images/2.jpg",
//        "/Images/4.jpg"
//       ],
//       floorPlans: [
//         "/Images/Floor_Plan.jpg",
//         "/Images/Floor_Plan.jpg",
//         "/Images/Floor_Plan.jpg"
//       ],
//       priceRange: "From 80 Lakhs to 1.25 Cr",
//       configurations: [
//         {
//           type: "1050",
//           hall: "21*21",
//           kitchen: "10*12",
//           bed1: "11*12",
//           bed2: "12*15",
//           bath1: "5*10",
//           bath2: "10*3",
//         },
//         {
//           type: "1050",
//           hall: "21*21",
//           kitchen: "10*12",
//           bed1: "11*12",
//           bed2: "12*15",
//           bath1: "5*10",
//           bath2: "10*3",
//         }
//       ]
//     };
  
//     return (
//     <div >
//         <header className="bg-black text-white p-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
//         <Header />
//       </header>

//       <div className="bg-black text-white p-6">
//         <h2 className="text-xl font-bold text-yellow-400">{property.name} - {property.zipcode}</h2>
//         <div className="grid grid-cols-2 gap-6 mt-4">
//           <div className="h-[300px] flex flex-col justify-between">
//             <h3 className="text-lg font-semibold">Property Pictures</h3>
//             <ImageCarousel images={property.images} />
//           </div>
//           <div className="h-[300px] flex flex-col justify-between">
//             <h3 className="text-lg font-semibold">Floor Plans</h3>
//             <ImageCarousel images={property.floorPlans} />
//           </div>
//         </div>
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Price Range: {property.priceRange}</h3>
//         </div>
//         <div className="mt-4 grid grid-cols-2 gap-6">
//           {property.configurations.map((config, idx) => (
//             <div key={idx}>
//               <h4 className="text-yellow-400 font-bold">Configuration {idx + 1}:</h4>
//               <p>Type: {config.type} Sqft</p>
//               <p>Hall: {config.hall} Sqft</p>
//               <p>Kitchen: {config.kitchen} Sqft</p>
//               <p>Bed 1: {config.bed1} Sqft</p>
//               <p>Bed 2: {config.bed2} Sqft</p>
//               <p>Bath 1: {config.bath1}</p>
//               <p>Bath 2: {config.bath2}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       </div>
//     );
//   };
  
//   export default DisplayProperty;
import React from "react";
import ImageCarousel from "../Components/ImageCarousel";
import Header from "../Components/Header";

const DisplayProperty = () => {
    const property = {
      name: "Shiva Heights, Kothrud",
      zipcode: "413053",
      images: [
       "/Images/1.jpg",
       "/Images/2.jpg",
       "/Images/4.jpg"
      ],
      floorPlans: [
        "/Images/Floor_Plan.jpg",
        "/Images/Floor_Plan.jpg",
        "/Images/Floor_Plan.jpg"
      ],
      priceRange: "From 80 Lakhs to 1.25 Cr",
      configurations: [
        {
          type: "1050",
          hall: "21*21",
          kitchen: "10*12",
          bed1: "11*12",
          bed2: "12*15",
          bath1: "5*10",
          bath2: "10*3",
        },
        {
          type: "1050",
          hall: "21*21",
          kitchen: "10*12",
          bed1: "11*12",
          bed2: "12*15",
          bath1: "5*10",
          bath2: "10*3",
        }
      ]
    };
  
    return (
    <div>
        <header className="bg-black text-white p-4">
          <Header />
        </header>

        <div className="bg-black text-white p-6">
          <h2 className="text-xl font-bold text-yellow-400">{property.name} - {property.zipcode}</h2>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-semibold">Property Pictures</h3>
              <div className="w-[350px] h-[200px]">
                <ImageCarousel images={property.images} />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-semibold">Floor Plans</h3>
              <div className="w-[350px] h-[200px]">
                <ImageCarousel images={property.floorPlans} />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Price Range: {property.priceRange}</h3>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-6">
            {property.configurations.map((config, idx) => (
              <div key={idx}>
                <h4 className="text-yellow-400 font-bold">Configuration {idx + 1}:</h4>
                <p>Type: {config.type} Sqft</p>
                <p>Hall: {config.hall} Sqft</p>
                <p>Kitchen: {config.kitchen} Sqft</p>
                <p>Bed 1: {config.bed1} Sqft</p>
                <p>Bed 2: {config.bed2} Sqft</p>
                <p>Bath 1: {config.bath1}</p>
                <p>Bath 2: {config.bath2}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
    );
};
  
export default DisplayProperty;
