import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  roll: {
    type: Number,
    required: true,
    unique: true,
    min: 1
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
