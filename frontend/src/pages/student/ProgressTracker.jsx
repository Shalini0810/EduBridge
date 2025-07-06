import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import { 
  BookOpen, 
  Heart, 
  Target, 
  Brain, 
  Download, 
  Calendar,
  TrendingUp,
  Award,
  Filter
} from 'lucide-react'
import ReportModal from '../../components/ReportModal'

const ProgressTracker = () => {
  const [activeTab, setActiveTab] = useState('academics')
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState('month')

  const tabs = [
    { id: 'academics', name: 'Academics', icon: BookOpen, color: 'blue' },
    { id: 'health', name: 'Health', icon: Heart, color: 'red' },
    { id: 'goals', name: 'Goals', icon: Target, color: 'green' },
    { id: 'emotional', name: 'Emotional', icon: Brain, color: 'purple' }
  ]

  // Sample data for different categories
  const academicsData = [
    { subject: 'Math', score: 85, trend: '+5%', assignments: 12, completed: 11 },
    { subject: 'Science', score: 92, trend: '+8%', assignments: 10, completed: 10 },
    { subject: 'English', score: 78, trend: '+2%', assignments: 8, completed: 7 },
    { subject: 'History', score: 88, trend: '+12%', assignments: 6, completed: 6 },
    { subject: 'Art', score: 95, trend: '+3%', assignments: 4, completed: 4 }
  ]

  const progressOverTime = [
    { week: 'Week 1', academics: 75, health: 80, goals: 70, emotional: 85 },
    { week: 'Week 2', academics: 78, health: 85, goals: 75, emotional: 82 },
    { week: 'Week 3', academics: 82, health: 88, goals: 80, emotional: 88 },
    { week: 'Week 4', academics: 85, health: 92, goals: 78, emotional: 90 }
  ]

  const healthData = [
    { 
      metric: 'Nutrition', 
      value: 85, 
      max: 100, 
      color: '#10B981',
      icon: '🥗',
      details: 'Balanced meals, proper portions',
      trend: '+12%',
      goals: ['5 servings fruits/veggies', '8 glasses water', 'Limit processed foods']
    },
    { 
      metric: 'Fitness', 
      value: 78, 
      max: 100, 
      color: '#3B82F6',
      icon: '🏃‍♂️',
      details: 'Regular exercise, strength building',
      trend: '+8%',
      goals: ['30min daily activity', '3x strength training', 'Daily walks']
    },
    { 
      metric: 'Mental Health', 
      value: 92, 
      max: 100, 
      color: '#8B5CF6',
      icon: '🧘‍♂️',
      details: 'Mindfulness, stress management',
      trend: '+15%',
      goals: ['Daily meditation', 'Stress tracking', 'Sleep hygiene']
    },
    { 
      metric: 'Class Engagement', 
      value: 88, 
      max: 100, 
      color: '#F59E0B',
      icon: '🙋‍♂️',
      details: 'Participation, attention, interaction',
      trend: '+5%',
      goals: ['Ask 1 question/class', 'Active listening', 'Help classmates']
    }
  ]

  const healthDetailedData = [
    { category: 'Nutrition', nutrition: 85, fitness: 78, mental: 92, engagement: 88 },
    { category: 'This Week', nutrition: 88, fitness: 82, mental: 94, engagement: 90 },
    { category: 'Last Week', nutrition: 83, fitness: 76, mental: 89, engagement: 85 },
    { category: 'Target', nutrition: 95, fitness: 90, mental: 95, engagement: 92 }
  ]

  const goalsData = [
    { name: 'Completed', value: 78, color: '#10B981' },
    { name: 'In Progress', value: 15, color: '#F59E0B' },
    { name: 'Not Started', value: 7, color: '#EF4444' }
  ]

  const emotionalData = [
    { day: 'Mon', mood: 8, stress: 3, confidence: 7 },
    { day: 'Tue', mood: 9, stress: 2, confidence: 8 },
    { day: 'Wed', mood: 7, stress: 5, confidence: 6 },
    { day: 'Thu', mood: 8, stress: 4, confidence: 7 },
    { day: 'Fri', mood: 9, stress: 2, confidence: 9 },
    { day: 'Sat', mood: 10, stress: 1, confidence: 8 },
    { day: 'Sun', mood: 8, stress: 2, confidence: 8 }
  ]

  const getTabColor = (tabId) => {
    const tab = tabs.find(t => t.id === tabId)
    return tab?.color || 'blue'
  }

  const renderChart = () => {
    switch (activeTab) {
      case 'academics':
        return (
          <div className="space-y-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={academicsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {academicsData.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {subject.trend}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-blue-600">{subject.score}%</span>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Assignments</p>
                      <p className="text-sm font-medium">{subject.completed}/{subject.assignments}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${subject.score}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'health':
        return (
          <div className="space-y-6">
            {/* Health Overview Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Health Categories Overview</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Progress Trends</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={healthDetailedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="nutrition" stroke="#10B981" strokeWidth={3} name="Nutrition" />
                    <Line type="monotone" dataKey="fitness" stroke="#3B82F6" strokeWidth={3} name="Fitness" />
                    <Line type="monotone" dataKey="mental" stroke="#8B5CF6" strokeWidth={3} name="Mental Health" />
                    <Line type="monotone" dataKey="engagement" stroke="#F59E0B" strokeWidth={3} name="Class Engagement" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Detailed Health Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthData.map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{metric.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
                        <p className="text-sm text-gray-600">{metric.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Circle */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-20 h-20">
                      <svg className="transform -rotate-90 w-20 h-20">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="#E5E7EB"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke={metric.color}
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={`${(metric.value / metric.max) * 201.1} 201.1`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{metric.value}%</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 ml-4">
                      <div className="mb-2">
                        <div className="flex justify-between text-sm">
                          <span>Current</span>
                          <span className="font-medium">{metric.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${metric.value}%`,
                              backgroundColor: metric.color
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Goals */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Current Goals</h5>
                    <div className="space-y-1">
                      {metric.goals.map((goal, goalIndex) => (
                        <div key={goalIndex} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                          <span className="text-gray-600">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 px-4 text-sm font-medium rounded-lg transition-colors"
                      style={{
                        backgroundColor: `${metric.color}20`,
                        color: metric.color,
                        border: `1px solid ${metric.color}40`
                      }}
                    >
                      View Detailed Plan
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Health Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-2xl mb-2">🏆</div>
                <h4 className="font-semibold text-gray-900 mb-1">Top Performance</h4>
                <p className="text-lg font-bold text-purple-600">Mental Health</p>
                <p className="text-sm text-gray-600">92% this week</p>
              </div>
              
              <div className="card text-center">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-1">Biggest Improvement</h4>
                <p className="text-lg font-bold text-green-600">Nutrition</p>
                <p className="text-sm text-gray-600">+12% this month</p>
              </div>
              
              <div className="card text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-1">Focus Area</h4>
                <p className="text-lg font-bold text-blue-600">Fitness</p>
                <p className="text-sm text-gray-600">Opportunity for growth</p>
              </div>
            </div>
          </div>
        )

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={goalsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {goalsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Goal Categories</h4>
                {goalsData.map((goal, index) => (
                  <motion.div
                    key={goal.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: goal.color }}
                      />
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <span className="text-lg font-bold">{goal.value}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'emotional':
        return (
          <div className="space-y-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={emotionalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Area type="monotone" dataKey="mood" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Area type="monotone" dataKey="confidence" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Line type="monotone" dataKey="stress" stroke="#ff7300" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="card text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Avg Mood</h4>
                <div className="text-3xl font-bold text-purple-600">8.4</div>
                <p className="text-sm text-gray-600">This week</p>
              </div>
              <div className="card text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Stress Level</h4>
                <div className="text-3xl font-bold text-orange-600">2.7</div>
                <p className="text-sm text-gray-600">Low stress</p>
              </div>
              <div className="card text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Confidence</h4>
                <div className="text-3xl font-bold text-green-600">7.6</div>
                <p className="text-sm text-gray-600">Strong</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Progress Tracker</h1>
              <p className="text-gray-600 mt-1">Monitor your growth across all areas</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="select-field text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="semester">This Semester</option>
                <option value="year">This Year</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReportModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Overall Progress</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="academics" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="health" stroke="#EF4444" strokeWidth={3} />
              <Line type="monotone" dataKey="goals" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="emotional" stroke="#8B5CF6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group inline-flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      isActive
                        ? `border-${tab.color}-500 text-${tab.color}-600`
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${
                      isActive ? `text-${tab.color}-600` : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    <span>{tab.name}</span>
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Chart Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {activeTab} Progress
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`text-${getTabColor(activeTab)}-600 hover:text-${getTabColor(activeTab)}-700 text-sm font-medium`}
            >
              View Detailed Report
            </motion.button>
          </div>
          
          {renderChart()}
        </motion.div>

        {/* Report Modal */}
        {showReportModal && (
          <ReportModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            category={activeTab}
            timeRange={selectedTimeRange}
          />
        )}
      </div>
    </div>
  )
}

export default ProgressTracker
