const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes =require("./routes/userRoutes")
const jobsRoutes = require("./routes/jobsRoutes")
const proposalRoutes = require("./routes/proposalRoutes")


const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs",jobsRoutes)
app.use("/api/proposal",proposalRoutes)

app.listen(PORT, () => {
  console.log(`server is running :${PORT}`);
});
