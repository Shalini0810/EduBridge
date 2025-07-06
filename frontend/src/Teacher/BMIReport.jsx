// <<<<<<< HEAD
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Edit2, Save, X, Activity, AlertCircle, Search, RefreshCw, Download, Filter } from 'lucide-react';
// import TeacherLayout from '../components/TeacherRoute';

// const BMIReport = () => {
//   const [records, setRecords] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [input, setInput] = useState({ height: '', weight: '' });
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     fetchBMIData();
//   }, []);

//   const fetchBMIData = async () => {
//     setLoading(true);
//     try {
//       // You may need to update this URL to your actual API endpoint
//       const res = await axios.get('/api/bmi');
//       setRecords(res.data);
//     } catch (err) {
//       console.error('Failed to fetch BMI data:', err);
//       // For demo purposes, generate some mock data if the API fails
//       generateMockData();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateMockData = () => {
//     const mockData = [];
//     for (let i = 1; i <= 15; i++) {
//       const height = Math.floor(Math.random() * 50) + 130; // 130-180 cm
//       const weight = Math.floor(Math.random() * 40) + 30; // 30-70 kg
//       mockData.push({
//         _id: `mock-${i}`,
//         studentId: {
//           _id: `student-${i}`,
//           Name: `Student ${i}`,
//           RollNo: `R${String(i).padStart(3, '0')}`,
//         },
//         height,
//         weight,
//       });
//     }
//     setRecords(mockData);
//   };

//   const handleEdit = (record) => {
//     setEditingId(record._id);
//     setInput({ height: record.height || '', weight: record.weight || '' });
//   };

//   const handleSave = async (studentId) => {
//     try {
//       // In a real app, update this to your actual API endpoint
//       await axios.put(`/api/bmi/${studentId}`, {
//         height: parseFloat(input.height),
//         weight: parseFloat(input.weight),
//       });
      
//       // Update the local record immediately for better UX
//       setRecords(prevRecords => 
//         prevRecords.map(r => 
//           r._id === editingId 
//             ? { ...r, height: parseFloat(input.height), weight: parseFloat(input.weight) }
//             : r
//         )
//       );
      
//       setEditingId(null);
//     } catch (e) {
//       console.error('Failed to update BMI', e);
      
//       // Still update UI in demo mode even if API fails
//       setRecords(prevRecords => 
//         prevRecords.map(r => 
//           r._id === editingId 
//             ? { ...r, height: parseFloat(input.height), weight: parseFloat(input.weight) }
//             : r
//         )
//       );
//       setEditingId(null);
//     }
//   };

//   const calcBMI = (w, h) => {
//     if (!w || !h || h === 0) return '';
//     const heightInMeters = h / 100;
//     return (w / (heightInMeters * heightInMeters)).toFixed(1);
//   };

//   const getStatus = (bmi) => {
//     if (!bmi) return '';
//     if (bmi < 18.5) return 'Underweight';
//     if (bmi < 25) return 'Healthy';
//     if (bmi < 30) return 'Overweight';
//     return 'Obese';
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Healthy': return 'text-green-600 dark:text-green-400';
//       case 'Underweight': return 'text-yellow-600 dark:text-yellow-400';
//       case 'Overweight': return 'text-orange-600 dark:text-orange-400';
//       case 'Obese': return 'text-red-600 dark:text-red-400';
//       default: return 'text-gray-600 dark:text-gray-400';
//     }
//   };

//   const getStatusBgColor = (status) => {
//     switch (status) {
//       case 'Healthy': return 'bg-green-100 dark:bg-green-900/30';
//       case 'Underweight': return 'bg-yellow-100 dark:bg-yellow-900/30';
//       case 'Overweight': return 'bg-orange-100 dark:bg-orange-900/30';
//       case 'Obese': return 'bg-red-100 dark:bg-red-900/30';
//       default: return 'bg-gray-100 dark:bg-gray-800';
//     }
//   };

//   const filteredRecords = records
//     .filter(record => {
//       const name = record.studentId?.Name?.toLowerCase() || '';
//       const rollNo = record.studentId?.RollNo?.toLowerCase() || '';
//       const searchLower = searchTerm.toLowerCase();
//       return name.includes(searchLower) || rollNo.includes(searchLower);
//     })
//     .filter(record => {
//       if (filter === 'all') return true;
      
//       const bmi = calcBMI(record.weight, record.height);
//       const status = getStatus(bmi);
//       return status.toLowerCase() === filter.toLowerCase();
//     });

//   const getBmiSummary = () => {
//     const summary = {
//       healthy: 0,
//       underweight: 0,
//       overweight: 0,
//       obese: 0,
//       total: records.length
//     };
    
//     records.forEach(record => {
//       const bmi = calcBMI(record.weight, record.height);
//       const status = getStatus(bmi).toLowerCase();
      
//       if (status === 'healthy') summary.healthy++;
//       else if (status === 'underweight') summary.underweight++;
//       else if (status === 'overweight') summary.overweight++;
//       else if (status === 'obese') summary.obese++;
//     });
    
//     return summary;
//   };
  
//   const summary = getBmiSummary();

//   return (
//     <TeacherLayout>
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Student BMI Report</h1>
//         <p className="text-gray-600 dark:text-gray-400">Track and manage student BMI records and health status</p>
//       </div>
      
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.total}</p>
//             </div>
//             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
//               <Activity size={20} className="text-blue-600 dark:text-blue-400" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Healthy</p>
//               <p className="text-2xl font-bold text-green-600 dark:text-green-400">{summary.healthy}</p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {summary.total > 0 ? Math.round((summary.healthy / summary.total) * 100) : 0}%
//               </p>
//             </div>
//             <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
//               <Activity size={20} className="text-green-600 dark:text-green-400" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Underweight</p>
//               <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{summary.underweight}</p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {summary.total > 0 ? Math.round((summary.underweight / summary.total) * 100) : 0}%
//               </p>
//             </div>
//             <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
//               <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overweight</p>
//               <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{summary.overweight}</p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {summary.total > 0 ? Math.round((summary.overweight / summary.total) * 100) : 0}%
//               </p>
//             </div>
//             <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
//               <AlertCircle size={20} className="text-orange-600 dark:text-orange-400" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Obese</p>
//               <p className="text-2xl font-bold text-red-600 dark:text-red-400">{summary.obese}</p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {summary.total > 0 ? Math.round((summary.obese / summary.total) * 100) : 0}%
//               </p>
//             </div>
//             <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
//               <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Search and Filter Controls */}
//       <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="flex items-center">
//           <div className="relative">
//             <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search students..."
//               className="pl-10 pr-4 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="relative ml-2">
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="appearance-none pl-4 pr-8 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="healthy">Healthy</option>
//               <option value="underweight">Underweight</option>
//               <option value="overweight">Overweight</option>
//               <option value="obese">Obese</option>
//             </select>
//             <Filter size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
//           </div>
//         </div>
        
//         <div className="flex gap-2">
//           <button 
//             onClick={fetchBMIData}
//             className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//           >
//             <RefreshCw size={16} className="mr-2" />
//             Refresh
//           </button>
//           <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
//             <Download size={16} className="mr-2" />
//             Export
//           </button>
//         </div>
//       </div>
      
//       {/* BMI Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="p-6 border-b dark:border-gray-700">
//           <h2 className="font-bold text-gray-900 dark:text-white">BMI Records</h2>
//         </div>
        
//         {loading ? (
//           <div className="p-8 text-center">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-3"></div>
//             <p className="text-gray-500 dark:text-gray-400">Loading records...</p>
//           </div>
//         ) : filteredRecords.length === 0 ? (
//           <div className="p-8 text-center">
//             <AlertCircle size={48} className="mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-500 dark:text-gray-400">No matching records found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Roll No</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Height (cm)</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Weight (kg)</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">BMI</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {filteredRecords.map((record) => {
//                   const bmi = calcBMI(record.weight, record.height);
//                   const status = getStatus(bmi);
//                   const statusColor = getStatusColor(status);
//                   const statusBgColor = getStatusBgColor(status);

//                   return (
//                     <tr key={record._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
//                             {record.studentId?.Name?.charAt(0) || 'U'}
//                           </div>
//                           <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
//                             {record.studentId?.Name || 'Unknown'}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                         {record.studentId?.RollNo || '—'}
//                       </td>
                      
//                       {editingId === record._id ? (
//                         <>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <input
//                               type="number"
//                               step="0.1"
//                               value={input.height}
//                               onChange={(e) => setInput(prev => ({ ...prev, height: e.target.value }))}
//                               className="w-24 border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               placeholder="Height"
//                             />
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <input
//                               type="number"
//                               step="0.1"
//                               value={input.weight}
//                               onChange={(e) => setInput(prev => ({ ...prev, weight: e.target.value }))}
//                               className="w-24 border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               placeholder="Weight"
//                             />
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">—</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">—</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
//                             <button
//                               onClick={() => handleSave(record.studentId._id)}
//                               className="text-green-600 hover:text-green-900 dark:hover:text-green-400 mr-3 flex items-center"
//                             >
//                               <Save size={16} className="mr-1" />
//                               <span>Save</span>
//                             </button>
//                             <button
//                               onClick={() => setEditingId(null)}
//                               className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 flex items-center"
//                             >
//                               <X size={16} className="mr-1" />
//                               <span>Cancel</span>
//                             </button>
//                           </td>
//                         </>
//                       ) : (
//                         <>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                             {record.height || '—'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                             {record.weight || '—'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
//                             {bmi || '—'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {status && (
//                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBgColor} ${statusColor}`}>
//                                 {status}
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
//                             <button
//                               onClick={() => handleEdit(record)}
//                               className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 flex items-center justify-end"
//                             >
//                               <Edit2 size={16} className="mr-1" />
//                               <span>Edit</span>
//                             </button>
//                           </td>
//                         </>
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </TeacherLayout>
//   );
// };

// export default BMIReport;
// =======
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const BMIRecordTable = () => {
//   const [records, setRecords] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [input, setInput] = useState({ height: '', weight: '' });

//   useEffect(() => {
//     fetchBMIData();
//   }, []);

//   const fetchBMIData = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/bmi');
//       setRecords(res.data);
//     } catch (err) {
//       console.error('Failed to fetch BMI data:', err);
//     }
//   };

//   const handleEdit = (record) => {
//     setEditingId(record._id);
//     setInput({ height: record.height || '', weight: record.weight || '' });
//   };

//   const handleSave = async (studentId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/bmi/${studentId}`, {
//         height: parseFloat(input.height),
//         weight: parseFloat(input.weight),
//       });
//       await fetchBMIData();
//       setEditingId(null);
//     } catch (e) {
//       console.error('Failed to update BMI', e);
//     }
//   };

//   const calcBMI = (w, h) => {
//     if (!w || !h || h === 0) return '';
//     const heightInMeters = h / 100;
//     return (w / (heightInMeters * heightInMeters)).toFixed(1);
//   };

//   const getStatus = (bmi) => {
//     if (!bmi) return '';
//     if (bmi < 18.5) return 'Underweight';
//     if (bmi < 25) return 'Healthy';
//     if (bmi < 30) return 'Monitor';
//     return 'Concern';
//   };

//   return (
//     <div className="bg-white mt-10 rounded-xl shadow-lg border border-gray-200 p-6 overflow-x-auto">
//       <h2 className="text-xl font-bold mb-4 text-gray-800">BMI Student Table</h2>
//       <table className="w-full text-left text-lg">
//         <thead>
//           <tr>
//             <th className="p-2">Name</th>
//             <th className="p-2">Roll No</th>
//             <th className="p-2">Height (cm)</th>
//             <th className="p-2">Weight (kg)</th>
//             <th className="p-2">BMI</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.map((r) => {
//             const bmi = calcBMI(r.weight, r.height);
//             const status = getStatus(bmi);

//             return (
//               <tr key={r._id} className="border-t">
//                 <td className="p-2">{r.studentId?.Name || 'Unknown'}</td>
//                 <td className="p-2">{r.studentId?.RollNo || '—'}</td>
//                 {editingId === r._id ? (
//                   <>
//                     <td className="p-2">
//                       <input
//                         type="number"
//                         step="0.1"
//                         value={input.height}
//                         onChange={(e) => setInput(prev => ({ ...prev, height: e.target.value }))}
//                         className="w-24 border rounded px-2 py-1"
//                       />
//                     </td>
//                     <td className="p-2">
//                       <input
//                         type="number"
//                         step="0.1"
//                         value={input.weight}
//                         onChange={(e) => setInput(prev => ({ ...prev, weight: e.target.value }))}
//                         className="w-24 border rounded px-2 py-1"
//                       />
//                     </td>
//                     <td className="p-2">-</td>
//                     <td className="p-2">-</td>
//                     <td className="p-2">
//                       <button
//                         onClick={() => handleSave(r.studentId._id)}
//                         className="bg-green-600 text-white px-3 py-1 rounded mr-2"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingId(null)}
//                         className="bg-gray-300 text-black px-3 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="p-2">{r.height || '—'}</td>
//                     <td className="p-2">{r.weight || '—'}</td>
//                     <td className="p-2">{bmi || '—'}</td>
//                     <td className={`p-2 font-bold ${
//                       status === 'Healthy'
//                         ? 'text-green-600'
//                         : status === 'Underweight'
//                         ? 'text-yellow-500'
//                         : status === 'Monitor'
//                         ? 'text-orange-500'
//                         : 'text-red-600'
//                     }`}>
//                       {status || '—'}
//                     </td>
//                     <td className="p-2">
//                       <button
//                         onClick={() => handleEdit(r)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BMIRecordTable;


// >>>>>>> bf5a4ff9fcfaded635aa47746be6b2e913906182


import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Activity, AlertCircle, Search, RefreshCw, Download, Filter } from 'lucide-react';

const BMIReport = () => {
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [input, setInput] = useState({ height: '', weight: '' });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Ensure data is loaded when component mounts
  useEffect(() => {
    // Force immediate mock data generation
    generateMockData();
    
    // Simulate loading delay for UI feedback
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const generateMockData = () => {
    // Create more realistic student data
    const names = [
      'Aarav Sharma', 'Priya Singh', 'Rahul Verma', 'Sneha Patel', 'Vikram Das',
      'Ananya Gupta', 'Arjun Reddy', 'Kavya Iyer', 'Rohan Mehta', 'Tanya Joshi',
      'Varun Kumar', 'Zara Sheikh', 'Aditya Raj', 'Neha Malhotra', 'Siddharth Kapoor'
    ];
    
    const mockData = names.map((name, i) => {
      // More varied physical attributes for realistic BMI distribution
      const height = Math.floor(Math.random() * 30) + 140; // 140-170 cm
      const weight = Math.floor(Math.random() * 45) + 30; // 30-75 kg
      
      return {
        _id: `student-${i+1}`,
        studentId: {
          _id: `id-${i+1}`,
          Name: name,
          RollNo: `R${String(i+1).padStart(2, '0')}`,
        },
        height,
        weight,
        lastUpdated: new Date().toISOString(),
      };
    });
    
    console.log('Generated BMI mock data for', mockData.length, 'students');
    setRecords(mockData);
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    setInput({ height: record.height || '', weight: record.weight || '' });
  };

  const handleSave = async (studentId) => {
    // Update local state for immediate feedback
    setRecords(prevRecords => 
      prevRecords.map(r => 
        r._id === editingId 
          ? { 
              ...r, 
              height: parseFloat(input.height), 
              weight: parseFloat(input.weight),
              lastUpdated: new Date().toISOString() 
            }
          : r
      )
    );
    setEditingId(null);
  };

  const calcBMI = (w, h) => {
    if (!w || !h || h <= 0) return '';
    const heightInMeters = h / 100;
    return (w / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getStatus = (bmi) => {
    if (!bmi) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Healthy';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return 'text-green-600';
      case 'Underweight': return 'text-yellow-600';
      case 'Overweight': return 'text-orange-600';
      case 'Obese': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100';
      case 'Underweight': return 'bg-yellow-100';
      case 'Overweight': return 'bg-orange-100';
      case 'Obese': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  // Filter and search functionality
  const filteredRecords = records
    .filter(record => {
      const name = record.studentId?.Name?.toLowerCase() || '';
      const rollNo = record.studentId?.RollNo?.toLowerCase() || '';
      const searchLower = searchTerm.toLowerCase();
      return name.includes(searchLower) || rollNo.includes(searchLower);
    })
    .filter(record => {
      if (filter === 'all') return true;
      
      const bmi = calcBMI(record.weight, record.height);
      const status = getStatus(bmi);
      return status.toLowerCase() === filter.toLowerCase();
    });

  // Calculate BMI summary statistics
  const summary = {
    healthy: 0,
    underweight: 0,
    overweight: 0,
    obese: 0,
    total: records.length
  };
  
  records.forEach(record => {
    const bmi = calcBMI(record.weight, record.height);
    const status = getStatus(bmi).toLowerCase();
    
    if (status === 'healthy') summary.healthy++;
    else if (status === 'underweight') summary.underweight++;
    else if (status === 'overweight') summary.overweight++;
    else if (status === 'obese') summary.obese++;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Student BMI Dashboard</h1>
        <p className="text-gray-600">Track and manage student BMI records and health status</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Activity size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Healthy</p>
              <p className="text-2xl font-bold text-green-600">{summary.healthy}</p>
              <p className="text-xs text-gray-500">
                {summary.total > 0 ? Math.round((summary.healthy / summary.total) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Activity size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Underweight</p>
              <p className="text-2xl font-bold text-yellow-600">{summary.underweight}</p>
              <p className="text-xs text-gray-500">
                {summary.total > 0 ? Math.round((summary.underweight / summary.total) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertCircle size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overweight</p>
              <p className="text-2xl font-bold text-orange-600">{summary.overweight}</p>
              <p className="text-xs text-gray-500">
                {summary.total > 0 ? Math.round((summary.overweight / summary.total) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertCircle size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Obese</p>
              <p className="text-2xl font-bold text-red-600">{summary.obese}</p>
              <p className="text-xs text-gray-500">
                {summary.total > 0 ? Math.round((summary.obese / summary.total) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle size={20} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative ml-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="underweight">Underweight</option>
              <option value="overweight">Overweight</option>
              <option value="obese">Obese</option>
            </select>
            <Filter size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={generateMockData}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* BMI Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-bold text-gray-900">BMI Records</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-3"></div>
            <p className="text-gray-500">Loading records...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No matching records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height (cm)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => {
                  const bmi = calcBMI(record.weight, record.height);
                  const status = getStatus(bmi);
                  const statusColor = getStatusColor(status);
                  const statusBgColor = getStatusBgColor(status);

                  return (
                    <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                            {record.studentId?.Name?.charAt(0) || 'U'}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900">
                            {record.studentId?.Name || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.studentId?.RollNo || '—'}
                      </td>
                      
                      {editingId === record._id ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              step="0.1"
                              value={input.height}
                              onChange={(e) => setInput(prev => ({ ...prev, height: e.target.value }))}
                              className="w-24 border rounded px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Height"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              step="0.1"
                              value={input.weight}
                              onChange={(e) => setInput(prev => ({ ...prev, weight: e.target.value }))}
                              className="w-24 border rounded px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Weight"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">—</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">—</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <button
                              onClick={() => handleSave(record.studentId._id)}
                              className="text-green-600 hover:text-green-900 mr-3 flex items-center"
                            >
                              <Save size={16} className="mr-1" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-600 hover:text-gray-900 flex items-center"
                            >
                              <X size={16} className="mr-1" />
                              <span>Cancel</span>
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {record.height || '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {record.weight || '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {bmi || '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {status && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBgColor} ${statusColor}`}>
                                {status}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <button
                              onClick={() => handleEdit(record)}
                              className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                            >
                              <Edit2 size={16} className="mr-1" />
                              <span>Edit</span>
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
        )}
      </div>
    </div>
  );
};

export default BMIReport;