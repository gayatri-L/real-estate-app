// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const ProjectPriceChart = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/project-prices") // Fetch data from backend
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching project prices:", error);
//       });
//   }, []);

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-bold text-center mb-4">Project Price Trends</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="year" tickFormatter={(tick) => tick.toString()} />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ProjectPriceChart;
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const ProjectPriceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/project-prices") // Fetch data from backend
      .then((response) => {
        const fetchedData = response.data;

        // Generate Sine Wave Data based on the years
        const updatedData = fetchedData.map((item, index) => ({
          ...item,
          sineValue: 50000 + 20000 * Math.sin(index), // Adjust amplitude and frequency
        }));

        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching project prices:", error);
      });
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Project Price Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tickFormatter={(tick) => tick.toString()} />
          <YAxis />
          <Tooltip />

          {/* Line Graph for Actual Prices */}
          <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} />

          {/* Sine Wave Graph */}
          <Line type="monotone" dataKey="sineValue" stroke="red" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectPriceChart;
