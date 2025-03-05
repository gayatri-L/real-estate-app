
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const PriceScatterChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/project-prices")
      .then((response) => {
        // Ensure year is a number
        const formattedData = response.data.map((d) => ({
          year: Number(d.year),
          price: d.price
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching project prices:", error));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="year" domain={["dataMin", "dataMax"]} />
        <YAxis dataKey="price" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Price Data" data={data} fill="blue" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PriceScatterChart;
