// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    

    // --- STABILIZED FUNCTIONS using useCallback ---

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login', { replace: true });
    }, [navigate]);

    const loginWithToken = useCallback((token) => {
        console.log('[AuthContext] loginWithToken function started.');
        localStorage.setItem('token', token);
        try {
            const userData = JSON.parse(atob(token.split('.')[1]));
            setUser({ _id: userData.id, role: userData.role });
            console.log('[AuthContext] User state updated from Google token.');
            
            // Role-based navigation
            if (userData.role === 'teacher') {
                navigate('/teacher', { replace: true });
            } else if (userData.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        } catch (e) {
            console.error('[AuthContext] Failed to parse Google token. Logging out.', e);
            logout();
        }
    }, [navigate, logout]);

    const initializeAuth = useCallback(() => {
        console.log('[AuthContext] Initializing Authentication...');
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = JSON.parse(atob(token.split('.')[1]));
                setUser({ _id: userData.id, role: userData.role });
            } catch (e) {
                console.error('[AuthContext] Invalid token found during init. Clearing...');
                logout(); // Use the stable logout function
            }
        }
        setLoading(false);
    }, [logout]); // Add logout to the dependency array

    // Run the initialization function only once when the provider mounts
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);


    /*const login = useCallback(async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
        navigate('/dashboard', { replace: true });
    }, [navigate]);*/

    









    // Inside src/context/AuthContext.jsx

    // --- FIND AND REPLACE THIS FUNCTION ---
   // Relevant part from AuthContext.jsx
//    const login = useCallback(async (email, password, role) => {
//     // This object now includes the role to match the backend
//     const loginData = { email, password, role };
  
//     const { data } = await api.post('/auth/login', loginData);
//     localStorage.setItem('token', data.token);
//     setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
    
//     // Redirect based on user role
//     if (data.role === 'teacher') {
//       navigate('/teacher', { replace: true });
//     } else if (data.role === 'admin') {
//       navigate('/admin/dashboard', { replace: true });
//     } else {
//       navigate('/dashboard', { replace: true });
//     }
//   }, [navigate]);

// Inside your AuthContext component
// Replace the current login function with this:
const login = useCallback(async (email, password, role) => {
    try {
      // Use your existing api service instead of axios
      const { data } = await api.post('/auth/login', { 
        email, 
        password, 
        role 
      });
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || data));
      
      // Set user in context (use the user data from response)
      const userData = data.user || { _id: data._id, name: data.name, email: data.email, role: data.role };
      setUser(userData);
      
      // Navigate based on user role (navigate is already available in this context)
      switch(userData.role) {
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
      
      // Return user data for the LoginPage to use if needed
      return userData;
      
    } catch (error) {
      throw error;
    }
  }, [navigate]); // Add navigate as dependency
    // --- END OF REPLACEMENT ---

    // src/context/AuthContext.jsx
// ... inside the AuthProvider component
/*
    const signup = useCallback(async (name, email, password, role, schoolId) => {
        // The API call now includes the role and schoolId
        const { data } = await api.post('/auth/register', { name, email, password, role, schoolId });
        localStorage.setItem('token', data.token);
        // The user object returned from the backend already has the role
        setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
        navigate('/dashboard', { replace: true });
    }, [navigate]);
    */

// ... rest of the file

// Inside src/context/AuthContext.jsx

    // --- FIND AND REPLACE THIS FUNCTION ---
    // Replace your current signup function with this:
const signup = useCallback(async (name, email, password, role, schoolId) => {
    // This object now includes the role and schoolId to match the backend
    const signupData = { name, email, password, role, schoolId };
    
    const { data } = await api.post('/auth/register', signupData);
    localStorage.setItem('token', data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
    
    // Redirect based on user role
    if (data.role === 'teacher') {
        navigate('/teacher', { replace: true });
    } else if (data.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
    } else {
        navigate('/dashboard', { replace: true });
    }
}, [navigate]);
    // --- END OF REPLACEMENT ---





/*
    const signup = useCallback(async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
        navigate('/dashboard', { replace: true });
    }, [navigate]);
*/
    // --- CONTEXT VALUE ---
    const value = { user, loading, login, signup, logout, loginWithToken };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);