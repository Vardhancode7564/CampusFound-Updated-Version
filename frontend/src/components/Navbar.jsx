import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Menu, X, PlusCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 supports-[backdrop-filter]:bg-white/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors"
              >
                 <span className="text-white font-bold text-lg">C</span>
              </motion.div>
              <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">
                CampusFound
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <SignedIn>
                <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                Browse Items
                </Link>
                <Link to="/my-posts" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                  My Posts
                </Link>
                <Link to="/report">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary flex items-center gap-2 shadow-primary-500/20 shadow-md transform scale-90"
                    >
                        <PlusCircle size={16} />
                        <span>Post</span>
                    </motion.button>
                </Link>
                <Link to="/profile" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                  Profile
                </Link>
                <div className="ml-2">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </SignedIn>
            <SignedOut>
                <div className="flex items-center space-x-3">
                    <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600">
                    Log in
                    </Link>
                    <Link to="/register" className="btn-primary text-sm px-4 py-2">
                    Sign up
                    </Link>
                </div>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-primary-600 focus:outline-none p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <SignedIn>
                <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
                >
                Browse Items
                </Link>
                <Link 
                to="/report" 
                className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 bg-primary-50"
                onClick={() => setIsMenuOpen(false)}
                >
                Post an Item
                </Link>
                <Link 
                to="/my-posts" 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
                >
                My Posts
                </Link>
                <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
                >
                My Profile
                </Link>
            </SignedIn>

            <SignedOut>
                <div className="mt-4 flex flex-col gap-2">
                    <Link 
                        to="/login"
                        className="block w-full text-center px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Log in
                    </Link>
                    <Link 
                        to="/register"
                        className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Sign up
                    </Link>
                </div>
            </SignedOut>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
