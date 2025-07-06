import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, 
  BarChart3, 
  Calendar, 
  Users, 
  Settings,
  Menu,
  X,
  Home,
  Award,
  BookOpen,
  Shield
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const getNavigationItems = () => {
    // Get navigation based on current path
    if (location.pathname.startsWith('/student')) {
      return [
        { path: '/student', icon: Home, label: 'Dashboard' },
        { path: '/student/profile', icon: User, label: 'Profile' },
        { path: '/student/progress', icon: BarChart3, label: 'Progress' },
        { path: '/student/schedule', icon: Calendar, label: 'Schedule' },
      ]
    } else if (location.pathname.startsWith('/admin')) {
      return [
        { path: '/admin', icon: Home, label: 'Dashboard' },
        { path: '/admin/users', icon: Users, label: 'Users' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
      ]
    } else if (location.pathname.startsWith('/superadmin')) {
      return [
        { path: '/superadmin', icon: Shield, label: 'Super Admin' },
        { path: '/admin', icon: Home, label: 'Admin Dashboard' },
        { path: '/student', icon: User, label: 'Student View' },
      ]
    }
    return []
  }

  const navigationItems = getNavigationItems()

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/student" className="flex items-center space-x-2">
              <motion.div
                className="bg-primary-600 p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gray-900">EduTracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {/* Quick Navigation */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/student" 
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Student
              </Link>
              <Link 
                to="/admin" 
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
              >
                Admin
              </Link>
              <Link 
                to="/superadmin" 
                className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              >
                Super Admin
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            <div className="px-3 py-2 space-y-2">
              <Link 
                to="/student" 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Student View
              </Link>
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
              >
                Admin View
              </Link>
              <Link 
                to="/superadmin" 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              >
                Super Admin View
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
