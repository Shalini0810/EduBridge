// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const TeacherRoute = () => {
//     const { user, loading } = useAuth();
    
//     // If still loading authentication state, show nothing or a loading spinner
//     if (loading) {
//         return <div>Loading...</div>;
//     }
    
//     // If not authenticated, redirect to login
//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }
    
//     // If authenticated but not a teacher, redirect to appropriate dashboard
//     if (user.role !== 'teacher') {
//         if (user.role === 'admin') {
//             return <Navigate to="/admin/dashboard" replace />;
//         } else {
//             return <Navigate to="/dashboard" replace />;
//         }
//     }
    
//     // If a teacher, allow access to teacher routes
//     return <Outlet />;
// };

// export default TeacherRoute;


// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   Home, Users, BookOpen, ClipboardCheck, Settings, 
//   LogOut, Menu, X, ChevronDown, Bell, Sun, Moon
// } from 'lucide-react';

// const TeacherRoute = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   const navItems = [
//     { name: 'Dashboard', icon: <Home size={20} />, path: '/teacher' },
//     { name: 'Students', icon: <Users size={20} />, path: '/teacher/students' },
//     { name: 'Classes', icon: <BookOpen size={20} />, path: '/teacher/classes' },
//     { name: 'Assessments', icon: <ClipboardCheck size={20} />, path: '/teacher/assessments' },
//     { name: 'Settings', icon: <Settings size={20} />, path: '/teacher/settings' },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className={`${darkMode ? 'dark' : ''}`}>
//       <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 z-20 bg-black/50 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <aside className={`
//           fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-lg 
//           transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//         `}>
//           <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
//             <Link to="/teacher" className="flex items-center">
//               <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Diksha Teacher</span>
//             </Link>
//             <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
//               <X size={24} />
//             </button>
//           </div>

//           <div className="px-4 py-6">
//             <nav className="space-y-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`
//                     flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-md hover:bg-blue-50 
//                     dark:hover:bg-gray-700 transition-colors
//                     ${location.pathname === item.path ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : ''}
//                   `}
//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Main content */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Header */}
//           <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 shadow z-10">
//             <div className="flex items-center">
//               <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
//                 <Menu size={24} />
//               </button>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button onClick={toggleDarkMode} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//               </button>
              
//               <button className="relative p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//                 <Bell size={20} />
//                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               <div className="relative">
//                 <button 
//                   onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                   className="flex items-center space-x-2"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                     {user?.name?.charAt(0) || 'T'}
//                   </div>
//                   <span className="hidden md:block text-sm">{user?.name || 'Teacher'}</span>
//                   <ChevronDown size={16} />
//                 </button>

//                 {profileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20 border dark:border-gray-700">
//                     <Link to="/teacher/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                       Profile
//                     </Link>
//                     <button 
//                       onClick={handleLogout}
//                       className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     >
//                       <LogOut size={16} className="mr-2" />
//                       Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </header>

//           {/* Main content */}
//           <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//             {children}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherRoute;

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, Users, BookOpen, ClipboardCheck, Settings, 
  LogOut, Menu, X, ChevronDown, Bell, Sun, Moon
} from 'lucide-react';

const TeacherLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/teacher' },
    { name: 'Students', icon: <Users size={20} />, path: '/teacher/students' },
    { name: 'Classes', icon: <BookOpen size={20} />, path: '/teacher/classes' },
    { name: 'Assessments', icon: <ClipboardCheck size={20} />, path: '/teacher/assessments' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/teacher/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-lg 
          transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
            <Link to="/teacher" className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Diksha Teacher</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <div className="px-4 py-6">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-md hover:bg-blue-50 
                    dark:hover:bg-gray-700 transition-colors
                    ${location.pathname === item.path ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : ''}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 shadow z-10">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu size={24} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button className="relative p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    {user?.name?.charAt(0) || 'T'}
                  </div>
                  <span className="hidden md:block text-sm">{user?.name || 'Teacher'}</span>
                  <ChevronDown size={16} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20 border dark:border-gray-700">
                    <Link to="/teacher/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;