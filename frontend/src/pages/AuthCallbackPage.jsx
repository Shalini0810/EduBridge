// src/pages/AuthCallbackPage.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthCallbackPage() {
    const [searchParams] = useSearchParams();
    const { loginWithToken } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            loginWithToken(token);
        }
        // No navigate() call here. The context will handle it.
    }, [searchParams, loginWithToken]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="text-center">
                <span className="loading loading-dots loading-lg"></span>
                <p className="text-xl mt-4">Please wait, finalizing session...</p>
            </div>
        </div>
    );
}