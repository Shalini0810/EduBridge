// controllers/bmiController.js
import Student from '../models/student.js';

export const getAllBMIRecords = async (req, res) => {
  try {
    const students = await Student.find({}, {
      Firstname: 1,
      RollNo: 1,
      Height: 1,
      Weight: 1
    });

    const bmiData = students.map(student => ({
      _id: student._id,
      studentId: {
        _id: student._id,
        Name: student.Firstname,
        RollNo: student.RollNo
      },
      height: student.Height,
      weight: student.Weight
    }));

    res.json(bmiData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch BMI data' });
  }
};

export const updateBMI = async (req, res) => {
  try {
    const { id } = req.params;
    const { height, weight } = req.body;

    const updated = await Student.findByIdAndUpdate(id, {
      Height: height,
      Weight: weight
    }, { new: true });

    if (!updated) return res.status(404).json({ error: 'Student not found' });

    res.json({ message: 'BMI updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update BMI' });
  }
};
