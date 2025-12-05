import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ItemDetails from './pages/ItemDetails';
import ReportItem from './pages/ReportItem';
import Profile from './pages/Profile';
import MyPosts from './pages/MyPosts';
import MyClaims from './pages/MyClaims';
import AdminDashboard from './pages/AdminDashboard';
import ItemForm from './pages/ItemForm';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  if (!clerkPubKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
         <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-red-200">
            <h2 className="text-xl font-bold text-red-600 mb-2">Configuration Error</h2>
            <p className="text-slate-600">
               Missing Clerk Publishable Key. Please add <code className="bg-red-100 px-1 py-0.5 rounded text-red-800">VITE_CLERK_PUBLISHABLE_KEY</code> to your frontend <code className="bg-slate-100 px-1 py-0.5 rounded">.env</code> file.
            </p>
         </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50">
            <Toaster position="top-right" />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/items/:id" element={<ItemDetails />} />
                
                {/* Auth Routes */}
                <Route path="/login/*" element={<Login />} />
                <Route path="/register/*" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <>
                    <SignedIn>
                      <Dashboard />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                } />
                
                <Route path="/report" element={
                  <>
                    <SignedIn>
                      <ReportItem />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                } />
                
                <Route path="/my-posts" element={
                   <>
                    <SignedIn>
                      <MyPosts />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                } />
                
                <Route path="/profile" element={
                   <>
                    <SignedIn>
                      <Profile />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                } />
                <Route path="/admin/items/new" element={
                  <AdminProtectedRoute>
                    <ItemForm />
                  </AdminProtectedRoute>
                } />
                <Route path="/admin/items/edit/:id" element={
                  <AdminProtectedRoute>
                    <ItemForm />
                  </AdminProtectedRoute>
                } />

                {/* Catch all */}
                <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;
