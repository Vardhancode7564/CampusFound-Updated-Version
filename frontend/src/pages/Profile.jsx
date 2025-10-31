import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, CreditCard, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:5000/api/user/items', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setItems(data.items || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserItems();
  }, []);
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Please login to view your profile</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600 mb-8">Manage your account and view your reported items</p>

        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 w-24 h-24 rounded-full flex items-center justify-center">
            <User className="text-white" size={48} />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
          
          {/* Name */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-indigo-100 p-2 rounded-full">
              <User className="text-indigo-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Mail className="text-indigo-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
            </div>
          </div>

          {/* Student ID */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full">
              <CreditCard className="text-purple-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Student ID</p>
              <p className="text-sm font-medium text-gray-900">{user.studentId || 'Not provided'}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <Phone className="text-green-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Phone Number</p>
              <p className="text-sm font-medium text-gray-900">{user.phone || 'Not provided'}</p>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="text-sm font-medium text-gray-900">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '2024'}
              </p>
            </div>
          </div>

          {/* My Statistics */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-indigo-600">{items.length}</div>
                <div className="text-sm text-gray-600 mt-1">Total Reports</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-600">{items.filter(i => i.type === 'lost').length}</div>
                <div className="text-sm text-gray-600 mt-1">Lost Items</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600">{items.filter(i => i.type === 'found').length}</div>
                <div className="text-sm text-gray-600 mt-1">Found Items</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600">{items.filter(i => i.status === 'active').length}</div>
                <div className="text-sm text-gray-600 mt-1">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
