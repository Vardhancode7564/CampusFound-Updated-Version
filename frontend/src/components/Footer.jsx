import { Link } from 'react-router-dom'
import { Heart, Github, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
               <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                 <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CampusFound</span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Helping students reconnect with their lost belongings through a unified, secure platform.
            </p>
          </div>
          
          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/dashboard" className="text-sm hover:text-primary-400 transition-colors">Browse Items</Link></li>
              <li><Link to="/report" className="text-sm hover:text-primary-400 transition-colors">Report Lost</Link></li>
              <li><Link to="/report" className="text-sm hover:text-primary-400 transition-colors">Report Found</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary-400 transition-colors">Help Center</Link></li>
              <li><Link to="/admin/login" className="text-sm hover:text-primary-400 transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
               {/* Using '#' as placeholders for legal pages that don't exist yet */}
              <li><Link to="#" className="text-sm hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary-400 transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-full hover:bg-primary-600"><Github size={18} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-full hover:bg-primary-600"><Twitter size={18} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-full hover:bg-primary-600"><Linkedin size={18} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} CampusFound. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-slate-500 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>for Students</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
