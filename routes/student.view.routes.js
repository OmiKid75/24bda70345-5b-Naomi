import express from 'express';
import Student from '../models/student.model.js';

const router = express.Router();

// list + create via form
router.get('/', async (req, res) => {
  const students = await Student.find().sort('roll');
  res.render('students/index', { students });
});

router.post('/', async (req, res) => {
  try {
    const { name, roll } = req.body;
    await Student.create({ name, roll });
  } catch (err) {
    console.error(err.message);
  }
  res.redirect('/view/students');
});

// edit form
router.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.redirect('/view/students');
  res.render('students/edit', { student });
});

router.post('/edit/:id', async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
  } catch (err) {
    console.error(err.message);
  }
  res.redirect('/view/students');
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.error(err.message);
  }
  res.redirect('/view/students');
});

export default router;
