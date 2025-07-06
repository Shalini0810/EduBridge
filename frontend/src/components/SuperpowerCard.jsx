import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Star, Award } from 'lucide-react'

const SuperpowerCard = () => {
  // This would typically come from analyzing student metrics
  const superpower = {
    title: "Consistency Champion",
    description: "You've maintained a 95% attendance rate and completed assignments on time for 3 weeks straight!",
    icon: "star",
    color: "yellow",
    metric: "95% Consistency",
    improvement: "+12% from last month"
  }

  const getIcon = () => {
    switch (superpower.icon) {
      case 'star':
        return Star
      case 'award':
        return Award
      case 'trending':
        return TrendingUp
      default:
        return Sparkles
    }
  }

  const getColorClasses = () => {
    switch (superpower.color) {
      case 'yellow':
        return {
          gradient: 'from-yellow-400 to-orange-500',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800'
        }
      case 'blue':
        return {
          gradient: 'from-blue-400 to-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800'
        }
      case 'green':
        return {
          gradient: 'from-green-400 to-emerald-500',
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800'
        }
      default:
        return {
          gradient: 'from-purple-400 to-pink-500',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-800'
        }
    }
  }

  const Icon = getIcon()
  const colors = getColorClasses()

  return (
    <motion.div
      className="card overflow-hidden relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className={`p-3 rounded-full bg-gradient-to-r ${colors.gradient}`}
            whileHover={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">Your Superpower This Month</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{superpower.title}</h3>
          </div>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          {superpower.description}
        </p>

        <div className={`p-4 rounded-lg ${colors.bg} border ${colors.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold ${colors.text}`}>
                {superpower.metric}
              </p>
              <p className="text-sm text-gray-600">
                {superpower.improvement}
              </p>
            </div>
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <TrendingUp className={`h-6 w-6 ${colors.text}`} />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Keep up the amazing work! 🎉
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SuperpowerCard
