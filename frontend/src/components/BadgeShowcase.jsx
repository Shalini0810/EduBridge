import { motion } from 'framer-motion'
import { Award, Star, Trophy, Medal, Crown, Zap, Lock, Sparkles, Flame, Heart, Brain, Target, Shield, Rocket } from 'lucide-react'

const BadgeShowcase = ({ badges = [] }) => {
  // Ensure badges is an array
  const badgesArray = Array.isArray(badges) ? badges : []
  
  // Gamified character badges based on actual earned badges
  const characterBadges = [
    {
      id: 1,
      name: '� Perfect Attendance',
      character: '📚',
      icon: 'star',
      color: 'yellow',
      description: 'Master of Consistency',
      earned: true,
      earnedDate: '2024-01-15',
      progress: 100,
      totalRequired: 7,
      currentCount: 7,
      rarity: 'legendary',
      powers: ['Perfect Attendance', 'Discipline', 'Time Management'],
      achievement: 'No absences for a full week'
    },
    {
      id: 2,
      name: '💪 Health Champion',
      character: '🏆',
      icon: 'heart',
      color: 'green',
      description: 'Guardian of Wellness',
      earned: true,
      earnedDate: '2024-01-10',
      progress: 100,
      totalRequired: 30,
      currentCount: 30,
      rarity: 'epic',
      powers: ['Nutrition Mastery', 'Fitness Champion', 'Mental Balance'],
      achievement: 'Completed all health goals for the month'
    },
    {
      id: 3,
      name: '🔥 Study Streak',
      character: '⚡',
      icon: 'flame',
      color: 'red',
      description: 'Conqueror of Knowledge',
      earned: true,
      earnedDate: '2024-01-08',
      progress: 100,
      totalRequired: 7,
      currentCount: 7,
      rarity: 'rare',
      powers: ['Study Streaks', 'Focus Power', 'Consistency'],
      achievement: '7 consecutive days of study sessions'
    },
    {
      id: 4,
      name: '🎯 Goal Crusher',
      character: '🚀',
      icon: 'target',
      color: 'blue',
      description: 'Destroyer of Limits',
      earned: true,
      earnedDate: '2024-01-05',
      progress: 100,
      totalRequired: 10,
      currentCount: 10,
      rarity: 'epic',
      powers: ['Goal Setting', 'Achievement Hunter', 'Motivation Boost'],
      achievement: 'Achieved 10 personal goals'
    },
    {
      id: 5,
      name: '🧮 Math Master',
      character: '🧙‍♂️',
      icon: 'brain',
      color: 'purple',
      description: 'Wizard of Numbers',
      earned: true,
      earnedDate: '2024-01-01',
      progress: 100,
      totalRequired: 3,
      currentCount: 3,
      rarity: 'legendary',
      powers: ['Mathematical Genius', 'Problem Solving', 'Analytical Thinking'],
      achievement: 'Scored 95% or higher in 3 consecutive math tests'
    },
    {
      id: 6,
      name: '🛡️ Progress Guardian',
      character: '🛡️',
      icon: 'shield',
      color: 'cyan',
      description: 'Protector of Growth',
      earned: false,
      progress: 45,
      totalRequired: 50,
      currentCount: 22,
      rarity: 'legendary',
      powers: ['Consistency Shield', 'Progress Tracking', 'Growth Mindset'],
      achievement: 'Maintain consistent progress for 50 days'
    },
    {
      id: 7,
      name: '🌟 Future Star',
      character: '🌠',
      icon: 'rocket',
      color: 'indigo',
      description: 'Explorer of Possibilities',
      earned: false,
      progress: 20,
      totalRequired: 60,
      currentCount: 12,
      rarity: 'legendary',
      powers: ['Innovation', 'Leadership', 'Future Vision'],
      achievement: 'Complete 60 advanced challenges'
    }
  ]

  const displayBadges = characterBadges

  const getBadgeIcon = (iconType) => {
    switch (iconType) {
      case 'star':
        return Star
      case 'trophy':
        return Trophy
      case 'medal':
        return Medal
      case 'crown':
        return Crown
      case 'zap':
        return Zap
      case 'heart':
        return Heart
      case 'flame':
        return Flame
      case 'brain':
        return Brain
      case 'target':
        return Target
      case 'shield':
        return Shield
      case 'rocket':
        return Rocket
      default:
        return Award
    }
  }

  const getBadgeColors = (color, earned = true, rarity = 'common') => {
    const baseColors = {
      yellow: { primary: 'yellow', secondary: 'amber' },
      green: { primary: 'emerald', secondary: 'green' },
      blue: { primary: 'blue', secondary: 'sky' },
      red: { primary: 'red', secondary: 'rose' },
      purple: { primary: 'purple', secondary: 'violet' },
      cyan: { primary: 'cyan', secondary: 'teal' },
      indigo: { primary: 'indigo', secondary: 'blue' }
    }

    const colorScheme = baseColors[color] || baseColors.blue
    const opacity = earned ? '' : 'opacity-60'
    
    // Rarity-based styling
    const rarityStyles = {
      common: 'shadow-md',
      rare: 'shadow-lg ring-2 ring-blue-200',
      epic: 'shadow-xl ring-2 ring-purple-300 animate-pulse',
      legendary: 'shadow-2xl ring-4 ring-gradient-to-r ring-yellow-400 ring-orange-400'
    }

    return {
      bg: `bg-gradient-to-br from-${colorScheme.primary}-50 to-${colorScheme.secondary}-100 ${opacity}`,
      icon: `text-${colorScheme.primary}-600`,
      border: `border-${colorScheme.primary}-200 ${rarityStyles[rarity]}`,
      progress: `bg-${colorScheme.primary}-500`,
      progressBg: `bg-${colorScheme.primary}-100`,
      character: earned ? 'grayscale-0' : 'grayscale filter',
      rarity: rarityStyles[rarity]
    }
  }

  const getRarityLabel = (rarity) => {
    const labels = {
      common: { text: 'Common', color: 'text-gray-600', bg: 'bg-gray-100' },
      rare: { text: 'Rare', color: 'text-blue-600', bg: 'bg-blue-100' },
      epic: { text: 'Epic', color: 'text-purple-600', bg: 'bg-purple-100' },
      legendary: { text: 'Legendary', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    }
    return labels[rarity] || labels.common
  }

  if (displayBadges.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎮</div>
        <p className="text-gray-500 text-lg font-medium">No Characters Unlocked Yet</p>
        <p className="text-sm text-gray-400">Complete activities to unlock amazing characters!</p>
      </div>
    )
  }

  const earnedCount = displayBadges.filter(badge => badge.earned).length
  const totalBadges = displayBadges.length

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Character Collection</h3>
            <p className="text-purple-100 text-sm">
              {earnedCount} of {totalBadges} characters unlocked
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{Math.round((earnedCount / totalBadges) * 100)}%</div>
            <div className="text-xs text-purple-100">Complete</div>
          </div>
        </div>
        <div className="mt-3 bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${(earnedCount / totalBadges) * 100}%` }}
          />
        </div>
      </div>

      {/* Character Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayBadges.map((badge, index) => {
          const Icon = getBadgeIcon(badge.icon)
          const colors = getBadgeColors(badge.color, badge.earned, badge.rarity)
          const rarityLabel = getRarityLabel(badge.rarity)

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: badge.earned ? 1.05 : 1.02, y: -5 }}
              className={`relative p-4 rounded-2xl border-2 ${colors.border} ${colors.bg} ${colors.rarity} transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                {badge.earned && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4 text-4xl opacity-10"
                  >
                    ✨
                  </motion.div>
                )}
              </div>

              {/* Lock Overlay for Unearned Badges */}
              {!badge.earned && (
                <div className="absolute inset-0 bg-gray-900/10 rounded-2xl flex items-center justify-center">
                  <Lock className="h-8 w-8 text-gray-400" />
                </div>
              )}

              {/* Rarity Badge */}
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${rarityLabel.bg} ${rarityLabel.color}`}>
                {rarityLabel.text}
              </div>

              {/* Character Avatar */}
              <div className="flex items-center justify-center mb-3">
                <motion.div
                  className={`text-4xl ${colors.character} ${badge.earned ? 'animate-bounce' : ''}`}
                  whileHover={badge.earned ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {badge.character}
                </motion.div>
              </div>

              {/* Badge Info */}
              <div className="text-center mb-3">
                <h4 className="font-bold text-gray-900 text-sm mb-1">
                  {badge.name}
                </h4>
                <p className="text-xs text-gray-600 mb-1">
                  {badge.description}
                </p>
                {badge.achievement && (
                  <p className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                    {badge.achievement}
                  </p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{badge.currentCount}/{badge.totalRequired}</span>
                </div>
                <div className={`w-full ${colors.progressBg} rounded-full h-2`}>
                  <motion.div
                    className={`${colors.progress} h-2 rounded-full transition-all duration-500`}
                    initial={{ width: 0 }}
                    animate={{ width: `${badge.progress}%` }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </div>

              {/* Powers */}
              {badge.earned && (
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-700 mb-1">Powers:</div>
                  {badge.powers.map((power, powerIndex) => (
                    <motion.div
                      key={powerIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + powerIndex * 0.1 + 0.5 }}
                      className="flex items-center space-x-1 text-xs text-gray-600"
                    >
                      <Sparkles className="h-3 w-3 text-yellow-500" />
                      <span>{power}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Earned Date */}
              {badge.earned && badge.earnedDate && (
                <div className="text-center mt-3 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Unlocked {new Date(badge.earnedDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Unlock Requirements for Unearned Badges */}
              {!badge.earned && (
                <div className="text-center mt-3 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    {badge.totalRequired - badge.currentCount} more activities needed
                  </p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Collection Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200"
      >
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{earnedCount}</div>
            <div className="text-xs text-gray-600">Characters Unlocked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{totalBadges - earnedCount}</div>
            <div className="text-xs text-gray-600">To Unlock</div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300"
        >
          🎯 View All Characters & Unlock Requirements
        </motion.button>
      </motion.div>
    </div>
  )
}

export default BadgeShowcase
