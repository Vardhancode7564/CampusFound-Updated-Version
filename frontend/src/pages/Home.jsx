import { Link } from 'react-router-dom'
import { Search, Shield, Clock, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Home = () => {
    
  const fadeIn = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
  }

  const staggerContainer = {
      animate: {
          transition: {
              staggerChildren: 0.2
          }
      }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary-400 opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-40">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1 
                variants={fadeIn}
                className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6"
            >
              Lost on Campus? <br/>
              <span className="text-primary-600">Let's Find It Together.</span>
            </motion.h1>
            
            <motion.p 
                variants={fadeIn}
                className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto"
            >
              The official lost and found platform for our university. Report lost items, browse found inventory, and reconnect with your belongings securely.
            </motion.p>
            
            <motion.div 
                variants={fadeIn}
                className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link to="/report" className="btn-primary flex items-center gap-2 group shadow-primary-500/25 shadow-lg">
                <Search size={20} />
                <span>I Lost Something</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18}/>
              </Link>
              <Link to="/dashboard" className="btn-outline">
                I Found Something
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
                variants={fadeIn}
                className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12 max-w-4xl mx-auto border-t border-slate-100 pt-8"
            >
                {[
                    { label: 'Items Recovered', value: '500+' },
                    { label: 'Active Users', value: '2k+' },
                    { label: 'Daily Reports', value: '50+' },
                    { label: 'Success Rate', value: '95%' }
                ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center">
                        <dt className="text-3xl font-bold text-slate-900">{stat.value}</dt>
                        <dd className="text-sm font-medium text-slate-500 mt-1">{stat.label}</dd>
                    </div>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How it works</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Simple, secure, and fast. we've streamlined the process of reporting and recovering items.
            </p>
          </div>
          
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto mt-16 max-w-7xl grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {[
              {
                icon: <Search className="h-8 w-8 text-primary-600" />,
                title: 'Report',
                desc: 'Lost something? Submit a report with details and image to alert the campus community.'
              },
              {
                icon: <Users className="h-8 w-8 text-primary-600" />,
                title: 'Match',
                desc: 'Our system helps match lost reports with found items inventory automatically.'
              },
              {
                icon: <Shield className="h-8 w-8 text-primary-600" />,
                title: 'Recover',
                desc: 'Verify ownership and arrange a secure meetup to get your belongings back.'
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeIn}
                className="card p-8 text-center hover:border-primary-200 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-4 text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Safety Section */}
      <div className="bg-slate-900 py-24 sm:py-32">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">Safety First</h2>
                    <p className="text-slate-300 text-lg mb-8">
                        We prioritize your safety during item exchanges. Follow our guidelines to ensure a secure experience.
                    </p>
                    <ul className="space-y-4">
                        {[
                            'Meet in public campus locations (Library, Student Center)',
                            'Verify item ownership before meeting',
                            'Bring a friend along for the exchange',
                            'Never share sensitive personal information'
                        ].map((tip, i) => (
                            <li key={i} className="flex items-center text-slate-300">
                                <Shield className="w-5 h-5 text-primary-400 mr-3" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl opacity-20 blur-2xl"></div>
                    <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700">
                        <div className="flex items-center mb-6">
                            <Clock className="w-6 h-6 text-primary-400 mr-3" />
                            <h3 className="text-xl font-bold text-white">Quick & Secure</h3>
                        </div>
                        <p className="text-slate-400">
                            "I lost my wallet last week and found it listed here within hours. The meetup was safe and easy at the student center!"
                        </p>
                        <div className="mt-4 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">HV</div>
                            <span className="ml-3 text-sm text-slate-400">Harsha Vardhan, Computer Science</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Home
