// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { Pool } = require("pg");

// const app = express();
// // const port = 5000;
// app.use(express.json()); 

// // const express = require("express");
// const multer = require("multer");
// // const { Pool } = require("pg");
// // const cors = require("cors");


// // ✅ Add CORS Middleware **Before Routes**
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Frontend URL
//     methods: "GET,POST",
//     allowedHeaders: "Content-Type",
//   })
// );
// // app.use("/uploads", express.static("uploads"));

// // PostgreSQL Database Connection
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
//   });


// app.use(cors());
// app.use(bodyParser.json());

// // ✅ GET API to fetch Project Prices
// app.get("/api/project-prices", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT year, price FROM project_prices ORDER BY year ASC");
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching project prices:", error);
//     res.status(500).send("Server Error");
//   }
// });

// // ✅ POST API to add new Project Price data
// // app.post("/api/project-prices", async (req, res) => {
// //   const { year, price } = req.body;
// //   try {
// //     const result = await pool.query("INSERT INTO project_prices (year, price) VALUES ($1, $2) RETURNING *", [year, price]);
// //     res.json(result.rows[0]);
// //   } catch (error) {
// //     console.error("Error inserting project price:", error);
// //     res.status(500).send("Server Error");
// //   }
// // });
// app.post("/api/project-prices", async (req, res) => {
//     const { year, price } = req.body;
  
//     // Check if year and price are provided
//     if (!year || !price) {
//       return res.status(400).json({ error: "Year and Price are required!" });
//     }
  
//     try {
//       const result = await pool.query(
//         "INSERT INTO project_prices (year, price) VALUES ($1, $2) RETURNING *",
//         [year, price]
//       );
//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error("Error inserting project price:", error);
//       res.status(500).send("Server Error");
//     }
//   });
  

// // ✅ Start Express Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const multer = require("multer");

const app = express();

// ✅ Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

// ✅ PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// ✅ Debugging: Log Incoming Requests
app.use((req, res, next) => {
  console.log("Incoming Request:");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// ✅ POST API to add new Project Price data
app.post("/api/project-prices", async (req, res) => {
  const { year, price } = req.body;

  // Check if year and price are provided
  if (!year || !price) {
    return res.status(400).json({ error: "Year and Price are required!" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO project_prices (year, price) VALUES ($1, $2) RETURNING *",
      [year, price]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting project price:", error);
    res.status(500).send("Server Error");
  }
});
app.get("/api/project-prices", async (req, res) => {
    try {
      const result = await pool.query("SELECT year, price FROM project_prices ORDER BY year ASC");
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching project prices:", error);
      res.status(500).send("Server Error");
    }
  });
  

// ✅ Start Express Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
