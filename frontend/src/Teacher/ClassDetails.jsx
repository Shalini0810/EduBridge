import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, BookOpen, Activity, BarChart2, Brain, 
  UserCheck, Calendar, ArrowLeft, Edit, Eye, AlertCircle
} from 'lucide-react';
import TeacherLayout from '../components/TeacherRoute';
import SummaryTab from './Summary';
import AttendanceReport from './AttendanceReport';
import MonthlyReport from './MonthlyReport';
import AcademicReport from './AcademicReport';
import BMIRecordTable from './BMIReport';

const students = [
  {
    _id: '1',
    name: 'Aarav Sharma',
    rollNumber: 'R001',
    height: 1.5,
    weight: 45,
    attendance: 95,
    academic: 88,
    behaviour: 'Positive',
    attendanceRecords: [{ date: '2025-06-28', present: true }, { date: '2025-06-29', present: false }],
    subjects: { maths: [85, 88], english: [80, 82], social: [90, 92] }
  },
  {
    _id: '2',
    name: 'Priya Singh',
    rollNumber: 'R002',
    height: 1.4,
    weight: 50,
    attendance: 89,
    academic: 76,
    behaviour: 'Stable',
    attendanceRecords: [{ date: '2025-06-28', present: true }, { date: '2025-06-29', present: true }],
    subjects: { maths: [75, 78], english: [70, 76], social: [80, 85] }
  },
  {
    _id: '3',
    name: 'Rahul Verma',
    rollNumber: 'R003',
    height: 1.6,
    weight: 70,
    attendance: 80,
    academic: 65,
    behaviour: 'Needs Support',
    attendanceRecords: [{ date: '2025-06-28', present: false }, { date: '2025-06-29', present: true }],
    subjects: { maths: [60, 65], english: [65, 68], social: [70, 72] }
  },
  {
    _id: '4',
    name: 'Sneha Patel',
    rollNumber: 'R004',
    height: 1.55,
    weight: 48,
    attendance: 98,
    academic: 92,
    behaviour: 'Positive',
    attendanceRecords: [{ date: '2025-06-28', present: true }, { date: '2025-06-29', present: true }],
    subjects: { maths: [90, 92], english: [85, 88], social: [95, 94] }
  },
  {
    _id: '5',
    name: 'Vikram Das',
    rollNumber: 'R005',
    height: 1.7,
    weight: 80,
    attendance: 92,
    academic: 85,
    behaviour: 'Stable',
    attendanceRecords: [{ date: '2025-06-28', present: true }, { date: '2025-06-29', present: false }],
    subjects: { maths: [80, 85], english: [78, 80], social: [82, 88] }
  }
];


function calculateBMI(weight, height) {
  if (!weight || !height || height <= 0) return '';
  const bmi = weight / (height * height);
  return bmi.toFixed(1);
}

function getBMIStatus(bmi) {
  if (!bmi) return '';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy';
  if (bmi < 30) return 'Monitor';
  return 'Concern';
}

function calculateAttendancePercentage(records) {
  if (!records || records.length === 0) return 0;
  const presentDays = records.filter(r => r.present).length;
  return ((presentDays / records.length) * 100).toFixed(1);
}

const tabs = [
  { key: 'summary', label: 'Summary', icon: <Activity size={18} /> },
  { key: 'bmi', label: 'BMI', icon: <BarChart2 size={18} /> },
  { key: 'attendanceReport', label: 'Attendance', icon: <UserCheck size={18} /> },
  { key: 'academic', label: 'Academic', icon: <BookOpen size={18} /> },
  { key: 'behaviour', label: 'Behaviour', icon: <Brain size={18} /> },
  { key: 'myStudent', label: 'My Students', icon: <Users size={18} /> },
  { key: 'monthlyReport', label: 'Monthly Report', icon: <Calendar size={18} /> }
];

// MyStudentsTab component
const MyStudentsTab = ({ studentData, onViewClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = useMemo(() => {
    return studentData.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [studentData, searchTerm]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-xl">Student List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            aria-label="Search students by name or roll number"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <div 
              key={student._id} 
              className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                  {student.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Roll No: {student.rollNumber}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Attendance:</span>
                  <span className={`ml-2 font-medium ${
                    student.attendance >= 90 ? 'text-green-600 dark:text-green-400' : 
                    student.attendance >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-red-600 dark:text-red-400'
                  }`}>{student.attendance}%</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Academic:</span>
                  <span className={`ml-2 font-medium ${
                    student.academic >= 85 ? 'text-green-600 dark:text-green-400' : 
                    student.academic >= 70 ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-red-600 dark:text-red-400'
                  }`}>{student.academic}%</span>
                </div>
                <div className="text-sm col-span-2">
                  <span className="text-gray-500 dark:text-gray-400">Behaviour:</span>
                  <span className={`ml-2 font-medium ${
                    student.behaviour === 'Positive' ? 'text-green-600 dark:text-green-400' : 
                    student.behaviour === 'Stable' ? 'text-blue-600 dark:text-blue-400' : 
                    'text-orange-600 dark:text-orange-400'
                  }`}>{student.behaviour}</span>
                </div>
              </div>
              
              <button
                onClick={() => onViewClick(student)}
                className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                aria-label={`View details for ${student.name}`}
              >
                <Eye size={16} className="mr-2" />
                View Details
              </button>
            </div>
          ))}
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No students found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

// EditStudentModal component
const EditStudentModal = ({ student, activeTab, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: student.name,
    rollNumber: student.rollNumber,
    height: student.height,
    weight: student.weight,
    behaviour: student.behaviour,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...student, ...form });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4 border-b pb-3 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Student</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={form.rollNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (m)</label>
                <input
                  type="number"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {activeTab === 'behaviour' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Behaviour</label>
                <select
                  name="behaviour"
                  value={form.behaviour}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Positive">Positive</option>
                  <option value="Stable">Stable</option>
                  <option value="Needs Support">Needs Support</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ViewStudentModal component
const ViewStudentModal = ({ student, onClose }) => {
  const bmi = calculateBMI(student.weight, student.height);
  const bmiStatus = getBMIStatus(bmi);
  
  const getBehaviourColor = (behaviour) => {
    switch (behaviour) {
      case 'Positive': return 'text-green-600 dark:text-green-400';
      case 'Stable': return 'text-blue-600 dark:text-blue-400';
      case 'Needs Support': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getBmiStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return 'text-green-600 dark:text-green-400';
      case 'Underweight': return 'text-yellow-600 dark:text-yellow-400';
      case 'Monitor': return 'text-orange-600 dark:text-orange-400';
      case 'Concern': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6 border-b pb-3 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
            {student.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white">{student.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">Roll No: {student.rollNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Attendance</div>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">{student.attendance}%</div>
              <div className={`text-sm ${
                student.attendance >= 90 ? 'text-green-600 dark:text-green-400' : 
                student.attendance >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-red-600 dark:text-red-400'
              }`}>
                {student.attendance >= 90 ? 'Excellent' : 
                 student.attendance >= 80 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Academic Performance</div>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">{student.academic}%</div>
              <div className={`text-sm ${
                student.academic >= 85 ? 'text-green-600 dark:text-green-400' : 
                student.academic >= 70 ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-red-600 dark:text-red-400'
              }`}>
                {student.academic >= 85 ? 'Excellent' : 
                 student.academic >= 70 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">BMI Status</div>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">{bmi || 'N/A'}</div>
              <div className={`text-sm ${getBmiStatusColor(bmiStatus)}`}>
                {bmiStatus || 'Not Available'}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Behaviour</div>
            <div className="flex items-center">
              <div className={`text-2xl font-bold ${getBehaviourColor(student.behaviour)}`}>
                {student.behaviour}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Subject Performance</h4>
          <div className="space-y-3">
            {Object.entries(student.subjects).map(([subject, scores]) => {
              const latestScore = scores[scores.length - 1];
              const previousScore = scores[scores.length - 2] || latestScore;
              const improvement = latestScore - previousScore;
              
              return (
                <div key={subject} className="flex items-center justify-between">
                  <div className="capitalize">{subject}</div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{latestScore}%</span>
                    {improvement !== 0 && (
                      <span className={`text-xs ${improvement > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {improvement > 0 ? `+${improvement}` : improvement}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassDetails = () => {
  const id = "Grade 5A";
  const [activeTab, setActiveTab] = useState('summary');
  const [editStudent, setEditStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [studentData, setStudentData] = useState(students);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleEditClick = (student) => setEditStudent(student);
  const handleModalClose = () => setEditStudent(null);
  const handleModalSave = (updated) => {
    setStudentData(prev => prev.map(s => s._id === updated._id ? { ...s, ...updated } : s));
    setEditStudent(null);
  };
  
  const handleViewClick = (student) => setViewStudent(student);
  const handleViewClose = () => setViewStudent(null);
  
  const handleAttendanceSave = (date, records) => {
    setStudentData(prev => prev.map(student => {
      const newRecord = records[student._id];
      if (newRecord !== undefined) {
        const updatedRecords = [
          ...student.attendanceRecords.filter(r => r.date !== date),
          { date, present: newRecord === 'present' }
        ];
        return {
          ...student,
          attendanceRecords: updatedRecords,
          attendance: calculateAttendancePercentage(updatedRecords)
        };
      }
      return student;
    }));
  };
  
  const handleAcademicUpdate = (studentId, updatedSubjects) => {
    setStudentData(prev => prev.map(student => 
      student._id === studentId 
        ? { 
            ...student, 
            subjects: updatedSubjects,
            academic: Math.round(
              (updatedSubjects.maths[updatedSubjects.maths.length - 1] +
               updatedSubjects.english[updatedSubjects.english.length - 1] +
               updatedSubjects.social[updatedSubjects.social.length - 1]) / 3
            )
          } 
        : student
    ));
  };

  const getBehaviourColor = (behaviour) => {
    switch (behaviour) {
      case 'Positive': return 'text-green-600 dark:text-green-400';
      case 'Stable': return 'text-blue-600 dark:text-blue-400';
      case 'Needs Support': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getBehaviourBgColor = (behaviour) => {
    switch (behaviour) {
      case 'Positive': return 'bg-green-100 dark:bg-green-900/30';
      case 'Stable': return 'bg-blue-100 dark:bg-blue-900/30';
      case 'Needs Support': return 'bg-orange-100 dark:bg-orange-900/30';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <TeacherLayout>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mr-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Class Details - {id}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Manage student records and generate reports</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <div className="flex whitespace-nowrap border-b dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center px-5 py-3 font-medium transition border-b-2 ${
                activeTab === tab.key 
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-transparent text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
              onClick={() => setActiveTab(tab.key)}
              aria-label={`View ${tab.label} tab`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {activeTab === 'summary' ? (
            <SummaryTab studentData={studentData} />
          ) : activeTab === 'myStudent' ? (
            <MyStudentsTab studentData={studentData} onViewClick={handleViewClick} />
          ) : activeTab === 'attendanceReport' ? (
            <AttendanceReport classId={id} studentData={studentData} onAttendanceSave={handleAttendanceSave} />
          ) : activeTab === 'monthlyReport' ? (
            <MonthlyReport classId={id} studentData={studentData} />
          ) : activeTab === 'academic' ? (
            <AcademicReport studentData={studentData} onAcademicUpdate={handleAcademicUpdate} />
          ) : activeTab === 'bmi' ? (
            <BMIRecordTable students={studentData} setStudents={setStudentData} />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                <h2 className="font-bold text-gray-900 dark:text-white text-xl">Student Behaviour</h2>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Behaviour
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {studentData.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                              {student.name.charAt(0)}
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {student.rollNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${getBehaviourBgColor(student.behaviour)} ${getBehaviourColor(student.behaviour)}`}>
                            {student.behaviour}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(student)}
                            className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 flex items-center justify-end"
                          >
                            <Edit size={16} className="mr-1" />
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {editStudent && (
        <EditStudentModal
          student={editStudent}
          activeTab={activeTab}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
      {viewStudent && (
        <ViewStudentModal
          student={viewStudent}
          onClose={handleViewClose}
        />
      )}
    </TeacherLayout>
  );
};

export default ClassDetails;