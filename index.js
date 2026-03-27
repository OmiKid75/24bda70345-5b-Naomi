import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import studentApiRoutes from "./routes/student.routes.js";
import studentViewRoutes from "./routes/student.view.routes.js";
import methodOverride from "method-override";


dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(methodOverride("_method"));
// View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/students", studentApiRoutes);
app.use("/view", studentViewRoutes);

// Redirect root to students page
app.get("/", (req, res) => {
  res.redirect("/view/students");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});