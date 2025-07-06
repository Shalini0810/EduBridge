import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  TrendingUp, 
  Award, 
  Heart, 
  BookOpen, 
  Target,
  Brain,
  Clock,
  Star,
  ChevronRight,
  Download,
  Sparkles,
  Zap
} from 'lucide-react'
import { useStudent } from '../../context/StudentContext'
import MotivationalQuote from '../../components/MotivationalQuote'
import NextUpCard from '../../components/NextUpCard'
import BadgeShowcase from '../../components/BadgeShowcase'
import SuperpowerCard from '../../components/SuperpowerCard'
import AIInsightCard from '../../components/AIInsightCard'
import YouTubeResources from '../../components/YouTubeResources'
import ProgressCharts from '../../components/ProgressCharts'
import AIAnalysisService from '../../services/aiAnalysisService'

const StudentDashboard = () => {
  const { studentData, badges, progressData } = useStudent()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleDownloadReport = async () => {
    try {
      // Prepare student data for analysis
      const studentDataForAnalysis = {
        progressCategories,
        weeklyProgress: 92,
        badges,
        tasks: upcomingTasks,
        schedule: [],
        youtubeEngagement: { totalWatchTime: 120, completedVideos: 5 },
        studentName: 'Demo Student'
      }

      const analysis = await aiService.analyzeStudentProgress(studentDataForAnalysis)
      const pdf = await aiService.generatePDFReport(analysis, studentDataForAnalysis)
      pdf.save(`Demo_Student_Progress_Report_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('Failed to generate report. Please try again.')
    }
  }

  const progressCategories = [
    {
      id: 'academics',
      name: 'Academics',
      icon: BookOpen,
      color: 'blue',
      score: 85,
      trend: '+5%'
    },
    {
      id: 'health',
      name: 'Health',
      icon: Heart,
      color: 'red',
      score: 92,
      trend: '+8%',
      subcategories: [
        { name: 'Nutrition', score: 88, trend: '+6%', icon: '🥗', description: 'Balanced diet and hydration' },
        { name: 'Fitness', score: 95, trend: '+12%', icon: '💪', description: 'Physical activity and exercise' },
        { name: 'Mental Health', score: 90, trend: '+7%', icon: '🧠', description: 'Stress management and mindfulness' },
        { name: 'Class Engagement', score: 96, trend: '+5%', icon: '🙋‍♂️', description: 'Active participation observed by teacher' }
      ]
    },
    {
      id: 'goals',
      name: 'Goals',
      icon: Target,
      color: 'green',
      score: 78,
      trend: '+12%'
    },
    {
      id: 'emotional',
      name: 'Emotional',
      icon: Brain,
      color: 'purple',
      score: 88,
      trend: '+3%'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Mathematics Quiz',
      time: '10:00 AM',
      type: 'class',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Health Check-up',
      time: '2:00 PM',
      type: 'health',
      color: 'red'
    },
    {
      id: 3,
      title: 'Project Submission',
      time: '5:00 PM',
      type: 'assignment',
      color: 'orange'
    }
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: 'Complete Math Assignment',
      time: '2 hours left',
      type: 'assignment',
      subject: 'Mathematics',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Study for Biology Quiz',
      time: '1 day left',
      type: 'class',
      subject: 'Biology',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Submit History Essay',
      time: '3 days left',
      type: 'assignment',
      subject: 'History',
      priority: 'low'
    }
  ]

  const recentBadges = badges.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 rounded-3xl p-8 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute top-20 right-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white border-opacity-30"
                >
                  <span className="text-3xl font-bold text-white">
                    D
                  </span>
                </motion.div>
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    Welcome back, Demo Student! 
                    <motion.span
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="inline-block ml-2"
                    >
                      👋
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white text-opacity-90 text-lg"
                  >
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </motion.p>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex space-x-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadReport}
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-white border border-white border-opacity-30 px-6 py-3 rounded-xl font-medium flex items-center space-x-2 hover:bg-opacity-30 transition-all"
                >
                  <Download className="h-5 w-5" />
                  <span>Download AI Report</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 px-6 py-3 rounded-xl font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>View Profile</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">92%</h3>
            <p className="text-gray-600 text-sm">Overall Progress</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">6</h3>
            <p className="text-gray-600 text-sm">Active Courses</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <span className="text-purple-600 text-sm font-medium bg-purple-50 px-3 py-1 rounded-full">🎮 Characters</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">5/7</h3>
            <p className="text-gray-600 text-sm">Characters Unlocked</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-orange-600 text-sm font-medium bg-orange-50 px-3 py-1 rounded-full">Today</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
            <p className="text-gray-600 text-sm">Tasks Due</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-1 shadow-xl"
            >
              <div className="bg-white rounded-2xl p-6">
                <MotivationalQuote />
              </div>
            </motion.div>

            {/* Next Up Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">What's Next</h3>
                </div>
                <Link
                  to="/student/schedule"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 hover:underline"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                <NextUpCard events={upcomingTasks} />
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">Smart</span>
              </div>
              <AIInsightCard 
                progressCategories={progressCategories}
                tasks={upcomingTasks}
                badges={badges}
              />
            </motion.div>

            {/* Progress Tracker with Interactive Charts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Progress Analytics</h3>
                  <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">Interactive</span>
                </div>
                <Link
                  to="/student/progress"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 hover:underline"
                >
                  <span>View Details</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <ProgressCharts progressCategories={progressCategories} />
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Progress Ring */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${92 * 2.51} 251.2`}
                      className="drop-shadow-sm"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">92%</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Progress</h3>
                <p className="text-gray-600 text-sm">Great job! Keep it up!</p>
              </div>
            </motion.div>

            {/* Character Collection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">🎮 Character Collection</h3>
                    <p className="text-xs text-gray-500">Unlock amazing characters!</p>
                  </div>
                </div>
                <Link
                  to="/student/profile"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 hover:underline"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <BadgeShowcase badges={recentBadges} />
            </motion.div>

            {/* Superpowers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Your Superpowers</h3>
              </div>
              <SuperpowerCard />
            </motion.div>
          </div>
        </div>

        {/* Full-Width YouTube Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Holistic Development Resources</h3>
                <p className="text-gray-600">Explore curated content for your personal growth journey</p>
              </div>
            </div>
            <YouTubeResources />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default StudentDashboard
