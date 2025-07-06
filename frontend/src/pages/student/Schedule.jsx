import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  BookOpen,
  Heart,
  Clipboard,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter
} from 'lucide-react'

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('week') // 'week' or 'month'

  // Sample events with color coding
  const events = [
    {
      id: 1,
      title: 'Mathematics',
      time: '09:00 AM - 10:00 AM',
      location: 'Room 101',
      teacher: 'Mr. Johnson',
      type: 'class',
      color: 'blue',
      date: new Date(2024, 0, 15)
    },
    {
      id: 2,
      title: 'Health Check-up',
      time: '02:00 PM - 02:30 PM',
      location: 'Health Center',
      teacher: 'Dr. Smith',
      type: 'health',
      color: 'red',
      date: new Date(2024, 0, 15)
    },
    {
      id: 3,
      title: 'Science Lab',
      time: '11:00 AM - 12:30 PM',
      location: 'Lab 202',
      teacher: 'Ms. Davis',
      type: 'class',
      color: 'green',
      date: new Date(2024, 0, 16)
    },
    {
      id: 4,
      title: 'Project Presentation',
      time: '03:00 PM - 04:00 PM',
      location: 'Auditorium',
      teacher: 'Mr. Wilson',
      type: 'presentation',
      color: 'purple',
      date: new Date(2024, 0, 17)
    }
  ]

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'class':
        return BookOpen
      case 'health':
        return Heart
      case 'presentation':
        return Clipboard
      default:
        return CalendarIcon
    }
  }

  const getEventTypeColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[color] || colors.blue
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction * 7))
    setCurrentDate(newDate)
  }

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDays.push(date)
    }
    return weekDays
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
              <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
              <p className="text-gray-600 mt-1">Manage your upcoming events and classes</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                    viewMode === 'week'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                    viewMode === 'month'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Month
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => viewMode === 'week' ? navigateWeek(-1) : navigateMonth(-1)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => viewMode === 'week' ? navigateWeek(1) : navigateMonth(1)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {viewMode === 'month' ? (
                <>
                  {/* Month View */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((day, index) => {
                      if (!day) {
                        return <div key={index} className="p-2" />
                      }
                      
                      const dayEvents = getEventsForDate(day)
                      const isToday = day.toDateString() === new Date().toDateString()
                      const isSelected = day.toDateString() === selectedDate.toDateString()
                      
                      return (
                        <motion.button
                          key={day.toDateString()}
                          onClick={() => setSelectedDate(day)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-2 text-sm min-h-[60px] border border-gray-100 hover:bg-gray-50 transition-colors relative ${
                            isToday ? 'bg-primary-50 border-primary-200' : ''
                          } ${
                            isSelected ? 'bg-primary-100 border-primary-300' : ''
                          }`}
                        >
                          <div className={`font-medium ${
                            isToday ? 'text-primary-600' : 'text-gray-900'
                          }`}>
                            {day.getDate()}
                          </div>
                          {dayEvents.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {dayEvents.slice(0, 2).map(event => (
                                <div
                                  key={event.id}
                                  className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.color)}`}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </>
              ) : (
                <>
                  {/* Week View */}
                  <div className="grid grid-cols-7 gap-4">
                    {getWeekDays().map(day => {
                      const dayEvents = getEventsForDate(day)
                      const isToday = day.toDateString() === new Date().toDateString()
                      
                      return (
                        <div key={day.toDateString()} className="space-y-2">
                          <div className={`text-center p-2 rounded-lg ${
                            isToday ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                            <div className="text-xs font-medium">
                              {day.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="text-lg font-bold">
                              {day.getDate()}
                            </div>
                          </div>
                          
                          <div className="space-y-2 min-h-[300px]">
                            {dayEvents.map(event => {
                              const Icon = getEventTypeIcon(event.type)
                              return (
                                <motion.div
                                  key={event.id}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  whileHover={{ scale: 1.02 }}
                                  className={`p-2 rounded-lg border cursor-pointer ${getEventTypeColor(event.color)}`}
                                >
                                  <div className="flex items-center space-x-1 mb-1">
                                    <Icon className="h-3 w-3" />
                                    <span className="text-xs font-medium truncate">
                                      {event.title}
                                    </span>
                                  </div>
                                  <div className="text-xs opacity-75">
                                    {event.time}
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Events</h3>
              
              <div className="space-y-3">
                {getEventsForDate(new Date()).map(event => {
                  const Icon = getEventTypeIcon(event.type)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-${event.color}-100`}>
                          <Icon className={`h-4 w-4 text-${event.color}-600`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {event.title}
                          </h4>
                          <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                            <User className="h-3 w-3" />
                            <span>{event.teacher}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Event Types Legend */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-blue-500" />
                  <span className="text-sm text-gray-700">Classes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-red-500" />
                  <span className="text-sm text-gray-700">Health Check-ups</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span className="text-sm text-gray-700">Lab Sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-purple-500" />
                  <span className="text-sm text-gray-700">Presentations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-orange-500" />
                  <span className="text-sm text-gray-700">Assignments</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
