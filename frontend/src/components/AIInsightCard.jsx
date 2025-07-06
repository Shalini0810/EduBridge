import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  Target, 
  AlertCircle, 
  CheckCircle, 
  Download,
  Sparkles,
  BarChart3,
  FileText
} from 'lucide-react'
import AIAnalysisService from '../services/aiAnalysisService'

const AIInsightCard = ({ progressCategories = [], tasks = [], badges = [] }) => {
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState('insights')

  useEffect(() => {
    const performAnalysis = async () => {
      setLoading(true)
      try {
        // Prepare student data for analysis
        const studentData = {
          progressCategories: progressCategories.length > 0 ? progressCategories : [
            { id: 'academics', name: 'Academics', score: 85, trend: '+5%' },
            { id: 'health', name: 'Health', score: 92, trend: '+8%' },
            { id: 'goals', name: 'Goals', score: 78, trend: '+12%' },
            { id: 'emotional', name: 'Emotional', score: 88, trend: '+3%' }
          ],
          weeklyProgress: 92,
          badges: badges.length > 0 ? badges : [
            { id: 1, name: 'Math Master', description: 'Excellent math performance' },
            { id: 2, name: 'Consistent Learner', description: '7 days streak' },
            { id: 3, name: 'Goal Achiever', description: 'Completed monthly goals' }
          ],
          tasks: tasks.length > 0 ? tasks : [
            { id: 1, title: 'Math Assignment', priority: 'high', status: 'pending' },
            { id: 2, title: 'Biology Quiz', priority: 'medium', status: 'completed' },
            { id: 3, title: 'History Essay', priority: 'low', status: 'pending' }
          ],
          schedule: [],
          youtubeEngagement: { totalWatchTime: 120, completedVideos: 5 },
          studentName: 'Demo Student'
        }

        const result = await AIAnalysisService.analyzeStudentProgress(studentData)
        setAnalysis(result)
      } catch (error) {
        console.error('AI Analysis failed:', error)
      } finally {
        setLoading(false)
      }
    }

    performAnalysis()
  }, [progressCategories, tasks, badges])

  const handleDownloadReport = async () => {
    if (!analysis) return

    try {
      const studentData = {
        progressCategories: progressCategories.length > 0 ? progressCategories : [
          { id: 'academics', name: 'Academics', score: 85, trend: '+5%' },
          { id: 'health', name: 'Health', score: 92, trend: '+8%' },
          { id: 'goals', name: 'Goals', score: 78, trend: '+12%' },
          { id: 'emotional', name: 'Emotional', score: 88, trend: '+3%' }
        ],
        studentName: 'Demo Student'
      }

      const pdf = await AIAnalysisService.generatePDFReport(analysis, studentData)
      pdf.save(`Student_Progress_Report_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('PDF generation failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
        />
        <span className="ml-3 text-gray-600">AI is analyzing your progress...</span>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="text-center p-6 text-gray-500">
        <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Unable to generate AI insights at this time.</p>
      </div>
    )
  }

  const tabs = [
    { id: 'insights', label: 'Key Insights', icon: Sparkles },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
    { id: 'risks', label: 'Risk Assessment', icon: AlertCircle }
  ]

  return (
    <div className="space-y-6">
      {/* Header with Download Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center"
          >
            <Brain className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Analysis Complete</h3>
            <p className="text-xs text-gray-500">Generated {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadReport}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </motion.button>
      </div>

      {/* Performance Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Overall Performance</h4>
            <p className="text-sm text-gray-600 mt-1">
              {analysis.overallPerformance.performanceLevel} • {analysis.overallPerformance.trendDirection}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {analysis.overallPerformance.averageScore}%
            </div>
            <div className="text-xs text-gray-500">Average Score</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[200px]"
      >
        {selectedTab === 'insights' && (
          <div className="space-y-4">
            {/* Strengths */}
            <div>
              <h5 className="font-medium text-green-800 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Top Strengths
              </h5>
              <div className="space-y-2">
                {analysis.strengthsAndWeaknesses.topStrengths.map((strength, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="font-medium text-green-800">{strength.area}</div>
                    <div className="text-sm text-green-600 mt-1">{strength.insight}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Insight */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4">
              <h5 className="font-medium text-purple-800 mb-2">🎯 Motivation Boost</h5>
              <p className="text-purple-700">{analysis.motivationalInsights.motivationalMessage}</p>
              {analysis.motivationalInsights.nextMilestone && (
                <p className="text-sm text-purple-600 mt-2">
                  Next milestone: {analysis.motivationalInsights.nextMilestone}
                </p>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'performance' && (
          <div className="space-y-4">
            {/* Future Projections */}
            <div>
              <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                4-Week Projections
              </h5>
              <div className="space-y-3">
                {analysis.futureProjections.map((projection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{projection.category}</div>
                      <div className="text-sm text-gray-600">{projection.trend}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {projection.currentScore}% → {projection.projectedScore}%
                      </div>
                      <div className="text-xs text-gray-500">{projection.confidence} confidence</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'recommendations' && (
          <div className="space-y-3">
            {analysis.recommendations && analysis.recommendations.length > 0 ? (
              analysis.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          recommendation.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : recommendation.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {recommendation.priority} Priority
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {recommendation.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{recommendation.action}</p>
                      {recommendation.motivationalNote && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-md p-2 mb-2">
                          <p className="text-sm text-purple-700 font-medium">{recommendation.motivationalNote}</p>
                        </div>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Timeline: {recommendation.timeframe}</span>
                        {recommendation.resources && recommendation.resources.length > 0 && (
                          <span>Resources: {recommendation.resources.slice(0, 2).join(', ')}</span>
                        )}
                      </div>
                    </div>
                    <Target className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h5 className="font-medium text-gray-800 mb-1">Generating Recommendations</h5>
                <p className="text-sm text-gray-600">AI is analyzing your progress to create personalized recommendations.</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'risks' && (
          <div className="space-y-3">
            {analysis.riskAssessment.length > 0 ? (
              analysis.riskAssessment.map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-lg p-4 ${
                    risk.severity === 'High' 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-yellow-200 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <AlertCircle className={`h-5 w-5 mt-1 ${
                      risk.severity === 'High' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{risk.type}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          risk.severity === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {risk.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                      <div className="text-sm text-gray-700">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h5 className="font-medium text-green-800 mb-1">All Clear!</h5>
                <p className="text-sm text-green-600">No significant risks detected in your progress.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AIInsightCard
