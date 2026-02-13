import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ItemCard from '../components/ItemCard'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../utils/api'
import { motion, AnimatePresence } from 'framer-motion'

const Dashboard = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    status: 'active'
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/items')
      // Safely handle different response structures
      const itemsList = data.items || data.data || []
      setItems(Array.isArray(itemsList) ? itemsList : [])
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = (item.title?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
                         (item.description?.toLowerCase() || '').includes(filters.search.toLowerCase())
    
    // Case insensitive comparison for type
    const matchesType = filters.type === 'all' || 
                       (item.type?.toLowerCase() === filters.type.toLowerCase())
    
    // Case insensitive comparison for category
    const matchesCategory = filters.category === 'all' || 
                           (item.category?.toLowerCase() === filters.category.toLowerCase())
    
    // Only show active items
    const matchesStatus = item.status === 'active' 
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <div>
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Browse Items</h1>
             <p className="text-slate-500 mt-1">Found something? Lost something? Check here.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-slate-200 ring-2 ring-slate-300' : ''}`}
            >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <AnimatePresence>
            <motion.div 
               layout
               className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8`}
               initial={false}
               animate={{ 
                   height: 'auto',
                   opacity: 1,
                   marginBottom: 32 // mb-8
               }}
               transition={{ duration: 0.3 }}
            >
               <div className={`p-4 transition-all duration-300 ${showFilters ? 'block' : 'hidden md:block'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="col-span-2 relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                          <input
                            type="text"
                            placeholder="Search by keyword..."
                            className="input-field pl-10"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                          />
                      </div>
                      <div>
                          <select 
                            className="input-field"
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                          >
                              <option value="all">All Types</option>
                              <option value="lost">Lost</option>
                              <option value="found">Found</option>
                          </select>
                      </div>
                       <div>
                          <select 
                            className="input-field"
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                          >
                              <option value="all">All Categories</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Books">Books</option>
                              <option value="Clothing">Clothing</option>
                              <option value="Documents">Documents</option>
                              <option value="Others">Others</option>
                          </select>
                      </div>
                   </div>
               </div>
            </motion.div>
        </AnimatePresence>

        {/* Grid Content */}
        {loading ? (
           <div className="flex justify-center items-center h-64">
             <LoadingSpinner />
           </div>
        ) : filteredItems.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map(item => (
              <ItemCard key={item._id} item={item} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300"
          >
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No items found</h3>
            <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
                onClick={() => setFilters({ search: '', type: 'all', category: 'all', status: 'active' })}
                className="btn-outline mt-4"
            >
                Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
