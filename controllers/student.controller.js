import Student from '../models/student.model.js';

export async function getStudents(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sort = req.query.sort || 'createdAt';

    const students = await Student.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createStudent(req, res) {
  try {
    const { name, roll } = req.body;
    const student = new Student({ name, roll });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateStudent(req, res) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteStudent(req, res) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
