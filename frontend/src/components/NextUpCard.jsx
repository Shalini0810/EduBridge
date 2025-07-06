import { motion } from 'framer-motion'
import { Clock, ChevronRight, BookOpen, Heart, FileText } from 'lucide-react'

const NextUpCard = ({ events }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case 'class':
        return BookOpen
      case 'health':
        return Heart
      case 'assignment':
        return FileText
      default:
        return Clock
    }
  }

  const getEventColor = (type) => {
    switch (type) {
      case 'class':
        return 'blue'
      case 'health':
        return 'red'
      case 'assignment':
        return 'orange'
      default:
        return 'gray'
    }
  }

  const nextEvent = events[0]
  const Icon = getEventIcon(nextEvent?.type)
  const color = getEventColor(nextEvent?.type)

  return (
    <motion.div
      className="card bg-gradient-to-br from-white to-gray-50"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Next Up</h3>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`p-2 rounded-full bg-${color}-100`}
        >
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </motion.div>
      </div>

      {nextEvent ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className={`p-4 rounded-lg border-l-4 border-l-${color}-500 bg-${color}-50`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{nextEvent.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {nextEvent.time}
                </p>
              </div>
              <ChevronRight className={`h-5 w-5 text-${color}-600`} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h5 className="font-medium text-gray-900 mb-2">What to prepare:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {nextEvent.type === 'class' && (
                <>
                  <li>• Review previous lesson notes</li>
                  <li>• Bring calculator and textbook</li>
                  <li>• Complete homework assignment</li>
                </>
              )}
              {nextEvent.type === 'health' && (
                <>
                  <li>• Bring health card</li>
                  <li>• Fast for 8 hours before check-up</li>
                  <li>• List any symptoms or concerns</li>
                </>
              )}
              {nextEvent.type === 'assignment' && (
                <>
                  <li>• Final review of project</li>
                  <li>• Check formatting requirements</li>
                  <li>• Prepare presentation slides</li>
                </>
              )}
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full btn-${color} text-sm`}
          >
            Mark as Prepared
          </motion.button>
        </motion.div>
      ) : (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No upcoming events</p>
        </div>
      )}
    </motion.div>
  )
}

export default NextUpCard
