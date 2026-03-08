import Student from "../models/student.model.js";

/* GET students */
export const getStudents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;

    const students = await Student.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Student.countDocuments();

    res.render("students/index", {
      students,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

/* CREATE student */
export const createStudent = async (req, res) => {
  try {
    await Student.create(req.body);
    res.redirect("/view/students");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/* GET student by ID */
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render("students/edit", { student });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/* UPDATE student */
export const updateStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/view/students");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/* DELETE student */
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/view/students");
  } catch (error) {
    res.status(500).send(error.message);
  }
};