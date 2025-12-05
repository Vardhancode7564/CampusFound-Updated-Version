
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Tag, Share2, Flag, ArrowLeft, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import api from '../utils/api'
import { useUser } from '@clerk/clerk-react'
import LoadingSpinner from '../components/LoadingSpinner'

const ItemDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchItem()
  }, [id])

  const fetchItem = async () => {
    try {
      const { data } = await api.get(`/items/${id}`)
      setItem(data.item)
    } catch (error) {
      toast.error('Failed to load item details')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = async () => {
    if (!user) {
      toast.error('Please login to claim items')
      navigate('/login')
      return
    }

    setSubmitting(true)
    try {
       // In a real app we'd open a modal for message input, for now prompt is fine
       const defaultMsg = item.type === 'lost' 
         ? `I found your lost item (${item.title}). Please contact me to arrange a meetup.` 
         : `I believe this found item (${item.title}) belongs to me. Please contact me to verify.`;

       const message = prompt("Enter a message to the poster:", defaultMsg);
       
       if (message === null) { // User cancelled
         setSubmitting(false)
         return
       }

       if (!message.trim()) {
          toast.error("Message cannot be empty")
          setSubmitting(false)
          return
       }

       const response = await api.post('/claims/send-email', {
         itemId: item._id,
         message
       });

       if (response.data.success) {
         toast.success('Email sent to the poster successfully!')
       }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to send email')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>
  if (!item) return null

  // Check ownership
  const isOwner = user && (
    (typeof item.postedBy === 'string' && item.postedBy === user.id) ||
    (item.postedBy?.clerkId === user.id)
  )

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
               <div className="aspect-video bg-slate-100 relative">
                  <img 
                    src={item.imageURL || item.image || 'https://via.placeholder.com/800x600?text=No+Image'} 
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 left-4">
                     <span className={`badge px-3 py-1 text-sm font-bold uppercase tracking-wide
                        ${item.type === 'lost' ? 'bg-red-500 text-white border-red-600' : 'bg-emerald-500 text-white border-emerald-600'}
                     `}>
                        {item.type}
                     </span>
                  </div>
               </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-slate-900">{item.title}</h1>
                <div className="flex gap-2">
                   <button 
                     onClick={() => {
                       navigator.clipboard.writeText(window.location.href);
                       toast.success('Link copied to clipboard!');
                     }}
                     className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors" 
                     title="Share"
                   >
                      <Share2 size={20} />
                   </button>
                   <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Report Content">
                      <Flag size={20} />
                   </button>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                 <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
                 <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {item.description}
                 </p>
              </div>

               <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="bg-white p-2 rounded-lg mr-4 border border-slate-100 shadow-sm">
                        <MapPin className="text-primary-600" size={24} />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Location</p>
                        <p className="text-slate-900 font-semibold">{item.location}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="bg-white p-2 rounded-lg mr-4 border border-slate-100 shadow-sm">
                        <Calendar className="text-primary-600" size={24} />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Date</p>
                        <p className="text-slate-900 font-semibold">{format(new Date(item.date), 'MMMM d, yyyy')}</p>
                     </div>
                  </div>

                   <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="bg-white p-2 rounded-lg mr-4 border border-slate-100 shadow-sm">
                        <Tag className="text-primary-600" size={24} />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Category</p>
                        <p className="text-slate-900 font-semibold">{item.category}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Action Center</h3>
                
                {item.status === 'active' ? (
                   <>
                     {isOwner ? (
                       <div className="space-y-4">
                          <div className="p-4 bg-primary-50 text-primary-900 rounded-xl">
                             <p className="font-medium">This is your post</p>
                             <p className="text-sm mt-1 text-primary-700">Manage it from your profile or 'My Posts' page.</p>
                          </div>
                          <button 
                             onClick={() => navigate('/my-posts')}
                             className="w-full btn-secondary mb-3"
                          >
                             Manage Post
                          </button>
                          
                          <button 
                             onClick={async () => {
                               if(!window.confirm("Are you sure you want to mark this item as claimed/received? This will close the post.")) return;
                               try {
                                 await api.put(`/items/${item._id}`, { status: 'claimed' });
                                 setItem(prev => ({ ...prev, status: 'claimed' }));
                                 toast.success("Item marked as received!");
                               } catch(err) {
                                 toast.error("Failed to update status");
                               }
                             }}
                             className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl transition-colors shadow-sm"
                          >
                             Mark as Received
                          </button>
                       </div>
                     ) : (
                       <div className="space-y-4">
                          <p className="text-slate-600 text-sm">
                             {item.type === 'lost' 
                               ? "Have you found this item? Reach out to the owner securely." 
                               : "Is this item yours? Submit a claim to verify ownership."}
                          </p>
                          
                          <button 
                             onClick={handleClaim}
                             disabled={submitting}
                             className="w-full btn-primary h-12 text-lg shadow-lg shadow-primary-500/20"
                          >
                             {submitting ? 'Processing...' : (
                                <span className="flex items-center justify-center">
                                   <MessageCircle className="mr-2" size={20} />
                                   {item.type === 'lost' ? 'I Found This' : 'Claim Item'}
                                </span>
                             )}
                          </button>
                          
                          <p className="text-xs text-center text-slate-400 mt-4">
                             Safety Tip: Always verify items in a safe, public location.
                          </p>
                       </div>
                     )}
                   </>
                ) : (
                   <div className="p-6 bg-slate-100 rounded-xl text-center">
                      <p className="text-slate-900 font-bold mb-2">Item {item.status}</p>
                      <p className="text-slate-500 text-sm">This item is no longer active.</p>
                   </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-slate-500">Posted by</span>
                      <span className="font-medium text-slate-900">{item.postedBy?.name || 'Campus Member'}</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Member since</span>
                      <span className="font-medium text-slate-900">{new Date().getFullYear()}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetails
