import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeacherRouteProtection = () => {
    const { user, loading } = useAuth();
    
    // If still loading authentication state, show a loading spinner
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    
    // If not authenticated, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    // If authenticated but not a teacher, redirect to appropriate dashboard
    if (user.role !== 'teacher') {
        if (user.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            return <Navigate to="/dashboard" replace />;
        }
    }
    
    // If a teacher, allow access to teacher routes
    return <Outlet />;
};

export default TeacherRouteProtection;