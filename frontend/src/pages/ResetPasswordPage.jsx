import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaLock, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/api';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        await api.get(`/auth/validate-reset-token/${token}`);
        setTokenValid(true);
      } catch (err) {
        setError('This password reset link is invalid or has expired');
        setTokenValid(false);
        toast.error('This password reset link is invalid or has expired');
      } finally {
        setValidatingToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      toast.success('Password reset successful!');
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (validatingToken) {
    return (
      <section className="bg-gradient-to-r from-orange-50 to-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Validating your reset link...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-orange-50 to-blue-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Reset Your Password</h1>
          <p className="mt-2 text-gray-600">Create a new password for your account</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {!tokenValid ? (
          <div className="text-center py-4">
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">Invalid or Expired Link</p>
              <p className="mt-1">This password reset link is no longer valid.</p>
            </div>
            
            <Link
              to="/request-reset"
              className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Request New Reset Link
            </Link>
          </div>
        ) : success ? (
          <div className="text-center py-4">
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-green-800 mb-2">Password Reset Successful!</h3>
              <p className="text-green-700">
                Your password has been changed successfully. You will be redirected to the login page shortly.
              </p>
            </div>
            
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="bg-blue-50 p-4 rounded-lg flex items-start mb-4">
              <div className="flex-shrink-0">
                <FaShieldAlt className="h-5 w-5 text-blue-700" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Create a strong password</h3>
                <p className="text-xs text-blue-700 mt-1">
                  For better security, use at least 8 characters with a mix of letters, numbers, and symbols.
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Create a new password"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}