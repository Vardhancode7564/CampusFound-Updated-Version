import { Link } from 'react-router-dom'
import { MapPin, Calendar, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

const ItemCard = ({ item }) => {
  const statusColors = {
    lost: 'bg-red-100 text-red-700 border-red-200',
    found: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    recovered: 'bg-slate-100 text-slate-700 border-slate-200'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link to={`/items/${item._id}`} className="block group h-full">
        <div className="card h-full flex flex-col overflow-hidden hover:shadow-lg hover:shadow-primary-500/10 transition-shadow duration-300">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={item.imageURL || item.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 z-10">
              <span className={`badge uppercase tracking-wider text-[10px] px-2.5 py-1 ${statusColors[item.status] || 'bg-slate-100 text-slate-700'}`}>
                {item.type}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-100/50">
                {item.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center">
                <Calendar size={12} className="mr-1" />
                {format(new Date(item.date), 'MMM d, yyyy')}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
              {item.description}
            </p>

            <div className="flex items-center text-xs text-slate-500 border-t border-slate-100 pt-3 mt-auto">
              <MapPin size={14} className="mr-1.5 text-slate-400" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ItemCard
