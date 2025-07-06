import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, BarChart2, Users, GraduationCap, Activity as HealthIcon, Calendar, Filter } from 'lucide-react';

const Summary = ({ studentData = [] }) => {
  const [timeRange, setTimeRange] = useState('term');
  const [chartType, setChartType] = useState('pie');
  
  // Use studentData prop instead of hard-coded data, falling back to empty array if not provided
  const students = useMemo(() => studentData.length > 0 ? studentData : [], [studentData]);

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

  const COLORS = {
    primary: ['#4F46E5', '#2563EB', '#0891B2', '#059669', '#D97706', '#DC2626'],
    bmi: {
      'Underweight': '#F59E0B',
      'Healthy': '#10B981',
      'Monitor': '#F97316',
      'Concern': '#EF4444'
    },
    behaviour: {
      'Positive': '#10B981',
      'Stable': '#3B82F6',
      'Needs Support': '#F97316'
    },
    attendance: {
      'Excellent (95%+)': '#10B981',
      'Good (85-94%)': '#3B82F6',
      'Average (75-84%)': '#F59E0B',
      'Poor (<75%)': '#EF4444'
    },
    academic: {
      'Excellent (90%+)': '#10B981',
      'Good (80-89%)': '#3B82F6',
      'Average (70-79%)': '#F59E0B',
      'Poor (<70%)': '#EF4444'
    }
  };

  // Memoize chart data calculations
  const bmiChartData = useMemo(() => {
    if (!students.length) return [];
    
    const bmiData = students.map(student => {
      const bmi = calculateBMI(student.weight, student.height);
      return getBMIStatus(bmi);
    }).reduce((acc, status) => {
      if (status) acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(bmiData).map(([status, count]) => ({
      name: status,
      value: count,
      percentage: ((count / students.length) * 100).toFixed(1)
    }));
  }, [students]);

  const behaviourChartData = useMemo(() => {
    if (!students.length) return [];
    
    const behaviourData = students.reduce((acc, student) => {
      if (student.behaviour) acc[student.behaviour] = (acc[student.behaviour] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(behaviourData).map(([behaviour, count]) => ({
      name: behaviour,
      value: count,
      percentage: ((count / students.length) * 100).toFixed(1)
    }));
  }, [students]);

  const attendanceChartData = useMemo(() => {
    if (!students.length) return [];
    
    const attendanceRanges = students.map(student => {
      const attendance = student.attendance || 0;
      if (attendance >= 95) return 'Excellent (95%+)';
      if (attendance >= 85) return 'Good (85-94%)';
      if (attendance >= 75) return 'Average (75-84%)';
      return 'Poor (<75%)';
    }).reduce((acc, range) => {
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(attendanceRanges).map(([range, count]) => ({
      name: range,
      value: count,
      percentage: ((count / students.length) * 100).toFixed(1)
    }));
  }, [students]);

  const academicChartData = useMemo(() => {
    if (!students.length) return [];
    
    const academicRanges = students.map(student => {
      const academic = student.academic || 0;
      if (academic >= 90) return 'Excellent (90%+)';
      if (academic >= 80) return 'Good (80-89%)';
      if (academic >= 70) return 'Average (70-79%)';
      return 'Poor (<70%)';
    }).reduce((acc, range) => {
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(academicRanges).map(([range, count]) => ({
      name: range,
      value: count,
      percentage: ((count / students.length) * 100).toFixed(1)
    }));
  }, [students]);

  const overallData = useMemo(() => {
    if (!students.length) return [];
    
    return students.map(student => ({
      name: student.name?.split(' ')[0] || 'Unknown', // First name only
      attendance: student.attendance || 0,
      academic: student.academic || 0,
      bmi: parseFloat(calculateBMI(student.weight, student.height)) || 0
    }));
  }, [students]);

  // For the trend line chart - mock data, would be replaced with actual data
  const trendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      name: month,
      attendance: 75 + Math.random() * 20,
      academic: 70 + Math.random() * 25,
    }));
  }, []);

  const calculateAverages = () => {
    if (!students.length) return { attendance: 0, academic: 0, healthy: 0 };
    
    const attendance = students.reduce((sum, s) => sum + (parseFloat(s.attendance) || 0), 0) / students.length;
    const academic = students.reduce((sum, s) => sum + (parseFloat(s.academic) || 0), 0) / students.length;
    const healthy = bmiChartData.find(d => d.name === 'Healthy')?.value || 0;
    
    return { attendance, academic, healthy };
  };
  
  const { attendance, academic, healthy } = calculateAverages();

  // Enhanced tooltip component with better styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
            {payload[0].payload.name}
          </h4>
          {payload.map((entry, index) => (
            <div key={`tooltip-${index}`} className="flex items-center py-1">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-gray-600 dark:text-gray-300">{entry.name}: </span>
              <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">
                {entry.value} {entry.name.includes('%') ? '' : (entry.value === 1 ? 'student' : 'students')}
              </span>
            </div>
          ))}
          {payload[0].payload.percentage && (
            <div className="mt-1 pt-1 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              {payload[0].payload.percentage}% of class
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color.replace('text-', '')}-100 dark:bg-${color.replace('text-', '')}-900/30`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs. last term</span>
          </span>
        </div>
      )}
    </div>
  );

  const ChartContainer = ({ title, children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl ${className}`}>
      <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Class Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Summary dashboard of student performance metrics</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="term">This Term</option>
              <option value="year">This Year</option>
            </select>
            <Calendar size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
          
          <div className="relative">
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pie">Pie Charts</option>
              <option value="bar">Bar Charts</option>
            </select>
            <Filter size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>
      
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Students" 
          value={students.length} 
          subtitle="enrolled in this class"
          icon={<Users size={20} className="text-indigo-600 dark:text-indigo-400" />}
          color="text-indigo-600 dark:text-indigo-400"
          trend={2.5}
        />
        <StatCard 
          title="Average Attendance" 
          value={`${attendance.toFixed(1)}%`}
          subtitle="class attendance rate"
          icon={<Activity size={20} className="text-blue-600 dark:text-blue-400" />}
          color="text-blue-600 dark:text-blue-400"
          trend={1.2}
        />
        <StatCard 
          title="Academic Performance" 
          value={`${academic.toFixed(1)}%`}
          subtitle="class average score"
          icon={<GraduationCap size={20} className="text-emerald-600 dark:text-emerald-400" />}
          color="text-emerald-600 dark:text-emerald-400"
          trend={-0.8}
        />
        <StatCard 
          title="Healthy BMI" 
          value={healthy}
          subtitle={`${((healthy / students.length) * 100).toFixed(0)}% of students`}
          icon={<HealthIcon size={20} className="text-amber-600 dark:text-amber-400" />}
          color="text-amber-600 dark:text-amber-400"
          trend={0}
        />
      </div>

      {/* Performance Trend Chart */}
      <ChartContainer title="Class Performance Trends" className="col-span-1 lg:col-span-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="#3B82F6" 
              strokeWidth={2}
              activeDot={{ r: 6 }} 
              name="Attendance %" 
            />
            <Line 
              type="monotone" 
              dataKey="academic" 
              stroke="#10B981" 
              strokeWidth={2}
              activeDot={{ r: 6 }} 
              name="Academic %" 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BMI Distribution */}
        <ChartContainer title="BMI Distribution">
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={bmiChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={chartType === 'pie' ? 0 : 60}
                  paddingAngle={chartType === 'pie' ? 0 : 5}
                  dataKey="value"
                  label={({ name, percentage }) => `${percentage}%`}
                >
                  {bmiChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-bmi-${index}`} 
                      fill={COLORS.bmi[entry.name] || COLORS.primary[index % COLORS.primary.length]} 
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
              </PieChart>
            ) : (
              <BarChart data={bmiChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Students">
                  {bmiChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-bmi-bar-${index}`} 
                      fill={COLORS.bmi[entry.name] || COLORS.primary[index % COLORS.primary.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>

        {/* Behaviour Distribution */}
        <ChartContainer title="Behaviour Distribution">
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={behaviourChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={chartType === 'pie' ? 0 : 60}
                  paddingAngle={chartType === 'pie' ? 0 : 5}
                  dataKey="value"
                  label={({ name, percentage }) => `${percentage}%`}
                >
                  {behaviourChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-behaviour-${index}`} 
                      fill={COLORS.behaviour[entry.name] || COLORS.primary[index % COLORS.primary.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
              </PieChart>
            ) : (
              <BarChart data={behaviourChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Students">
                  {behaviourChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-behaviour-bar-${index}`} 
                      fill={COLORS.behaviour[entry.name] || COLORS.primary[index % COLORS.primary.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>

        {/* Attendance Distribution */}
        <ChartContainer title="Attendance Distribution">
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={attendanceChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={chartType === 'pie' ? 0 : 60}
                  paddingAngle={chartType === 'pie' ? 0 : 5}
                  dataKey="value"
                  label={({ name, percentage }) => `${percentage}%`}
                >
                  {attendanceChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-attendance-${index}`} 
                      fill={COLORS.attendance[entry.name] || COLORS.primary[index % COLORS.primary.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
              </PieChart>
            ) : (
              <BarChart data={attendanceChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Students">
                  {attendanceChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-attendance-bar-${index}`} 
                      fill={COLORS.attendance[entry.name] || COLORS.primary[index % COLORS.primary.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>

        {/* Academic Distribution */}
        <ChartContainer title="Academic Distribution">
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={academicChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={chartType === 'pie' ? 0 : 60}
                  paddingAngle={chartType === 'pie' ? 0 : 5}
                  dataKey="value"
                  label={({ name, percentage }) => `${percentage}%`}
                >
                  {academicChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-academic-${index}`} 
                      fill={COLORS.academic[entry.name] || COLORS.primary[index % COLORS.primary.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
              </PieChart>
            ) : (
              <BarChart data={academicChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Students">
                  {academicChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-academic-bar-${index}`} 
                      fill={COLORS.academic[entry.name] || COLORS.primary[index % COLORS.primary.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Overall Performance Comparison */}
      <ChartContainer title="Individual Student Performance">
        <div className="mb-4 flex justify-end">
          <div className="text-xs text-gray-500 dark:text-gray-400 italic">
            Showing {overallData.length} students
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={overallData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              angle={students.length > 10 ? -45 : 0}
              textAnchor={students.length > 10 ? "end" : "middle"}
              height={60}
            />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar 
              dataKey="attendance" 
              fill="#3B82F6" 
              name="Attendance %"
              radius={[4, 4, 0, 0]} 
              barSize={students.length > 10 ? 15 : 30}
              animationDuration={1000}
            />
            <Bar 
              dataKey="academic" 
              fill="#10B981" 
              name="Academic %" 
              radius={[4, 4, 0, 0]}
              barSize={students.length > 10 ? 15 : 30}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default Summary;