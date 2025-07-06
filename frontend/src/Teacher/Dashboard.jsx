import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Activity, BarChart2, Search, ChevronDown, ChevronUp, Filter, Bell } from 'lucide-react';

const dummyClasses = [
  {
    id: 1,
    name: 'Grade 5 – Morning',
    totalStudents: 28,
    avgAcademicScore: 82,
    attendance: 91,
    metrics: {
      bmi: 'Healthy',
      attendance: '91%',
      academic: '82%',
      sel: 'Positive',
    },
  },
  {
    id: 2,
    name: 'Grade 6 – Afternoon',
    totalStudents: 25,
    avgAcademicScore: 76,
    attendance: 87,
    metrics: {
      bmi: 'Monitor',
      attendance: '87%',
      academic: '76%',
      sel: 'Stable',
    },
  },
  {
    id: 3,
    name: 'Grade 7 – Evening',
    totalStudents: 30,
    avgAcademicScore: 90,
    attendance: 95,
    metrics: {
      bmi: 'Healthy',
      attendance: '95%',
      academic: '90%',
      sel: 'Positive',
    },
  },
  {
    id: 4,
    name: 'Grade 8 – Morning',
    totalStudents: 27,
    avgAcademicScore: 79,
    attendance: 89,
    metrics: {
      bmi: 'Concern',
      attendance: '89%',
      academic: '79%',
      sel: 'Needs Support',
    },
  },
  {
    id: 5,
    name: 'Grade 9 – Afternoon',
    totalStudents: 32,
    avgAcademicScore: 85,
    attendance: 93,
    metrics: {
      bmi: 'Healthy',
      attendance: '93%',
      academic: '85%',
      sel: 'Stable',
    },
  },
  {
    id: 6,
    name: 'Grade 10 – Evening',
    totalStudents: 29,
    avgAcademicScore: 88,
    attendance: 90,
    metrics: {
      bmi: 'Monitor',
      attendance: '90%',
      academic: '88%',
      sel: 'Positive',
    },
  },
  {
    id: 7,
    name: 'Grade 11 – Morning',
    totalStudents: 26,
    avgAcademicScore: 81,
    attendance: 86,
    metrics: {
      bmi: 'Healthy',
      attendance: '86%',
      academic: '81%',
      sel: 'Stable',
    },
  },
  {
    id: 8,
    name: 'Grade 12 – Afternoon',
    totalStudents: 24,
    avgAcademicScore: 92,
    attendance: 97,
    metrics: {
      bmi: 'Healthy',
      attendance: '97%',
      academic: '92%',
      sel: 'Positive',
    },
  },
];

// Helper functions to get status colors
const getStatusColor = (status, type) => {
  if (type === 'bmi') {
    switch (status) {
      case 'Healthy': return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: <Activity size={18} className="text-green-700 dark:text-green-400" /> };
      case 'Monitor': return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: <Activity size={18} className="text-yellow-700 dark:text-yellow-400" /> };
      case 'Concern': return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: <Activity size={18} className="text-red-700 dark:text-red-400" /> };
      default: return { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-400', icon: <Activity size={18} className="text-gray-700 dark:text-gray-400" /> };
    }
  } else if (type === 'sel') {
    switch (status) {
      case 'Positive': return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: <Users size={18} className="text-green-700 dark:text-green-400" /> };
      case 'Stable': return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: <Users size={18} className="text-blue-700 dark:text-blue-400" /> };
      case 'Needs Support': return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', icon: <Users size={18} className="text-orange-700 dark:text-orange-400" /> };
      default: return { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-400', icon: <Users size={18} className="text-gray-700 dark:text-gray-400" /> };
    }
  }
  return { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-400' };
};

const getAcademicColor = (score) => {
  const numScore = parseInt(score);
  if (numScore >= 90) return 'text-green-600 dark:text-green-400';
  if (numScore >= 80) return 'text-blue-600 dark:text-blue-400';
  if (numScore >= 70) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

const getAttendanceColor = (score) => {
  const numScore = parseInt(score);
  if (numScore >= 95) return 'text-green-600 dark:text-green-400';
  if (numScore >= 85) return 'text-blue-600 dark:text-blue-400';
  if (numScore >= 75) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

const ProgressBar = ({ value, maxValue = 100, color }) => {
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);
  return (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const StatusBadge = ({ text, type }) => {
  const { bg, text: textColor, icon } = getStatusColor(text, type);
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bg} ${textColor}`}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {text}
    </div>
  );
};

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3);
  
  return (
    <nav className="w-full sticky top-0 z-30 bg-gradient-to-r from-[#0057FF] to-[#007BFF] px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="text-white text-2xl font-extrabold tracking-tight">Teacher Dashboard</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-white/80 hover:text-white transition">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications}
              </span>
            )}
          </button>
          
          <div className="relative">
            <button
              className="flex items-center gap-2 focus:outline-none group"
              onClick={() => setDropdown((d) => !d)}
            >
              <span className="w-10 h-10 rounded-full bg-[#F5F5F5] border-2 border-white/30 flex items-center justify-center text-[#222222] font-bold text-lg group-hover:ring-2 group-hover:ring-white/50 transition">T</span>
              <span className="text-white font-medium hidden sm:block">Ms. Johnson</span>
              <ChevronDown size={16} className="text-white/70" />
            </button>
            
            {dropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-40 animate-fade-in">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#F5F5F5] dark:bg-gray-700 border border-[#E5E5E5] dark:border-gray-600 flex items-center justify-center text-[#222222] dark:text-white font-bold">T</span>
                  Ms. Johnson
                </div>
                <button className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </button>
                <button className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                <button className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-[#F26722] font-semibold border-t border-gray-200 dark:border-gray-700 transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleGoToClass = (id) => {
    navigate(`/class/${id}`);
  };

  // Filter and sort classes
  const filteredClasses = dummyClasses
    .filter(cls => cls.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'students') return b.totalStudents - a.totalStudents;
      if (sortBy === 'academic') return b.avgAcademicScore - a.avgAcademicScore;
      if (sortBy === 'attendance') return b.attendance - a.attendance;
      return 0;
    });

  // Calculate overall stats
  const overallStats = {
    totalStudents: dummyClasses.reduce((sum, cls) => sum + cls.totalStudents, 0),
    avgAcademic: dummyClasses.reduce((sum, cls) => sum + cls.avgAcademicScore, 0) / dummyClasses.length,
    avgAttendance: dummyClasses.reduce((sum, cls) => sum + cls.attendance, 0) / dummyClasses.length
  };

  // Render loading skeletons
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-10 max-w-md mx-auto"></div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Ms. Johnson!</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Here's an overview of your classes for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="students">Sort by Students</option>
              <option value="academic">Sort by Academic</option>
              <option value="attendance">Sort by Attendance</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Students</h3>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Users size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{overallStats.totalStudents}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Across {dummyClasses.length} classes</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg. Academic Score</h3>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <BookOpen size={20} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{overallStats.avgAcademic.toFixed(1)}%</p>
            <div className="mt-2">
              <ProgressBar value={overallStats.avgAcademic} color="bg-green-500 dark:bg-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg. Attendance</h3>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Activity size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{overallStats.avgAttendance.toFixed(1)}%</p>
            <div className="mt-2">
              <ProgressBar value={overallStats.avgAttendance} color="bg-purple-500 dark:bg-purple-400" />
            </div>
          </div>
        </div>

        {/* Classes */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5 flex items-center">
          <BarChart2 size={20} className="mr-2" />
          Your Classes {filteredClasses.length !== dummyClasses.length && `(${filteredClasses.length}/${dummyClasses.length})`}
        </h2>
        
        {filteredClasses.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-md border border-gray-200 dark:border-gray-700">
            <Search size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">No classes found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg overflow-hidden"
              >
                <div 
                  onClick={() => handleToggle(cls.id)}
                  className="p-6 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-4">
                      {cls.name}
                    </h2>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(cls.id);
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {expanded === cls.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{cls.totalStudents}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Students</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getAcademicColor(cls.avgAcademicScore)}`}>
                        {cls.avgAcademicScore}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Academic</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getAttendanceColor(cls.attendance)}`}>
                        {cls.attendance}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Attendance</div>
                    </div>
                  </div>
                  
                  {/* Expandable metrics */}
                  <div 
                    className={`transition-all duration-300 space-y-4 ${
                      expanded === cls.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 hidden'
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm text-gray-500 dark:text-gray-400">BMI Status</div>
                          <StatusBadge text={cls.metrics.bmi} type="bmi" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-sm text-gray-500 dark:text-gray-400">SEL Status</div>
                          <StatusBadge text={cls.metrics.sel} type="sel" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Last updated: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                  <button
                    className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                    onClick={() => handleGoToClass(cls.id)}
                  >
                    Go to Class
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;