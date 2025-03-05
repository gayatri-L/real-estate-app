
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// Modal.setAppElement("#root");

// const ScatterChartComponent = () => {
//   const [data, setData] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/projects")
//       .then((response) => {
//         console.log("API Response:", response.data); // Debugging Step

//         // const locations = [...new Set(response.data.map(d => d.location))];
//         // const areas = [...new Set(response.data.map(d => d.area))];

//         // const formattedData = response.data.map((d) => ({
//         //   project: d.name,
//         //   location: d.location,  
//         //   area: d.area.split(",")[0],   
//         //   price: parseFloat(d.price),  // Ensure price is a number
//         //   image: d.image,
//         //   locationLabel: d.location,   // Keep original labels for popup
//         //   areaLabel: d.area
//         // }));
       
//         // setData(formattedData);
//         const areaMapping = {
//           hadpasar:1,
//           kothrud:2,
//           hinjewadi:3,
//           kharadi:4,
//           chinchwad:5,
//           yerwada:6,
//           airoli:7,
//           vikroli:8
//         }
//         const formattedData = response.data.map((d,index) => {
//           const location = d.location.trim().toLowerCase(); // Normalize location
          
//           let standardizedLocation = "Other";
//           let locationValue=0; // Default fallback
        
//           if (location.includes("pune")) {
//             standardizedLocation = "Pune";
//             locationValue=1;
//           } else if (location.includes("mumbai")) {
//             standardizedLocation = "Mumbai";
//             locationValue=2;
//           } else {
//             standardizedLocation = d.location.trim(); // Keep other locations unchanged
//           }
        
//           return {
//             project: d.name,
//             location: standardizedLocation,
//             locationValue:areaMapping[d.area.trim().toLowerCase()],
//             area: d.area.trim().split(",")[0].toLowerCase(),
//             price: parseFloat(d.price),
//             image: d.image,
//             locationLabel: d.location,
//             areaLabel: d.area,
//             jitter:index * 0.1
//           };
//         });
        
//         setData(formattedData);  
//         console.log("Formatted Data:", formattedData);      
//       })
//       .catch((error) => console.error("Error fetching project data:", error));
//   }, []);

//   const handlePlotClick = (project) => {
//     console.log("Clicked Project:", project); // Debugging Step
//     setSelectedProject(project.payload);
//     setModalIsOpen(true);
//   };
//   // const uniqueXValues = ["Pune", "Mumbai", ...new Set(data.map(d => d.location).filter(loc => loc !== "Pune" && loc !== "Mumbai"))];
//   const uniqueYValues = [...new Set(data.map(d => d.area))].sort();
  

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg justify-center">
//       <h2 className="text-xl font-bold mb-4 text-center">Project Price Scatter Chart</h2>

//       <ResponsiveContainer width="50%" height={400} className="mx-auto">
//         <ScatterChart>
//           <CartesianGrid strokeDasharray={"3 3"} />
//           {/* X-Axis: Location (Categorical) */}
//           <XAxis type="number" dataKey="locationValue" ticks={[1, 2]} domain={[0.5, 2.5]} tickFormatter={(value) => value === 1 ? "Pune" : "Mumbai"} />

//            {/* Y-Axis: Area (Categorical) */}          
//           <YAxis type="category" dataKey="area" categories={uniqueYValues} name="Area" width={120} tick={{fontSize:14}} />


//           <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ payload }) => {
//             if (payload && payload.length) {
//               return (
//                 <div className="bg-white p-2 shadow-md border rounded">
//                   <p className="font-bold">{payload[0].payload.project}</p>
//                 </div>
//               );
//             }
//             return null;
//           }} />
//           <Scatter name="Projects" data={data} 
//           shape={({ cx, cy, payload }) => (
//             <circle cx={cx} cy={cy} r={5} fill={payload.location === "Mumbai" ? "red" : "blue"} />
//           )} 
//           onClick={handlePlotClick} />
//         </ScatterChart>
//       </ResponsiveContainer>

//       {/* Modal for Project Details */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96 text-center"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//       >
//         {selectedProject && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">{selectedProject.project}</h2>
//             <img 
//               src={selectedProject.image} 
//               alt={selectedProject.project} 
//               className="w-64 h-40 object-cover mx-auto mb-4 rounded-lg" 
//             />
//             <p><strong>Price:</strong> ₹{selectedProject.price.toLocaleString()}</p>
//             <p><strong>Area:</strong> {selectedProject.areaLabel}</p>
//             <p><strong>Location:</strong> {selectedProject.locationLabel}</p>
//             <button 
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
//               onClick={() => setModalIsOpen(false)}
//             >
//               Close
//             </button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ScatterChartComponent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

Modal.setAppElement("#root");

const ScatterChartComponent = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((response) => {
        console.log("API Response:", response.data);

       

        const formattedData = response.data.map((d,index) => {
          const location = d.location.trim().toLowerCase();
          let standardizedLocation = "Other";
          let locationValue = 0; // Default fallback

          if (location.includes("pune")) {
            standardizedLocation = "Pune";
            locationValue = 1;
          } else if (location.includes("mumbai")) {
            standardizedLocation = "Mumbai";
            locationValue = 2;
          } else {
            standardizedLocation = d.location.trim();
          }

          return {
            project: d.name,
            location: standardizedLocation,
            locationValue: locationValue, // Default 0 if area not found
            area: d.area.trim().split(",")[0].toLowerCase(),
            price: parseFloat(d.price),
            image: d.image,
            locationLabel: d.location,
            areaLabel: d.area,
            // jitter:Math.random()*0.1, // Small variation to prevent overlap
          };
        });

        setData(formattedData);
        console.log("Formatted Data:", formattedData);
      })
      .catch((error) => console.error("Error fetching project data:", error));
  }, []);

  const handlePlotClick = (project) => {
    console.log("Clicked Project:", project);
    setSelectedProject(project.payload);
    setModalIsOpen(true);
  };

  // Get unique Y-axis values (Areas)
  const uniqueYValues = [...new Set(data.map((d) => d.area))].sort();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg justify-center">
      <h2 className="text-xl font-bold mb-4 text-center">
        Project Price Scatter Chart
      </h2>

      <ResponsiveContainer width="60%" height={400} className="mx-auto">
        <ScatterChart>
          <CartesianGrid strokeDasharray={"3 3"} />

          {/* X-Axis: Location */}
          <XAxis
            type="number"
            dataKey="locationValue"
            ticks={[1, 2]}
            domain={[0.5, 2.5]}
            tickFormatter={(value) =>
              value === 1 ? "Pune" : value === 2 ? "Mumbai" : "Other"
            }
          />

          {/* Y-Axis: Area */}
          <YAxis
            type="category"
            dataKey="area"
            categories={uniqueYValues}
            name="Area"
            width={140}
            tick={{ fontSize: 14 }}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ payload }) => {
              if (payload && payload.length) {
                const projectData = payload[0].payload;
                return (
                  <div className="bg-white p-2 shadow-md border rounded">
                    <p className="font-bold">{projectData.project}</p>
                    {/* <p>Price: ₹{projectData.price.toLocaleString()}</p> */}
                    {/* <p>Location: {projectData.locationLabel}</p> */}
                    {/* <p>Area: {projectData.areaLabel}</p> */}
                  </div>
                );
              }
              return null;
            }}
          />

          {/* Scatter Plot */}
          <Scatter
            name="Projects"
            data={data}
            shape={({ cx, cy, payload }) => (
              <circle
                cx={cx}
                cy={cy}
                r={6}
                fill={payload.location === "Mumbai" ? "red" : "blue"}
              />
            )}
            onClick={handlePlotClick}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Modal for Project Details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96 text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedProject && (
          <div>
            <h2 className="text-xl font-bold mb-4">{selectedProject.project}</h2>
            <img
              src={selectedProject.image}
              alt={selectedProject.project}
              className="w-64 h-40 object-cover mx-auto mb-4 rounded-lg"
            />
            <p>
              <strong>Price:</strong> ₹{selectedProject.price.toLocaleString()}
            </p>
            <p>
              <strong>Area:</strong> {selectedProject.areaLabel}
            </p>
            <p>
              <strong>Location:</strong> {selectedProject.locationLabel}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ScatterChartComponent;
