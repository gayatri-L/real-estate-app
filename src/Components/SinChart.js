// // import React, { useEffect, useState } from "react";
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// // import axios from "axios";

// // const SineWaveChart = () => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/project-prices") // Fetch data from backend
// //       .then((response) => {
// //         const fetchedData = response.data;

// //         // Generate Sine Wave Data based on prices
// //         const sineData = fetchedData.map((item, index) => ({
// //           year: item.year,
// //           sineValue: 50000 + 20000 * Math.sin(index), // Adjust amplitude and base value
// //         }));

// //         setData(sineData);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching project prices:", error);
// //       });
// //   }, []);

// //   return (
// //     <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
// //       <h2 className="text-xl font-bold text-center mb-4">Sine Wave Representation</h2>
// //       <ResponsiveContainer width="100%" height={300}>
// //         <LineChart data={data}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="year" tickFormatter={(tick) => tick.toString()} />
// //           <YAxis />
// //           <Tooltip />

// //           {/* Sine Wave Line */}
// //           <Line type="monotone" dataKey="sineValue" stroke="red" strokeWidth={2} strokeDasharray="5 5" />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // };

// // export default SineWaveChart;
// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const SineWaveChart = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/project-prices") // Replace with your actual API
//       .then((response) => {
//         const rawData = response.data;

//         // Normalize prices and generate sine wave effect
//         const maxPrice = Math.max(...rawData.map((d) => d.price));
//         const minPrice = Math.min(...rawData.map((d) => d.price));
        
//         const sineWaveData = rawData.map((d, index) => ({
//           year: d.year,
//           price: ((Math.sin(index) + 1) / 2) * (maxPrice - minPrice) + minPrice, // Sine wave effect
//         }));

//         setData(sineWaveData);
//       })
//       .catch((error) => {
//         console.error("Error fetching project prices:", error);
//       });
//   }, []);

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-bold text-center mb-4">Sine Wave Price Trends</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="year" tickFormatter={(tick) => tick.toString()} />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="price" stroke="red" strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SineWaveChart;
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const SineWaveChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/project-prices") // Replace with your actual API
      .then((response) => {
        setData(response.data); // Use the actual price values
      })
      .catch((error) => {
        console.error("Error fetching project prices:", error);
      });
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Sine Wave Representation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tickFormatter={(tick) => tick.toString()} />
          <YAxis />
          <Tooltip />
          {/* Sine Wave Representation */}
          <Line type="monotone" dataKey="price" stroke="red" strokeWidth={2} dot={{ stroke: 'red', strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SineWaveChart;
