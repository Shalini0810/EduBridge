import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/api';

export default function RequestResetPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/request-reset', { email });
      setSuccess(true);
      toast.success("Reset link sent to your email");
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send reset link';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-orange-50 to-blue-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Reset Password</h1>
          <p className="mt-2 text-gray-600">Enter your email to receive a password reset link</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {success ? (
          <div className="text-center py-4">
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">Reset link sent!</p>
              <p className="mt-1">Please check your inbox and follow the instructions.</p>
            </div>
            
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div>
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
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-700 hover:text-blue-500 inline-flex items-center font-medium">
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}