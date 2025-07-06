import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function calcChange(arr) {
  if (!arr || arr.length < 2) return null;
  const prev = arr[arr.length - 2];
  const curr = arr[arr.length - 1];
  if (prev === 0) return null;
  const change = ((curr - prev) / Math.abs(prev)) * 100;
  return change.toFixed(1);
}

const AcademicReport = () => {
  const [studentData, setStudentData] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [subjectInputs, setSubjectInputs] = useState({
    maths: '',
    english: '',
    social: ''
  });

  const { classId } = useParams(); // expecting route like /class/6

  const fetchStudentData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/assessments?grade=${classId}`);
      const transformed = res.data.map(student => ({
        _id: student._id,
        name: student.Name,
        rollNumber: student.RollNo,
        subjects: {
          maths: [student.Maths.Midline, student.Maths.Endline],
          english: [student.English.Midline, student.English.Endline],
          social: [student.Science.Midline, student.Science.Endline]
        }
      }));
      setStudentData(transformed);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [classId]);

  const handleEditClick = (student) => {
    setEditingStudentId(student._id);
    setSubjectInputs({
      maths: student.subjects?.maths?.[1] ?? '',
      english: student.subjects?.english?.[1] ?? '',
      social: student.subjects?.social?.[1] ?? ''
    });
  };

  const handleSubjectChange = (subject, value) => {
    setSubjectInputs((prev) => ({ ...prev, [subject]: value }));
  };

  const handleSave = async (studentId) => {
    const student = studentData.find(s => s._id === studentId);
    const updatedSubjects = {
      Maths: {
        Midline: student.subjects.maths[1],
        Endline: Number(subjectInputs.maths)
      },
      English: {
        Midline: student.subjects.english[1],
        Endline: Number(subjectInputs.english)
      },
      Science: {
        Midline: student.subjects.social[1],
        Endline: Number(subjectInputs.social)
      }
    };

    try {
      await axios.put(`http://localhost:5000/api/assessments/${studentId}`, updatedSubjects);
      fetchStudentData();
      setEditingStudentId(null);
      setSubjectInputs({ maths: '', english: '', social: '' });
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleCancel = () => {
    setEditingStudentId(null);
    setSubjectInputs({ maths: '', english: '', social: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-[#5E5E5E] p-4 md:p-6 overflow-x-auto">
      <h2 className="text-xl font-bold text-[#222222] mb-4">Academic Report - Grade {classId}</h2>
      <table className="w-full text-left min-w-full text-lg align-middle">
        <thead>
          <tr className="text-[#222222] text-xl">
            <th className="py-4 px-4">Student</th>
            <th className="py-4 px-4">Maths</th>
            <th className="py-4 px-4">Maths Δ%</th>
            <th className="py-4 px-4">English</th>
            <th className="py-4 px-4">English Δ%</th>
            <th className="py-4 px-4">Science</th>
            <th className="py-4 px-4">Science Δ%</th>
            <th className="py-4 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, idx) => {
            const rowClass = idx % 2 === 0 ? 'bg-purple-50' : 'bg-pink-50';
            return (
              <tr key={student._id} className={`border-t border-[#E5E5E5] hover:bg-[#FAFAFA] ${rowClass} text-lg`}>
                <td className="py-4 px-4 font-medium text-[#222222]">{student.name}</td>
                {editingStudentId === student._id ? (
                  <>
                    {['maths', 'english', 'social'].map((subject, i) => (
                      <React.Fragment key={i}>
                        <td className="py-4 px-4">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-full rounded border border-[#E5E5E5] px-3 py-2 bg-[#F5F5F5] focus:ring-2 focus:ring-[#007BFF]"
                            value={subjectInputs[subject]}
                            onChange={(e) => handleSubjectChange(subject, e.target.value)}
                            required
                          />
                        </td>
                        <td className="py-4 px-4 text-gray-600">-</td>
                      </React.Fragment>
                    ))}
                    <td className="py-4 px-4">
                      <button
                        className="px-3 py-1 bg-[#28A745] text-white rounded hover:bg-green-600 text-sm font-semibold transition mr-2"
                        onClick={() => handleSave(student._id)}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-semibold transition"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {['maths', 'english', 'social'].map((subject, i) => (
                      <React.Fragment key={i}>
                        <td className="py-4 px-4 text-blue-700 font-semibold">
                          {student.subjects?.[subject]?.[1] ?? '-'}
                        </td>
                        <td className={`py-4 px-4 font-bold ${calcChange(student.subjects?.[subject]) > 0 ? 'text-green-600' : calcChange(student.subjects?.[subject]) < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {calcChange(student.subjects?.[subject])}{calcChange(student.subjects?.[subject]) !== null ? '%' : ''}
                        </td>
                      </React.Fragment>
                    ))}
                    <td className="py-4 px-4">
                      <button
                        className="px-4 py-2 bg-[#007BFF] text-white rounded hover:bg-blue-600 text-sm font-semibold transition"
                        onClick={() => handleEditClick(student)}
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AcademicReport;
