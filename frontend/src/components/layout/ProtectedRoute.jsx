// src/components/layout/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        // Show a full-page loader while the initial auth check is running
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    
    // If the initial load is finished AND there is no user, redirect to login.
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;