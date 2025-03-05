const express = require("express");
const { Sequelize, DataTypes, Op } = require("sequelize");

// Initialize Express
const app = express();
app.use(express.json());

// Connect to PostgreSQL
const sequelize = new Sequelize("realestate", "postgres", "Ashwini@26", {
  host: "localhost",
  dialect: "postgres",
});

// Define the Project model
const Project = sequelize.define(
  "projects",
  {
    project_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    area: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
  },
  {
    tableName: "projects",
    timestamps: false, // ✅ Fix: Disables `createdAt` & `updatedAt`
  }
);

// ✅ API Endpoint with Filtering, Sorting, Limit, and Offset
app.get("/projects", async (req, res) => {
  const { filter, sort, limit, offset } = req.query;

  let where = {};
  if (filter) {
    const match = filter.match(/(\w+)\s+eq\s+'(.+)'/);
    if (match) {
      const [, field, value] = match;
      where[field] = { [Op.eq]: value }; // ✅ Fixing Sequelize equality condition
    }
  }

  let order = [];
  if (sort) {
    const [field, direction] = sort.split(" ");
    if (["ASC", "DESC"].includes(direction.toUpperCase())) {
      order.push([field, direction.toUpperCase()]);
    }
  }

  try {
    const projects = await Project.findAll({
      where,
      order,
      limit: limit ? parseInt(limit) : undefined, // ✅ Convert limit to number
      offset: offset ? parseInt(offset) : undefined, // ✅ Convert offset to number
    });

    // console.log("Filtered Projects:", projects);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(5000, async () => {
  await sequelize.sync();
  console.log("✅ API running at http://localhost:5000/projects");
});
