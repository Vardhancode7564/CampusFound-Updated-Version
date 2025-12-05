import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, CreditCard, Calendar, Camera, Trash2 } from 'lucide-react';
import api from '../utils/api';

const Profile = () => {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserItems();
    }
  }, [isLoaded, user]);

  const fetchUserItems = async () => {
    try {
      const response = await api.get('/user/items');
      if (response.data.success) {
        setItems(response.data.items || []);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await api.delete(`/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
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
          <div className="relative group cursor-pointer" onClick={() => openUserProfile()}>
             <img 
               src={user.imageUrl} 
               alt={user.fullName} 
               className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 group-hover:opacity-75 transition-opacity"
             />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Camera className="text-white drop-shadow-lg" size={24} />
             </div>
             <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-slate-200">
               <Camera size={14} className="text-slate-600" />
             </div>
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
              <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Mail className="text-indigo-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="text-sm font-medium text-gray-900">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Phone className="text-indigo-600" size={20} />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">
                  {user.primaryPhoneNumber?.phoneNumber || 'Not provided'}
                </p>
              </div>
              {!user.primaryPhoneNumber && (
                 <button 
                   onClick={() => openUserProfile()}
                   className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
                 >
                   Add Phone
                 </button>
              )}
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

          {/* My Reports List */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Reports</h2>
            {items.length > 0 ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      {item.imageURL ? (
                        <img src={item.imageURL} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">No Img</div>
                      )}
                      <div>
                        <Link to={`/items/${item._id}`} className="font-medium text-gray-900 hover:text-indigo-600 block">
                          {item.title}
                        </Link>
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {item.type.toUpperCase()}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete Report"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No reports submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
