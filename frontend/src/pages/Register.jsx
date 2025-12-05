import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const Register = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Visuals */}
      <div className="hidden md:block relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
        
        {/* Animated Shapes */}
        <motion.div 
            animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div 
            animate={{ 
                y: [0, 30, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Community</h2>
            <p className="text-lg text-slate-400 max-w-md">
                Create an account to start reporting lost items and helping others found theirs.
            </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-center p-8 bg-slate-50"
      >
        <div className="w-full max-w-md">
           <SignUp 
             routing="path"
             path="/register"
             appearance={{
               elements: {
                 rootBox: "mx-auto w-full",
                 card: "shadow-none border border-slate-200 bg-white rounded-xl w-full",
                 headerTitle: "text-2xl font-bold text-slate-900",
                 headerSubtitle: "text-slate-500",
                 formButtonPrimary: "bg-primary-600 hover:bg-primary-700 text-sm normal-case",
                 formFieldInput: "rounded-lg border-slate-300 focus:ring-primary-500 focus:border-primary-500",
                 footerActionLink: "text-primary-600 hover:text-primary-700"
               }
             }}
             signInUrl="/login"
             redirectUrl="/dashboard"
           />
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
