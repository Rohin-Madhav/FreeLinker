const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobsRoutes = require("./routes/jobsRoutes")


const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/jobs",jobsRoutes)

app.listen(PORT, () => {
  console.log(`server is running :${PORT}`);
});
