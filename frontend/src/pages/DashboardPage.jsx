// src/pages/DashboardPage.jsx
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
            {user && (
                <div className="mt-4">
                    <p>User ID: {user._id}</p>
                    <p>Role: {user.role}</p>
                    <button
                        onClick={logout}
                        className="mt-6 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            )}
            {user?.role === 'admin' && (
                 <div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded">
                    <h2 className="text-xl font-semibold">Admin Panel</h2>
                    <p>You have access to admin-only features.</p>
                </div>
            )}
        </div>
    );
}