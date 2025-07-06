import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Download,
  Filter,
  Search,
  Plus,
  Settings,
  FileText,
  Calendar,
  Award,
  BookOpen,
  Heart,
  Target,
  Brain,
  Eye,
  Edit,
  Trash2,
  Upload,
  UserPlus,
  Shield,
  MessageSquare
} from 'lucide-react'
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

const AdminDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month')
  const [activeTab, setActiveTab] = useState('overview')

  // Sample analytics data
  const overviewStats = [
    { label: 'Total Students', value: 1247, change: '+12%', icon: Users, color: 'blue' },
    { label: 'Total Teachers', value: 84, change: '+3%', icon: BookOpen, color: 'green' },
    { label: 'Active Classes', value: 156, change: '+8%', icon: Calendar, color: 'purple' },
    { label: 'At Risk Students', value: 23, change: '-15%', icon: AlertTriangle, color: 'red' }
  ]

  const performanceData = [
    { month: 'Jan', academics: 82, health: 87, emotional: 78, goals: 75 },
    { month: 'Feb', academics: 85, health: 89, emotional: 81, goals: 78 },
    { month: 'Mar', academics: 88, health: 91, emotional: 84, goals: 82 },
    { month: 'Apr', academics: 87, health: 88, emotional: 86, goals: 85 },
    { month: 'May', academics: 90, health: 92, emotional: 89, goals: 88 },
    { month: 'Jun', academics: 92, health: 94, emotional: 91, goals: 90 }
  ]

  const classPerformance = [
    { class: '10A', students: 28, avgScore: 87, attendance: 92, teacher: 'Ms. Johnson' },
    { class: '10B', students: 26, avgScore: 83, attendance: 89, teacher: 'Mr. Smith' },
    { class: '9A', students: 30, avgScore: 85, attendance: 91, teacher: 'Ms. Davis' },
    { class: '9B', students: 29, avgScore: 81, attendance: 87, teacher: 'Mr. Wilson' },
    { class: '8A', students: 32, avgScore: 79, attendance: 88, teacher: 'Ms. Brown' }
  ]

  const teacherPerformance = [
    { 
      name: 'Ms. Johnson', 
      classes: 2, 
      students: 54, 
      avgScore: 87, 
      engagement: 92, 
      satisfaction: 4.8,
      status: 'excellent'
    },
    { 
      name: 'Mr. Smith', 
      classes: 3, 
      students: 78, 
      avgScore: 83, 
      engagement: 88, 
      satisfaction: 4.5,
      status: 'good'
    },
    { 
      name: 'Ms. Davis', 
      classes: 2, 
      students: 59, 
      avgScore: 85, 
      engagement: 90, 
      satisfaction: 4.7,
      status: 'excellent'
    }
  ]

  const atRiskStudents = [
    {
      name: 'Alex Thompson',
      class: '10B',
      issues: ['Low Attendance', 'Declining Grades'],
      riskLevel: 'high',
      lastUpdate: '2 days ago',
      assignedCounselor: 'Dr. Miller'
    },
    {
      name: 'Sarah Chen',
      class: '9A',
      issues: ['Emotional Distress', 'Social Issues'],
      riskLevel: 'medium',
      lastUpdate: '1 day ago',
      assignedCounselor: 'Ms. Wilson'
    },
    {
      name: 'Michael Rodriguez',
      class: '8A',
      issues: ['Health Concerns', 'Family Issues'],
      riskLevel: 'high',
      lastUpdate: '3 hours ago',
      assignedCounselor: 'Dr. Miller'
    }
  ]

  const userManagementData = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@school.edu',
      role: 'teacher',
      status: 'active',
      lastLogin: '2 hours ago',
      classes: 3
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.j@school.edu',
      role: 'teacher',
      status: 'active',
      lastLogin: '1 day ago',
      classes: 2
    },
    {
      id: 3,
      name: 'David Wilson',
      email: 'david.w@school.edu',
      role: 'counselor',
      status: 'active',
      lastLogin: '5 hours ago',
      classes: 0
    }
  ]

  const systemSettings = [
    {
      category: 'Academic Settings',
      items: [
        { name: 'Grading Scale', value: 'A-F Scale', editable: true },
        { name: 'Academic Year', value: '2023-2024', editable: true },
        { name: 'Report Card Frequency', value: 'Quarterly', editable: true }
      ]
    },
    {
      category: 'Health & Wellness',
      items: [
        { name: 'Health Check Frequency', value: 'Monthly', editable: true },
        { name: 'Counseling Sessions', value: 'As Needed', editable: true },
        { name: 'Emergency Contacts', value: 'Configured', editable: true }
      ]
    },
    {
      category: 'Notifications',
      items: [
        { name: 'Email Notifications', value: 'Enabled', editable: true },
        { name: 'Parent Alerts', value: 'Enabled', editable: true },
        { name: 'Performance Alerts', value: 'Enabled', editable: true }
      ]
    }
  ]

  const studentsList = [
    { id: 1, name: 'Emma Johnson', class: '10A', score: 92, attendance: 98, status: 'excellent' },
    { id: 2, name: 'Michael Chen', class: '10B', score: 85, attendance: 90, status: 'good' },
    { id: 3, name: 'Sophia Rodriguez', class: '9A', score: 76, attendance: 72, status: 'needs-attention' }
  ]

  const volunteersList = [
    { id: 1, name: 'Priya Patel', centre: 'East Centre', hours: 120, status: 'active' },
    { id: 2, name: 'Rahul Mehra', centre: 'West Centre', hours: 80, status: 'active' }
  ]

  const teachersList = [
    { id: 1, name: 'Ms. Johnson', subject: 'Math', classes: 2, students: 54, status: 'excellent' },
    { id: 2, name: 'Mr. Smith', subject: 'Science', classes: 3, students: 78, status: 'good' }
  ]

  const donorsList = [
    { id: 1, name: 'Acme Corp', amount: 10000, lastDonation: '2024-05-01', status: 'active' },
    { id: 2, name: 'Jane Doe', amount: 2500, lastDonation: '2024-04-15', status: 'active' }
  ]

  const studentsLeaderboard = [
    { rank: 1, name: 'Emma Johnson', score: 98 },
    { rank: 2, name: 'Michael Chen', score: 95 },
    { rank: 3, name: 'Sophia Rodriguez', score: 93 }
  ]

  const centresLeaderboard = [
    { rank: 1, centre: 'East Centre', avgScore: 91 },
    { rank: 2, centre: 'West Centre', avgScore: 89 }
  ]

  const donorMessages = [
    { id: 1, from: 'Admin', message: 'Thank you for your generous support!', date: '2024-06-01' },
    { id: 2, from: 'Acme Corp', message: 'Glad to help!', date: '2024-06-02' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100'
      case 'good':
        return 'text-blue-600 bg-blue-100'
      case 'needs-attention':
        return 'text-yellow-600 bg-yellow-100'
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'inactive':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-sm ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                        <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Performance Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="academics" stroke="#3B82F6" strokeWidth={3} name="Academics" />
                  <Line type="monotone" dataKey="health" stroke="#EF4444" strokeWidth={3} name="Health" />
                  <Line type="monotone" dataKey="emotional" stroke="#8B5CF6" strokeWidth={3} name="Emotional" />
                  <Line type="monotone" dataKey="goals" stroke="#10B981" strokeWidth={3} name="Goals" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Leaderboards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Students Leaderboard */}
              <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Students Leaderboard</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentsLeaderboard.map(s => (
                      <tr key={s.rank} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{s.rank}</td>
                        <td className="px-6 py-4">{s.name}</td>
                        <td className="px-6 py-4">{s.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
              {/* Centres Leaderboard */}
              <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Centres Leaderboard</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Centre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Avg Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {centresLeaderboard.map(c => (
                      <tr key={c.rank} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{c.rank}</td>
                        <td className="px-6 py-4">{c.centre}</td>
                        <td className="px-6 py-4">{c.avgScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

            {/* Class Performance Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Class Performance Overview</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teacher
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classPerformance.map((classItem, index) => (
                      <motion.tr
                        key={classItem.class}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{classItem.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{classItem.students}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{classItem.avgScore}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{classItem.attendance}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{classItem.teacher}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <FileText className="h-4 w-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )

      case 'students':
        return (
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Students List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Attendance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentsList.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{s.name}</td>
                      <td className="px-6 py-4">{s.class}</td>
                      <td className="px-6 py-4">{s.score}%</td>
                      <td className="px-6 py-4">{s.attendance}%</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(s.status)}`}>
                          {s.status.replace('-', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )

      case 'volunteers':
        return (
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Volunteers List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Centre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {volunteersList.map(v => (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{v.name}</td>
                      <td className="px-6 py-4">{v.centre}</td>
                      <td className="px-6 py-4">{v.hours}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(v.status)}`}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )

      case 'teachers':
        return (
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Teachers List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Classes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachersList.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{t.name}</td>
                      <td className="px-6 py-4">{t.subject}</td>
                      <td className="px-6 py-4">{t.classes}</td>
                      <td className="px-6 py-4">{t.students}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )

      case 'donors':
        return (
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Donors List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Last Donation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donorsList.map(d => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{d.name}</td>
                      <td className="px-6 py-4">₹{d.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">{d.lastDonation}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(d.status)}`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )

      case 'donor-communication':
        return (
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Donor Communication</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {donorMessages.map(msg => (
                <div key={msg.id} className="p-3 rounded bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary-700">{msg.from}</span>
                    <span className="text-xs text-gray-400">{msg.date}</span>
                  </div>
                  <div className="text-gray-700 mt-1">{msg.message}</div>
                </div>
              ))}
            </div>
            <form className="flex space-x-2">
              <input className="input-field flex-1" placeholder="Type a message to donors..." />
              <button className="btn-primary px-4">Send</button>
            </form>
          </motion.div>
        )

      case 'analytics':
        return (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Teacher Performance Analytics</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teacherPerformance.map((teacher, index) => (
                      <motion.tr
                        key={teacher.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{teacher.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{teacher.classes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{teacher.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{teacher.avgScore}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{teacher.engagement}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{teacher.satisfaction}/5.0</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(teacher.status)}`}>
                            {teacher.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">At-Risk Students</h3>
              <div className="space-y-4">
                {atRiskStudents.map((student, index) => (
                  <motion.div
                    key={student.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <span className="text-sm text-gray-600">Class {student.class}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.riskLevel)}`}>
                            {student.riskLevel} risk
                          </span>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-600">
                            Issues: {student.issues.join(', ')}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Counselor: {student.assignedCounselor} • Last updated: {student.lastUpdate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-primary-600 hover:text-primary-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-700">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="input-field pl-10 w-64"
                  />
                </div>
                <select className="select-field">
                  <option value="all">All Roles</option>
                  <option value="teacher">Teachers</option>
                  <option value="counselor">Counselors</option>
                  <option value="admin">Administrators</option>
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Import</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Add User</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userManagementData.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.classes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Shield className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-8">
            {systemSettings.map((section, sectionIndex) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">{section.category}</h3>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.value}</p>
                      </div>
                      {item.editable && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <Edit className="h-4 w-4" />
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'volunteers', name: 'Volunteers', icon: Users },
    { id: 'teachers', name: 'Teachers', icon: BookOpen },
    { id: 'donors', name: 'Donors', icon: Heart },
    { id: 'donor-communication', name: 'Donor Communication', icon: MessageSquare },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'settings', name: 'System Settings', icon: Settings }
  ]

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
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive system management and analytics</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="select-field text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
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
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${
                      isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    <span>{tab.name}</span>
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
