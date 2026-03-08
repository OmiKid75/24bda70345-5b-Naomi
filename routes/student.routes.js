import express from 'express';
import * as controller from '../controllers/student.controller.js';

const router = express.Router();

router.get('/', controller.getStudents);
router.post('/', controller.createStudent);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

export default router;
