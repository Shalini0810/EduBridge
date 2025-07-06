// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const AttendanceReport = ({ classId }) => {
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [showMarkAttendance, setShowMarkAttendance] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [students, setStudents] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState({});

//   // Mock student data - replace with actual API call
//   const generateMockStudents = () => {
//     const mockStudents = [];
//     for (let i = 1; i <= 50; i++) {
//       mockStudents.push({
//         id: i,
//         name: `Student ${i}`,
//         rollNumber: `R${String(i).padStart(3, "0")}`,
//       });
//     }
//     return mockStudents;
//   };

//   // Mock data - replace with actual API call
//   const generateMockData = (month, year) => {
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const data = [];

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(year, month, day);
//       // Skip weekends for school attendance
//       if (date.getDay() !== 0 && date.getDay() !== 6) {
//         data.push({
//           day: day,
//           date: `${day}/${month + 1}`,
//           present: Math.floor(Math.random() * 30) + 20,
//           absent: Math.floor(Math.random() * 10) + 2,
//           total: 50,
//         });
//       }
//     }
//     return data;
//   };

//   useEffect(() => {
//     const data = generateMockData(selectedMonth, selectedYear);
//     setAttendanceData(data);
//     setStudents(generateMockStudents());
//   }, [selectedMonth, selectedYear, classId]);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const years = [2023, 2024, 2025, 2026];

//   const calculateStats = () => {
//     if (attendanceData.length === 0) return { avgAttendance: 0, totalDays: 0 };

//     const totalPresent = attendanceData.reduce(
//       (sum, day) => sum + day.present,
//       0
//     );
//     const totalPossible = attendanceData.length * attendanceData[0]?.total || 0;
//     const avgAttendance =
//       totalPossible > 0 ? ((totalPresent / totalPossible) * 100).toFixed(1) : 0;

//     return {
//       avgAttendance,
//       totalDays: attendanceData.length,
//     };
//   };

//   const stats = calculateStats();

//   const handleAttendanceChange = (studentId, status) => {
//     setAttendanceRecords((prev) => ({
//       ...prev,
//       [selectedDate]: {
//         ...prev[selectedDate],
//         [studentId]: status,
//       },
//     }));
//   };

//   const handleSaveAttendance = () => {
//     // Here you would typically send the attendance data to your API
//     console.log(
//       "Saving attendance for",
//       selectedDate,
//       attendanceRecords[selectedDate]
//     );

//     // Show success message
//     alert("Attendance saved successfully!");
//     setShowMarkAttendance(false);

//     // Refresh the chart data
//     const data = generateMockData(selectedMonth, selectedYear);
//     setAttendanceData(data);
//   };

//   const handleBulkAttendance = (status) => {
//     const bulkRecords = {};
//     students.forEach((student) => {
//       bulkRecords[student.id] = status;
//     });

//     setAttendanceRecords((prev) => ({
//       ...prev,
//       [selectedDate]: bulkRecords,
//     }));
//   };

//   const getAttendanceStatus = (studentId) => {
//     return attendanceRecords[selectedDate]?.[studentId] || "unmarked";
//   };

//   // Download CSV functionality
//   const downloadAttendanceCSV = () => {
//     const csvData = [
//       ["Date", "Day", "Present", "Absent", "Total", "Attendance %"], // Headers
//       ...attendanceData.map((item) => [
//         `${item.date}/${selectedYear}`,
//         item.day,
//         item.present,
//         item.absent,
//         item.total,
//         `${((item.present / item.total) * 100).toFixed(1)}%`,
//       ]),
//     ];

//     // Convert to CSV string
//     const csvString = csvData.map((row) => row.join(",")).join("\n");

//     // Create blob and download
//     const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `Monthly_Attendance_${months[selectedMonth]}_${selectedYear}_Class_${classId}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-white p-3 border border-[#5E5E5E] rounded shadow-lg">
//           <p className="font-semibold text-[#222222]">{`Date: ${data.date}/${selectedYear}`}</p>
//           <p className="text-[#0057FF]">{`Present: ${data.present}`}</p>
//           <p className="text-[#F26722]">{`Absent: ${data.absent}`}</p>
//           <p className="text-[#666666]">{`Total: ${data.total}`}</p>
//           <p className="text-[#1A1A1A]">{`Attendance: ${(
//             (data.present / data.total) *
//             100
//           ).toFixed(1)}%`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-white border border-[#5E5E5E] rounded-xl shadow-md p-6">
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-[#222222]">
//             Attendance Report
//           </h2>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setShowMarkAttendance(!showMarkAttendance)}
//               className="px-4 py-2 bg-gradient-to-r from-[#0057FF] to-[#007BFF] text-white rounded hover:from-[#007BFF] hover:to-[#0057FF] font-medium shadow-sm transition-all duration-200"
//             >
//               {showMarkAttendance ? "View Report" : "Mark Attendance"}
//             </button>
//           </div>
//         </div>

//         {/* Mark Attendance Section */}
//         {showMarkAttendance && (
//           <div className="mb-6 p-4 bg-[#F5F5F5] border border-[#5E5E5E] rounded-lg">
//             <h3 className="text-lg font-semibold text-[#222222] mb-4">
//               Mark Attendance
//             </h3>

//             {/* Date Selector */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-[#666666] mb-1">
//                 Select Date
//               </label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="border border-[#5E5E5E] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0057FF] text-[#222222] bg-white"
//               />
//             </div>

//             {/* Bulk Actions */}
//             <div className="flex gap-2 mb-4">
//               <button
//                 onClick={() => handleBulkAttendance("present")}
//                 className="px-3 py-1 bg-[#0057FF] text-white rounded text-sm hover:bg-[#007BFF] transition-colors"
//               >
//                 Mark All Present
//               </button>
//               <button
//                 onClick={() => handleBulkAttendance("absent")}
//                 className="px-3 py-1 bg-[#F26722] text-white rounded text-sm hover:bg-[#E55A1C] transition-colors"
//               >
//                 Mark All Absent
//               </button>
//               <button
//                 onClick={() =>
//                   setAttendanceRecords((prev) => ({
//                     ...prev,
//                     [selectedDate]: {},
//                   }))
//                 }
//                 className="px-3 py-1 bg-[#666666] text-white rounded text-sm hover:bg-[#555555] transition-colors"
//               >
//                 Clear All
//               </button>
//             </div>

//             {/* Student List */}
//             <div className="max-h-96 overflow-y-auto border border-[#5E5E5E] rounded-lg">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
//                 {students.map((student) => {
//                   const status = getAttendanceStatus(student.id);
//                   return (
//                     <div
//                       key={student.id}
//                       className={`p-3 rounded-lg border-2 transition-all ${
//                         status === "present"
//                           ? "border-[#0057FF] bg-blue-50"
//                           : status === "absent"
//                           ? "border-[#F26722] bg-orange-50"
//                           : "border-[#5E5E5E] bg-white"
//                       }`}
//                     >
//                       <div className="flex justify-between items-center mb-2">
//                         <div>
//                           <p className="font-medium text-[#222222] text-sm">
//                             {student.name}
//                           </p>
//                           <p className="text-xs text-[#666666]">
//                             {student.rollNumber}
//                           </p>
//                         </div>
//                         <div
//                           className={`w-3 h-3 rounded-full ${
//                             status === "present"
//                               ? "bg-[#0057FF]"
//                               : status === "absent"
//                               ? "bg-[#F26722]"
//                               : "bg-[#5E5E5E]"
//                           }`}
//                         ></div>
//                       </div>
//                       <div className="flex gap-1">
//                         <button
//                           onClick={() =>
//                             handleAttendanceChange(student.id, "present")
//                           }
//                           className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
//                             status === "present"
//                               ? "bg-[#0057FF] text-white"
//                               : "bg-gray-200 text-[#666666] hover:bg-gray-300"
//                           }`}
//                         >
//                           P
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleAttendanceChange(student.id, "absent")
//                           }
//                           className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
//                             status === "absent"
//                               ? "bg-[#F26722] text-white"
//                               : "bg-gray-200 text-[#666666] hover:bg-gray-300"
//                           }`}
//                         >
//                           A
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Save Button */}
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={handleSaveAttendance}
//                 className="px-6 py-2 bg-gradient-to-r from-[#0057FF] to-[#007BFF] text-white rounded hover:from-[#007BFF] hover:to-[#0057FF] font-medium shadow-sm transition-all duration-200"
//               >
//                 Save Attendance
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Month and Year Selectors - Only show when not marking attendance */}
//         {!showMarkAttendance && (
//           <>
//             <div className="flex gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-[#666666] mb-1">
//                   Month
//                 </label>
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                   className="border border-[#5E5E5E] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0057FF] text-[#222222] bg-white"
//                 >
//                   {months.map((month, index) => (
//                     <option key={index} value={index}>
//                       {month}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#666666] mb-1">
//                   Year
//                 </label>
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                   className="border border-[#5E5E5E] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0057FF] text-[#222222] bg-white"
//                 >
//                   {years.map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Statistics */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="bg-gradient-to-br from-[#0057FF] to-[#007BFF] p-4 rounded-lg text-white">
//                 <h3 className="text-sm font-medium opacity-90">
//                   Average Attendance
//                 </h3>
//                 <p className="text-2xl font-bold">{stats.avgAttendance}%</p>
//               </div>
//               <div className="bg-[#F5F5F5] border border-[#5E5E5E] p-4 rounded-lg">
//                 <h3 className="text-sm font-medium text-[#666666]">
//                   School Days
//                 </h3>
//                 <p className="text-2xl font-bold text-[#222222]">
//                   {stats.totalDays}
//                 </p>
//               </div>
//               <div className="bg-[#F5F5F5] border border-[#5E5E5E] p-4 rounded-lg">
//                 <h3 className="text-sm font-medium text-[#666666]">
//                   Class Size
//                 </h3>
//                 <p className="text-2xl font-bold text-[#222222]">
//                   {attendanceData[0]?.total || 0}
//                 </p>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Chart - Only show when not marking attendance */}
//       {!showMarkAttendance && (
//         <>
//           <div className="h-96">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="text-lg font-semibold text-[#222222]">
//                 Daily Attendance - {months[selectedMonth]} {selectedYear}
//               </h3>
//               <button
//                 onClick={downloadAttendanceCSV}
//                 className="px-4 py-2 bg-[#F26722] text-white rounded hover:bg-[#E55A1C] font-medium shadow-sm transition-all duration-200 flex items-center gap-2"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 Download Report
//               </button>
//             </div>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={attendanceData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#5E5E5E" />
//                 <XAxis
//                   dataKey="day"
//                   tick={{ fontSize: 12, fill: "#666666" }}
//                   interval={Math.ceil(attendanceData.length / 10)}
//                   axisLine={{ stroke: "#5E5E5E" }}
//                   tickLine={{ stroke: "#5E5E5E" }}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 12, fill: "#666666" }}
//                   axisLine={{ stroke: "#5E5E5E" }}
//                   tickLine={{ stroke: "#5E5E5E" }}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar
//                   dataKey="present"
//                   fill="#0057FF"
//                   name="Present"
//                   radius={[2, 2, 0, 0]}
//                 />
//                 <Bar
//                   dataKey="absent"
//                   fill="#F26722"
//                   name="Absent"
//                   radius={[2, 2, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Legend */}
//           <div className="flex justify-center gap-6 mt-4">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-[#0057FF] rounded"></div>
//               <span className="text-sm text-[#666666]">Present</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-[#F26722] rounded"></div>
//               <span className="text-sm text-[#666666]">Absent</span>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AttendanceReport;


import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Download, Filter, Search, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AttendanceReport = ({ classId }) => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  const [view, setView] = useState('overview');

  // Mock data for demo
  const timeRanges = ['week', 'month', 'quarter', 'year'];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Generate mock students
      const mockStudents = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        rollNumber: `R${String(i + 1).padStart(3, "0")}`,
        present: Math.floor(Math.random() * 6) + 20, // 20-25 days present
        absent: Math.floor(Math.random() * 4) + 1,   // 1-4 days absent
        late: Math.floor(Math.random() * 3),         // 0-2 days late
        excused: Math.floor(Math.random() * 2),      // 0-1 days excused
        consecutiveAbsences: Math.floor(Math.random() * 2),
        lastAttendance: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toISOString().split('T')[0],
      }));
      
      setStudents(mockStudents);
      
      // Generate trend data for last 12 months
      const mockTrends = Array.from({ length: 12 }, (_, i) => {
        const monthIndex = (new Date().getMonth() - 11 + i) % 12;
        return {
          month: monthNames[monthIndex >= 0 ? monthIndex : monthIndex + 12],
          attendance: Math.floor(Math.random() * 10) + 85, // 85-95% attendance
        };
      });
      
      setAttendanceData(mockTrends);
      setLoading(false);
    }, 800);
  }, [classId]);

  // Filter students based on search
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate attendance statistics
  const totalStudents = students.length;
  const totalDays = 30; // Assuming monthly report with 30 days
  const averageAttendance = students.length > 0
    ? Math.round(students.reduce((sum, student) => sum + (student.present / (student.present + student.absent + student.late)), 0) / students.length * 100)
    : 0;
  const studentsWithPerfectAttendance = students.filter(student => student.absent === 0 && student.late === 0).length;
  const studentsRequiringAttention = students.filter(student => 
    (student.absent / (student.present + student.absent + student.late)) > 0.1 || // More than 10% absences
    student.consecutiveAbsences >= 2 // 2 or more consecutive absences
  ).length;

  const getAttendanceStatus = (student) => {
    const totalDays = student.present + student.absent + student.late;
    const attendancePercentage = student.present / totalDays * 100;
    
    if (attendancePercentage >= 95) return 'Excellent';
    if (attendancePercentage >= 90) return 'Good';
    if (attendancePercentage >= 85) return 'Satisfactory';
    if (attendancePercentage >= 80) return 'Needs Improvement';
    return 'Concerning';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Excellent': return 'text-green-600 dark:text-green-400';
      case 'Good': return 'text-blue-600 dark:text-blue-400';
      case 'Satisfactory': return 'text-yellow-600 dark:text-yellow-400';
      case 'Needs Improvement': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-red-600 dark:text-red-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Calendar className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
        Attendance Report
      </h2>

      {/* Filters and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search student name or roll number..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            View
          </label>
          <div className="relative">
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
            >
              <option value="overview">Overview</option>
              <option value="daily">Daily View</option>
              <option value="trends">Attendance Trends</option>
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
      ) : (
        <>
          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Average Attendance</div>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{averageAttendance}%</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-100 dark:border-green-800">
              <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Perfect Attendance</div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">{studentsWithPerfectAttendance} <span className="text-sm font-normal">students</span></div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-100 dark:border-yellow-800">
              <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">Total Days</div>
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">{totalDays} <span className="text-sm font-normal">days</span></div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-100 dark:border-red-800">
              <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">Needs Attention</div>
              <div className="text-3xl font-bold text-red-700 dark:text-red-300">{studentsRequiringAttention} <span className="text-sm font-normal">students</span></div>
            </div>
          </div>

          {view === 'trends' && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Clock className="mr-2 text-blue-600 dark:text-blue-400" size={18} />
                Attendance Trends
              </h3>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={attendanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="attendance" 
                        name="Attendance %" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Student Attendance Table */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Student Attendance Details</h3>
            
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Present
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Absent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Late
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Last Present
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {student.rollNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2" size={16} />
                          <span className="text-sm font-medium">
                            {student.present} days
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <XCircle className={`${student.absent > 3 ? 'text-red-500' : 'text-gray-500'} mr-2`} size={16} />
                          <span className={`text-sm font-medium ${student.absent > 3 ? 'text-red-600 dark:text-red-400' : ''}`}>
                            {student.absent} days
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <AlertCircle className={`${student.late > 2 ? 'text-yellow-500' : 'text-gray-500'} mr-2`} size={16} />
                          <span className="text-sm font-medium">
                            {student.late} days
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          const status = getAttendanceStatus(student);
                          return (
                            <span className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(status)} bg-opacity-20 dark:bg-opacity-20`}>
                              {status}
                            </span>
                          );
                        })()}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {student.lastAttendance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceReport;