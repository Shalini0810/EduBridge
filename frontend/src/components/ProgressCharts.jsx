import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import { BarChart3, TrendingUp, Target, Activity, Calendar, Heart } from 'lucide-react'

const ProgressCharts = ({ progressCategories }) => {
  const [activeChart, setActiveChart] = useState('spider')

  // Get health subcategories for detailed health analysis
  const healthCategory = progressCategories.find(cat => cat.id === 'health')
  const healthSubcategories = healthCategory?.subcategories || []

  // Data for Spider/Radar Chart - includes health subcategories
  const spiderData = [
    ...progressCategories.filter(cat => cat.id !== 'health').map(category => ({
      subject: category.name,
      score: category.score,
      fullMark: 100
    })),
    ...healthSubcategories.map(subcat => ({
      subject: subcat.name,
      score: subcat.score,
      fullMark: 100
    }))
  ]

  // Data for Bar Chart - includes health breakdown
  const barData = [
    ...progressCategories.filter(cat => cat.id !== 'health').map(category => ({
      name: category.name,
      current: category.score,
      target: 95,
      previous: category.score - parseInt(category.trend.replace('%', '').replace('+', ''))
    })),
    ...healthSubcategories.map(subcat => ({
      name: subcat.name,
      current: subcat.score,
      target: 95,
      previous: subcat.score - parseInt(subcat.trend.replace('%', '').replace('+', ''))
    }))
  ]

  // Data for Line Chart (Weekly Progress Trend) - updated with health subcategories
  const weeklyData = [
    { 
      week: 'Week 1', 
      Academics: 78, 
      Goals: 65, 
      Emotional: 82,
      Nutrition: 82,
      Fitness: 85,
      'Mental Health': 80,
      'Class Engagement': 90
    },
    { 
      week: 'Week 2', 
      Academics: 80, 
      Goals: 68, 
      Emotional: 84,
      Nutrition: 84,
      Fitness: 88,
      'Mental Health': 83,
      'Class Engagement': 92
    },
    { 
      week: 'Week 3', 
      Academics: 82, 
      Goals: 72, 
      Emotional: 86,
      Nutrition: 86,
      Fitness: 92,
      'Mental Health': 87,
      'Class Engagement': 94
    },
    { 
      week: 'Week 4', 
      Academics: 85, 
      Goals: 78, 
      Emotional: 88,
      Nutrition: 88,
      Fitness: 95,
      'Mental Health': 90,
      'Class Engagement': 96
    }
  ]

  // Data for Area Chart (Daily Activity)
  const dailyData = [
    { day: 'Mon', study: 6, exercise: 1.5, sleep: 8, social: 2 },
    { day: 'Tue', study: 7, exercise: 1, sleep: 7.5, social: 2.5 },
    { day: 'Wed', study: 5.5, exercise: 2, sleep: 8, social: 3 },
    { day: 'Thu', study: 8, exercise: 1, sleep: 7, social: 2 },
    { day: 'Fri', study: 6, exercise: 1.5, sleep: 8.5, social: 4 },
    { day: 'Sat', study: 4, exercise: 2.5, sleep: 9, social: 5 },
    { day: 'Sun', study: 3, exercise: 2, sleep: 9, social: 4 }
  ]

  const colors = {
    Academics: '#3B82F6',
    Goals: '#10B981',
    Emotional: '#8B5CF6',
    Nutrition: '#F59E0B',
    Fitness: '#EF4444',
    'Mental Health': '#8B5CF6',
    'Class Engagement': '#06B6D4'
  }

  const RADER_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

  const chartTypes = [
    { id: 'spider', name: 'Overall View', icon: Target, description: 'Complete performance overview' },
    { id: 'health', name: 'Health Focus', icon: Heart, description: 'Detailed health breakdown' },
    { id: 'bar', name: 'Progress Bars', icon: BarChart3, description: 'Current vs target comparison' },
    { id: 'line', name: 'Weekly Trends', icon: TrendingUp, description: 'Weekly progress trends' },
    { id: 'area', name: 'Daily Activity', icon: Activity, description: 'Daily activity breakdown' }
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'score' ? '%' : ''}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    switch (activeChart) {
      case 'spider':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={spiderData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                className="font-medium"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#9ca3af' }}
              />
              <Radar
                name="Current Score"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Target"
                dataKey="fullMark"
                stroke="#e5e7eb"
                fill="transparent"
                strokeDasharray="5 5"
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        )

      case 'health':
        // Health-focused radar chart showing only health subcategories
        const healthData = healthSubcategories.map(subcat => ({
          subject: subcat.name,
          score: subcat.score,
          fullMark: 100,
          description: subcat.description
        }))
        
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🏥 Health & Wellness Breakdown</h3>
              <p className="text-sm text-gray-600">Your comprehensive health performance across all areas</p>
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={healthData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  className="font-medium"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                />
                <Radar
                  name="Current Score"
                  dataKey="score"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Radar
                  name="Target"
                  dataKey="fullMark"
                  stroke="#e5e7eb"
                  fill="transparent"
                  strokeDasharray="5 5"
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>

            {/* Health subcategories grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {healthSubcategories.map((subcat, index) => (
                <motion.div
                  key={subcat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{subcat.icon}</span>
                      <h4 className="font-semibold text-gray-900">{subcat.name}</h4>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-red-600">{subcat.score}%</span>
                      <span className="text-sm text-green-600 font-medium">{subcat.trend}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{subcat.description}</p>
                  <div className="mt-3 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${subcat.score}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="previous" fill="#f3f4f6" name="Previous" radius={[4, 4, 0, 0]} />
              <Bar dataKey="current" fill="#3B82F6" name="Current" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#10B981" name="Target" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip content={<CustomTooltip />} />
              {Object.keys(colors).map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[key]}
                  strokeWidth={3}
                  dot={{ fill: colors[key], strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: colors[key], strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="study"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="exercise"
                stackId="1"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="sleep"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="social"
                stackId="1"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  const getChartDescription = () => {
    const chart = chartTypes.find(c => c.id === activeChart)
    return chart?.description || ''
  }

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2">
        {chartTypes.map((chart) => {
          const Icon = chart.icon
          return (
            <motion.button
              key={chart.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveChart(chart.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                activeChart === chart.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{chart.name}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Chart Description */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
        <p className="text-sm text-gray-700 font-medium">
          {getChartDescription()}
        </p>
      </div>

      {/* Chart Container */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        {renderChart()}
      </motion.div>

      {/* Chart Legend */}
      {activeChart === 'line' && (
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(colors).map(([key, color]) => (
            <div key={key} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-sm text-gray-600">{key}</span>
            </div>
          ))}
        </div>
      )}

      {activeChart === 'area' && (
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { key: 'study', color: '#3B82F6', label: 'Study Hours' },
            { key: 'exercise', color: '#EF4444', label: 'Exercise Hours' },
            { key: 'sleep', color: '#10B981', label: 'Sleep Hours' },
            { key: 'social', color: '#8B5CF6', label: 'Social Hours' }
          ].map(({ key, color, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      )}

      {activeChart === 'bar' && (
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { key: 'previous', color: '#f3f4f6', label: 'Previous' },
            { key: 'current', color: '#3B82F6', label: 'Current' },
            { key: 'target', color: '#10B981', label: 'Target' }
          ].map(({ key, color, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h4 className="font-semibold text-green-800">Strong Areas</h4>
          </div>
          <p className="text-sm text-green-700">
            Health and Emotional wellness are your top performing areas this week.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <h4 className="font-semibold text-amber-800">Focus Areas</h4>
          </div>
          <p className="text-sm text-amber-700">
            Consider spending more time on Goals to reach your target performance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProgressCharts
