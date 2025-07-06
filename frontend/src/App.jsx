import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StudentProvider } from './context/StudentContext';
import { motion } from 'framer-motion';

// Student components
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import ProfilePage from './pages/student/ProfilePage';
import ProgressTracker from './pages/student/ProgressTracker';
import Schedule from './pages/student/Schedule';
import Navbar from './components/Navbar';

// Main app components
import NavbarMain from './components/NavbarMain';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import TeacherRouteProtection from './components/TeacherRouteProtection';
import RequestResetPage from './pages/RequestResetPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Teacher dashboard imports
import TeacherDashboard from './Teacher/Dashboard';
import ClassDetails from './Teacher/ClassDetails';

import './App.css';

function AppContent() {
  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith('/teacher') || 
                        location.pathname.startsWith('/class/');
  const isStudentRoute = location.pathname.startsWith('/student') || 
                        location.pathname.startsWith('/admin') || 
                        location.pathname.startsWith('/superadmin');

  return (
    <div className={isStudentRoute ? "min-h-screen bg-gray-50" : "flex flex-col min-h-screen"}>
      {!isTeacherRoute && !isStudentRoute && <NavbarMain />}
      <main className={`${isStudentRoute ? 'pt-16' : isTeacherRoute ? 'pt-0' : 'flex-grow'}`}>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/request-reset" element={<RequestResetPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          
          {/* Student Routes */}
          <Route path="/student" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Navbar />
              <main className="pt-16">
                <StudentDashboard />
              </main>
            </motion.div>
          } />
          <Route path="/student/profile" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Navbar />
              <main className="pt-16">
                <ProfilePage />
              </main>
            </motion.div>
          } />
          <Route path="/student/progress" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Navbar />
              <main className="pt-16">
                <ProgressTracker />
              </main>
            </motion.div>
          } />
          <Route path="/student/schedule" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Navbar />
              <main className="pt-16">
                <Schedule />
              </main>
            </motion.div>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Navbar />
              <main className="pt-16">
                <AdminDashboard />
              </main>
            </motion.div>
          } />

          {/* Super Admin Routes */}
          <Route path="/superadmin" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Navbar />
              <main className="pt-16">
                <SuperAdminDashboard />
              </main>
            </motion.div>
          } />
          
          {/* Teacher routes */}
          <Route element={<TeacherRouteProtection />}>
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/class/:id" element={<ClassDetails />} />
          </Route>
        </Routes>
      </main>
      {!isTeacherRoute && !isStudentRoute && <Footer />}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
        <AppContent />
    </StudentProvider>
  );
}

export default App;