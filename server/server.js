const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const noteRoutes = require("./routes/noteRoutes");


const app = express();

// connecting the database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// our routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/notes", require("./routes/noteRoutes"));
app.post("/api/test-notes", (req,res)=>{
  res.json({message:"notes route works"});
});

app.get("/", (req, res) => {
  res.send("Deskaura API is running 🚀");
});

 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});