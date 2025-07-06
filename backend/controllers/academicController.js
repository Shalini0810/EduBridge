import AcademicAssessment from '../models/AcademicAssessment.js';

export const getAllAssessments = async (req, res) => {
  try {
    const students = await AcademicAssessment.find({});
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await AcademicAssessment.findByIdAndUpdate(id, updates, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
