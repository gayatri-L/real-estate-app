// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const PriceBarChart = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/project-prices")
//       .then((response) => {
//         // Ensure year is a number and format data
//         const formattedData = response.data.map((d) => ({
//           year: Number(d.year),
//           price: d.price,
//         }));
//         setData(formattedData);
//       })
//       .catch((error) => console.error("Error fetching project prices:", error));
//   }, []);

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="year" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="price" fill="#8884d8" name="Project Prices" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default PriceBarChart;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PriceBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/project-prices")
      .then((response) => {
        // Aggregate prices for the same year
        const aggregatedData = response.data.reduce((acc, curr) => {
          const year = Number(curr.year);
          if (acc[year]) {
            acc[year] += curr.price; // Sum prices for the same year
          } else {
            acc[year] = curr.price;
          }
          return acc;
        }, {});

        // Convert object to array format
        const formattedData = Object.keys(aggregatedData).map((year) => ({
          year: Number(year),
          price: aggregatedData[year],
        }));

        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching project prices:", error));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" name="Project Prices" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriceBarChart;
