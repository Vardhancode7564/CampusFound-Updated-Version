import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const AdminProtectedRoute = ({ children }) => {
  const { loading, isUserAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-slate-600 mb-8">You do not have administrative privileges.</p>
        <Link to="/dashboard" className="btn-primary px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;

