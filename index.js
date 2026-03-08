import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import methodOverride from "method-override";

import { connectDB } from "./config/db.js";
import studentRoutes from "./routes/student.routes.js";
import viewRoutes from "./routes/student.view.routes.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* View Engine */
app.set("view engine", "ejs");

/* Routes */
app.use("/students", studentRoutes);
app.use("/view", viewRoutes);

/* DB Connection */
connectDB();

/* Server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.redirect("/view/students");
});