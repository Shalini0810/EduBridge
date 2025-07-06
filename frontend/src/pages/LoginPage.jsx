// // src/pages/LoginPage.jsx
// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Link, useSearchParams } from 'react-router-dom';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('student'); // New state for role
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const { login } = useAuth();
//     const [searchParams] = useSearchParams();

//     // Check for any error messages passed in the URL (e.g., from Google auth failure)
//     useState(() => {
//         const urlError = searchParams.get('error');
//         if (urlError) {
//             setError(`Login failed: ${urlError.replace(/_/g, ' ')}`);
//         }
//     }, [searchParams]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);
//         try {
//             // Pass the role to the login function
//             await login(email, password, role);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to log in.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="hero min-h-screen bg-base-200">
//             <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
//                 <form onSubmit={handleSubmit} className="card-body">
//                     <h2 className="card-title mx-auto">Welcome Back!</h2>
//                     {error && <div role="alert" className="alert alert-error text-sm"><span>{error}</span></div>}
                    
//                     {/* --- NEW ROLE SELECTOR --- */}
//                     <div className="form-control">
//                         <label className="label"><span className="label-text">Login as a...</span></label>
//                         <select className="select select-bordered" value={role} onChange={(e) => setRole(e.target.value)}>
//                             <option value="student">Student</option>
//                             <option value="teacher">Teacher</option>
//                             <option value="admin">Admin</option>
//                         </select>
//                     </div>

//                     <div className="form-control">
//                         <label className="label"><span className="label-text">Email</span></label>
//                         <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="input input-bordered" />
//                     </div>
                    
//                     <div className="form-control">
//                         <label className="label"><span className="label-text">Password</span></label>
//                         <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required className="input input-bordered" />
//                     </div>
                    
//                     <div className="form-control mt-6">
//                         <button type="submit" className="btn btn-primary" disabled={loading}>
//                             {loading ? <span className="loading loading-spinner"></span> : 'Login'}
//                         </button>
//                     </div>
                    
//                     <div className="divider">OR</div>
//                     <a href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`} className="btn btn-outline w-full">
//                         {/* Google SVG Icon */}
//                         Continue with Google
//                     </a>
//                     <Link to="/request-reset" className="label-text-alt link link-hover self-end">Forgot password?</Link>

//                     <p className="text-sm text-center mt-4">
//                         Don't have an account? <Link to="/signup" className="link link-primary">Sign Up</Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// }
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useSearchParams } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check for any error messages passed in the URL (e.g., from Google auth failure)
  useEffect(() => {
    const urlError = searchParams.get('error');
    if (urlError) {
      setError(`Login failed: ${urlError.replace(/_/g, ' ')}`);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Call login and get user data
      const userData = await login(email, password, role);
      
      toast.success('Login successful!');
      
      // Redirect based on role
      switch(userData.role || role) {
        case 'student':
          navigate('/student');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'superadmin':
          navigate('/superadmin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        default:
          navigate('/dashboard');
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to log in.';
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
          <h1 className="text-3xl font-bold text-blue-800">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to continue to your account</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Email address"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
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
                placeholder="Password"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">I am a</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher/Volunteer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div>
              <Link to="/request-reset" className="text-sm text-blue-700 hover:text-blue-500">
                Forgot password?
              </Link>
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
              ) : (
                <FaSignInAlt className="mr-2" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6">
            <a
              href={`${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/google`}
              className="w-full inline-flex justify-center py-3 px-6 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300"
            >
              <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
              Sign in with Google
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-600 hover:text-orange-500 font-medium">
              Register
            </Link>
          </p>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            By continuing, you agree to Diksha Foundation's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
}