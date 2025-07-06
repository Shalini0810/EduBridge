const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Firstname: String,
  LastName: String,
  DoB: Date,
  Gender: String,
  FamIncome: Number,
  EnrollmentDate: Date,
  Class: Number,
  School: Object,
  Height: Number,
  Weight: Number,
  SchoolAttendence: Number,
  PreviousYearMarks: Number,
  RollNo: Number,
});

module.exports = mongoose.model('Student', studentSchema, 'Enrollment Details');
