import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  Baseline: Number,
  Midline: Number,
  Endline: Number
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
  RollNo: Number,
  Name: String,
  Grade: Number,
  Maths: subjectSchema,
  Science: subjectSchema,
  Hindi: subjectSchema,
  English: subjectSchema
}, { collection: 'Academic_Assessment' });

export default mongoose.model('AcademicAssessment', assessmentSchema);
