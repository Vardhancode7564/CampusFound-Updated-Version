import { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const { signOut, getToken } = useClerkAuth();
  
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      // 1. Check for Admin Token (Bypass Clerk)
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
          try {
              const response = await api.get('/admin/me', {
                  headers: { Authorization: `Bearer ${adminToken}` }
              });
              if (response.data.success) {
                  setMongoUser({ ...response.data.admin, role: 'admin' });
                  setLoading(false);
                  return; 
              }
          } catch (err) {
              console.error("Admin token invalid:", err);
              localStorage.removeItem('adminToken');
          }
      }

      // 2. Clerk Sync (Existing Logic)
      if (!isClerkLoaded) return;

      if (clerkUser) {
        // Domain Restriction Check
        const email = clerkUser.primaryEmailAddress?.emailAddress;
        if (email && !email.endsWith('@rguktsklm.ac.in')) {
          await signOut();
          alert('Access Denied: Only @rguktsklm.ac.in emails are allowed.');
          return;
        }
        try {
          // Explicitly get token to ensure reliability during initial sync
          const token = await getToken();
          const response = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMongoUser(response.data.user);
        } catch (error) {
          console.error("Failed to sync user with backend:", error);
          // If sync fails, we might want to sign them out or show error
          // For now, just leave mongoUser null
        }
      } else {
        // Only clear if we didn't find an admin user above (though we returned early if we did)
        if (!adminToken) setMongoUser(null);
      }
      setLoading(false);
    };

    syncUser();
  }, [isClerkLoaded, clerkUser, getToken]);

  const loginAdmin = async (credentials) => {
    try {
        const response = await api.post('/admin/login', credentials);
        if (response.data.success) {
            localStorage.setItem('adminToken', response.data.token);
            setMongoUser({ ...response.data.admin, role: 'admin' });
            return { success: true };
        }
    } catch (error) {
        return { 
            success: false, 
            message: error.response?.data?.message || 'Login failed' 
        };
    }
  };

  const value = {
    user: mongoUser,         // Database user object (Has role, _id, etc.)
    clerkUser,               // Clerk user object (Has imageUrl, emailAddresses, etc.)
    loading: loading,        // Adjusted logic
    isAdmin: mongoUser?.role === 'admin',
    logout: () => {
        localStorage.removeItem('adminToken');
        signOut();
        setMongoUser(null);
    },
    loginAdmin, // Added function
    // Legacy support (optional, can be removed if not used)
    isUserAuthenticated: !!mongoUser,
    isAdminAuthenticated: mongoUser?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

