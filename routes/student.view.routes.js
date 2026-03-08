import express from "express";
import Student from "../models/student.model.js";

const router = express.Router();

/* Show students page */
router.get("/students", async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.render("students/index", { students });
});

/* Edit page */
router.get("/students/edit/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("students/edit", { student });
});

export default router;