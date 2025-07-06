// import React, { useMemo } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// // Dummy students data for demo
// const students = [
//   { id: 1, name: 'Aarav Sharma', height: 1.5, weight: 45, attendance: 95, academic: 88, behaviour: 'Positive', attendanceRecords: [{ date: '2025-06-28', present: true }, { date: '2025-06-29', present: false }] },
//   { id: 2, name: 'Priya Singh', height: 1.4, weight: 50, attendance: 89, academic: 76, behaviour: 'Stable', attendanceRecords: [{ date: '2025-06-28', present: true }, { date: '2025-06-29', present: true }] },
//   { id: 3, name: 'Rahul Verma', height: 1.6, weight: 70, attendance: 80, academic: 65, behaviour: 'Needs Support', attendanceRecords: [{ date: '2025-06-28', present: false }, { date: '2025-06-29', present: true }] },
//   { id: 4, name: 'Sneha Patel', height: 1.55, weight: 48, attendance: 98, academic: 92, behaviour: 'Positive', attendanceRecords: [{ date: '2025-06-28', present: true }, { date: '2025-06-29', present: true }] },
//   { id: 5, name: 'Vikram Das', height: 1.7, weight: 80, attendance: 92, academic: 85, behaviour: 'Stable', attendanceRecords: [{ date: '2025-06-28', present: true }, { date: '2025-06-29', present: false }] },
// ];

// const COLORS = {
//   primary: ['#007BFF', '#0057FF', '#28A745', '#FFC107', '#DC3545'],
//   behaviour: {
//     'Positive': '#28A745',
//     'Stable': '#007BFF',
//     'Needs Support': '#DC3545'
//   }
// };

// const BehavioralReport = ({ studentData }) => {
//   const behaviourChartData = useMemo(() => {
//     const behaviourData = studentData.reduce((acc, student) => {
//       acc[student.behaviour] = (acc[student.behaviour] || 0) + 1;
//       return acc;
//     }, {});
//     return Object.entries(behaviourData).map(([behaviour, count]) => ({
//       name: behaviour,
//       value: count,
//       percentage: ((count / studentData.length) * 100).toFixed(1)
//     }));
//   }, [studentData]);

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length > 0) {
//       return (
//         <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
//           <p className="font-semibold">{`${payload[0].payload.name}: ${payload[0].value} students`}</p>
//           <p className="text-sm text-gray-600">{`${payload[0].payload.percentage}% of class`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const StatCard = ({ title, value, subtitle, color }) => (
//     <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
//       <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
//       <p className={`text-3xl font-bold ${color}`}>{value}</p>
//       <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
//     </div>
//   );

//   return (
//     <div className="space-y-8">
//       <StatCard 
//         title="Positive Behavior" 
//         value={behaviourChartData.find(d => d.name === 'Positive')?.value || 0}
//         subtitle="students with positive behavior"
//         color="text-green-600"
//       />
//       <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
//         <h3 className="text-xl font-bold mb-4 text-gray-800">Behaviour Distribution</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={behaviourChartData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percentage }) => `${name}: ${percentage}%`}
//               outerRadius={100}
//               dataKey="value"
//             >
//               {behaviourChartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS.behaviour[entry.name] || COLORS.primary[index % COLORS.primary.length]} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default BehavioralReport;


import React, { useState, useEffect } from 'react';
import { UserCheck, MessageCircle, Download, Filter, Search, ChevronDown, Plus, Clock } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const BehavioralReport = ({ classId }) => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  const [behavioralData, setBehavioralData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Mock data for demo
  const timeRanges = ['week', 'month', 'quarter', 'year'];
  
  // Behavioral categories
  const categories = [
    { id: 'socialization', name: 'Socialization', description: 'Ability to interact with peers and teachers' },
    { id: 'selfManagement', name: 'Self-Management', description: 'Control over emotions and behaviors' },
    { id: 'engagement', name: 'Engagement', description: 'Participation and interest in activities' },
    { id: 'empathy', name: 'Empathy', description: 'Understanding and caring about others' },
    { id: 'responsibility', name: 'Responsibility', description: 'Reliability and ownership of actions' },
    { id: 'cooperation', name: 'Cooperation', description: 'Working well with others' },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Generate mock students
      const mockStudents = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        rollNumber: `R${String(i + 1).padStart(3, "0")}`,
        behavioralMetrics: {
          socialization: Math.floor(Math.random() * 40) + 60,
          selfManagement: Math.floor(Math.random() * 40) + 60,
          engagement: Math.floor(Math.random() * 40) + 60,
          empathy: Math.floor(Math.random() * 40) + 60,
          responsibility: Math.floor(Math.random() * 40) + 60,
          cooperation: Math.floor(Math.random() * 40) + 60,
        },
        incidents: Math.floor(Math.random() * 3),
        recognition: Math.floor(Math.random() * 4),
        trend: ['improving', 'stable', 'concerning'][Math.floor(Math.random() * 3)],
        lastObservation: new Date(Date.now() - Math.floor(Math.random() * 14) * 86400000).toISOString().split('T')[0],
      }));
      
      setStudents(mockStudents);
      setLoading(false);
      
      // Set initial behavioral data for radar chart
      if (mockStudents.length > 0) {
        setSelectedStudent(mockStudents[0].id.toString());
        updateBehavioralData(mockStudents[0]);
        
        // Generate mock notes
        const mockNotes = [
          { 
            id: 1, 
            date: new Date(Date.now() - 10 * 86400000).toISOString(),
            content: 'Displayed excellent teamwork during group projects this week.',
            category: 'cooperation'
          },
          { 
            id: 2, 
            date: new Date(Date.now() - 20 * 86400000).toISOString(),
            content: 'Helped another student who was struggling with an assignment.',
            category: 'empathy'
          },
          { 
            id: 3, 
            date: new Date(Date.now() - 30 * 86400000).toISOString(),
            content: 'Some difficulty focusing during afternoon lessons. Might need additional support.',
            category: 'engagement'
          }
        ];
        
        setNotes(mockNotes);
      }
    }, 800);
  }, [classId]);

  const updateBehavioralData = (student) => {
    if (!student) return;
    
    const data = categories.map(category => ({
      subject: category.name,
      score: student.behavioralMetrics[category.id],
      fullMark: 100,
    }));
    
    setBehavioralData(data);
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    
    if (studentId) {
      const student = students.find(s => s.id === parseInt(studentId));
      updateBehavioralData(student);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedStudent) {
      const newNoteObj = {
        id: Date.now(),
        date: new Date().toISOString(),
        content: newNote,
        category: 'general'
      };
      
      setNotes([newNoteObj, ...notes]);
      setNewNote('');
    }
  };

  const getTrendBadge = (trend) => {
    switch (trend) {
      case 'improving':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Improving</span>;
      case 'stable':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">Stable</span>;
      case 'concerning':
        return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full">Needs Attention</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <UserCheck className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
        Social Emotional Learning Report
      </h2>

      {/* Controls Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Select Student
          </label>
          <div className="relative">
            <select
              value={selectedStudent}
              onChange={handleStudentChange}
              className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.rollNumber})
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={16} />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Time Range
          </label>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
            >
              {timeRanges.map((range) => (
                <option key={range} value={range}>
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={16} />
          </div>
        </div>

        <div className="flex items-end">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : selectedStudent ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Student Radar Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                SEL Performance Profile
              </h3>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={behavioralData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Current"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Student stats */}
              {selectedStudent && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {categories.map(category => {
                    const student = students.find(s => s.id === parseInt(selectedStudent));
                    const score = student?.behavioralMetrics[category.id] || 0;
                    
                    return (
                      <div key={category.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {category.name}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {score}/100
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              score >= 85 ? 'bg-green-500' : 
                              score >= 70 ? 'bg-blue-500' :
                              score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column: Notes and Observations */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <MessageCircle className="mr-2 text-blue-600 dark:text-blue-400" size={18} />
                Notes & Observations
              </h3>
              
              {/* Add note form */}
              <div className="mb-4 flex items-end gap-2">
                <div className="flex-grow">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new observation or note..."
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 resize-none transition-colors"
                    rows="3"
                  ></textarea>
                </div>
                <button 
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className={`px-3 py-2.5 rounded-lg flex items-center justify-center ${
                    newNote.trim() 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus size={20} />
                </button>
              </div>
              
              {/* Notes list */}
              <div className="space-y-3 mt-4 max-h-96 overflow-y-auto pr-2">
                {notes.length > 0 ? (
                  notes.map(note => (
                    <div key={note.id} className="border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-900 p-3 rounded-r-lg shadow-sm">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <Clock size={14} className="mr-1" />
                        {new Date(note.date).toLocaleDateString()} at {new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {note.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No notes or observations recorded yet.
                  </div>
                )}
              </div>
            </div>
            
            {/* Overall Trend */}
            {selectedStudent && (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-4">
                <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                  Overall Trend
                </h3>
                
                <div>
                  {getTrendBadge(students.find(s => s.id === parseInt(selectedStudent))?.trend)}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <div className="text-5xl mb-6 opacity-80">🧠</div>
          <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-white">Select a Student</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Choose a student from the dropdown above to view their social emotional learning report.
          </p>
        </div>
      )}
    </div>
  );
};

export default BehavioralReport;