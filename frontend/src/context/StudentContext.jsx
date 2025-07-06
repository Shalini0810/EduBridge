import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const StudentContext = createContext()

export const useStudent = () => {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider')
  }
  return context
}

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null)
  const [badges, setBadges] = useState([])
  const [progressData, setProgressData] = useState({
    academics: [],
    health: [],
    goals: [],
    emotional: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudentData()
    fetchBadges()
    fetchProgressData()
  }, [])

  const fetchStudentData = async () => {
    try {
      // Mock student data for demo
      const mockStudentData = {
        id: 1,
        name: 'Demo Student',
        email: 'student@demo.com',
        grade: '10th Grade',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b13c?w=150',
        gpa: 3.7,
        attendance: 94,
        credits: 18
      }
      setStudentData(mockStudentData)
    } catch (error) {
      console.error('Failed to fetch student data:', error)
    }
  }

  const fetchBadges = async () => {
    try {
      // Mock badges data for demo - matching character collection
      const mockBadges = [
        {
          id: 1,
          name: '🎯 Perfect Attendance',
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
        }
      ]
      setBadges(mockBadges)
    } catch (error) {
      console.error('Failed to fetch badges:', error)
      setBadges([]) // Set empty array as fallback
    }
  }

  const fetchProgressData = async () => {
    try {
      // Mock progress data for demo
      const mockProgressData = {
        academics: [
          { date: '2024-01-01', value: 85 },
          { date: '2024-01-02', value: 87 },
          { date: '2024-01-03', value: 89 },
          { date: '2024-01-04', value: 92 },
          { date: '2024-01-05', value: 90 }
        ],
        health: [
          { date: '2024-01-01', value: 78 },
          { date: '2024-01-02', value: 82 },
          { date: '2024-01-03', value: 85 },
          { date: '2024-01-04', value: 88 },
          { date: '2024-01-05', value: 86 }
        ],
        goals: [
          { name: 'Complete Math Homework', completed: true },
          { name: 'Read 30 minutes', completed: true },
          { name: 'Exercise for 20 minutes', completed: false },
          { name: 'Practice Piano', completed: true }
        ],
        emotional: [
          { date: '2024-01-01', mood: 'happy', energy: 85 },
          { date: '2024-01-02', mood: 'neutral', energy: 75 },
          { date: '2024-01-03', mood: 'excited', energy: 95 },
          { date: '2024-01-04', mood: 'calm', energy: 80 },
          { date: '2024-01-05', mood: 'happy', energy: 90 }
        ]
      }
      setProgressData(mockProgressData)
    } catch (error) {
      console.error('Failed to fetch progress data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (category, data) => {
    try {
      await axios.post(`/api/student/progress/${category}`, data)
      await fetchProgressData() // Refresh data
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }

  const earnBadge = async (badgeType) => {
    try {
      const response = await axios.post('/api/student/badges', { badgeType })
      setBadges(prev => [...prev, response.data])
    } catch (error) {
      console.error('Failed to earn badge:', error)
    }
  }

  const value = {
    studentData,
    badges,
    progressData,
    loading,
    updateProgress,
    earnBadge,
    refreshData: () => {
      fetchStudentData()
      fetchBadges()
      fetchProgressData()
    }
  }

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  )
}
