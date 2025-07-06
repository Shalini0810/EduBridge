import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Award, 
  Star, 
  Trophy, 
  Medal,
  Crown,
  Zap,
  Target,
  Calendar,
  Book,
  Heart,
  Brain,
  TrendingUp,
  MapPin,
  Mail,
  Phone
} from 'lucide-react'
import { useStudent } from '../../context/StudentContext'
import BadgeShowcase from '../../components/BadgeShowcase'

const ProfilePage = () => {
  const { badges, studentData } = useStudent()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Demo Student',
    email: 'student@demo.com',
    phone: '+1 (555) 123-4567',
    grade: '10th Grade',
    section: 'Section A',
    address: '123 Main St, City, State 12345',
    bio: 'Passionate student focused on academic excellence and personal growth.',
    interests: ['Mathematics', 'Science', 'Art', 'Sports']
  })

  // Sample comprehensive badge data
  const allBadges = [
    {
      id: 1,
      name: 'Perfect Attendance',
      description: 'No absences for a full week',
      icon: 'star',
      color: 'yellow',
      earned: true,
      earnedDate: '2024-01-15',
      category: 'Attendance'
    },
    {
      id: 2,
      name: 'Health Champion',
      description: 'Completed all health goals for the month',
      icon: 'trophy',
      color: 'green',
      earned: true,
      earnedDate: '2024-01-10',
      category: 'Health'
    },
    {
      id: 3,
      name: 'Study Streak',
      description: '7 consecutive days of study sessions',
      icon: 'zap',
      color: 'blue',
      earned: true,
      earnedDate: '2024-01-08',
      category: 'Academic'
    },
    {
      id: 4,
      name: 'Goal Crusher',
      description: 'Achieved 10 personal goals',
      icon: 'target',
      color: 'purple',
      earned: true,
      earnedDate: '2024-01-05',
      category: 'Goals'
    },
    {
      id: 5,
      name: 'Math Master',
      description: 'Scored 95% or higher in 3 consecutive math tests',
      icon: 'crown',
      color: 'orange',
      earned: true,
      earnedDate: '2024-01-01',
      category: 'Academic'
    },
    {
      id: 6,
      name: 'Team Player',
      description: 'Actively participated in group projects',
      icon: 'medal',
      color: 'blue',
      earned: false,
      category: 'Social'
    },
    {
      id: 7,
      name: 'Wellness Warrior',
      description: 'Maintained excellent mental health scores',
      icon: 'heart',
      color: 'red',
      earned: false,
      category: 'Emotional'
    }
  ]

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
  }

  const getBadgeIcon = (iconType) => {
    const icons = {
      star: Star,
      trophy: Trophy,
      medal: Medal,
      crown: Crown,
      zap: Zap,
      target: Target,
      heart: Heart
    }
    return icons[iconType] || Award
  }

  const getBadgeColors = (color) => {
    const colors = {
      yellow: {
        bg: 'bg-yellow-100',
        icon: 'text-yellow-600',
        border: 'border-yellow-200'
      },
      green: {
        bg: 'bg-green-100',
        icon: 'text-green-600',
        border: 'border-green-200'
      },
      blue: {
        bg: 'bg-blue-100',
        icon: 'text-blue-600',
        border: 'border-blue-200'
      },
      purple: {
        bg: 'bg-purple-100',
        icon: 'text-purple-600',
        border: 'border-purple-200'
      },
      orange: {
        bg: 'bg-orange-100',
        icon: 'text-orange-600',
        border: 'border-orange-200'
      },
      red: {
        bg: 'bg-red-100',
        icon: 'text-red-600',
        border: 'border-red-200'
      }
    }
    return colors[color] || colors.blue
  }

  const earnedBadges = allBadges.filter(badge => badge.earned)
  const availableBadges = allBadges.filter(badge => !badge.earned)

  const stats = [
    { label: 'Total Badges', value: earnedBadges.length, icon: Award, color: 'text-primary-600' },
    { label: 'Current Level', value: '15', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Days Streak', value: '7', icon: Calendar, color: 'text-blue-600' },
    { label: 'Avg Score', value: '87%', icon: Book, color: 'text-purple-600' }
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
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-1">Manage your information and view achievements</p>
            </div>
            <motion.button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar & Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card text-center"
            >
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl font-bold text-white">
                    {profileData.name.charAt(0)}
                  </span>
                </div>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                  </motion.button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field text-center text-xl font-bold"
                  />
                  <input
                    type="text"
                    value={profileData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    className="input-field text-center"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                  <p className="text-gray-600">{profileData.grade} • {profileData.section}</p>
                </>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">Level 15 Student</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-center p-3 bg-gray-50 rounded-lg"
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-field flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{profileData.email}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input-field flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{profileData.phone}</span>
                  )}
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  {isEditing ? (
                    <textarea
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="input-field flex-1 resize-none"
                      rows={2}
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{profileData.address}</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Badges & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
              
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="input-field w-full resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              )}
            </motion.div>

            {/* Character Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">🎮 Character Collection</h3>
              <BadgeShowcase badges={allBadges} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
