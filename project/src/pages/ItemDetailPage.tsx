import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Tag, User, Mail, SearchX, HandHeart, Check, X, MessageSquare } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ImageCarousel from '@/components/ImageCarousel';

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, addClaim, currentUser } = useApp();

  const item = items.find((i) => i.id === id);

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimMessage, setClaimMessage] = useState('');
  const [claimSent, setClaimSent] = useState(false);

  if (!item) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-cream-200 flex items-center justify-center mb-4">
            <SearchX className="w-8 h-8 text-charcoal-300" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-charcoal-800">Item Not Found</h1>
          <p className="text-charcoal-400 mt-2">This item may have been removed or the link is incorrect.</p>
          <Link
            to="/browse"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal-800 text-cream-50 text-sm font-medium rounded-xl hover:bg-charcoal-700 transition-colors"
          >
            Browse All Items
          </Link>
        </div>
      </div>
    );
  }

  const isMyItem = currentUser?.id === item.reporterId;
  const isLost = item.type === 'lost';

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimMessage.trim()) return;
    addClaim(item.id, claimMessage);
    setClaimSent(true);
  };

  const statusStyles: Record<string, string> = {
    active: 'bg-accent-100 text-accent-700',
    claimed: 'bg-charcoal-100 text-charcoal-600',
    resolved: 'bg-green-100 text-green-700',
    expired: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-charcoal-400 hover:text-sand-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image carousel */}
          <div>
            <ImageCarousel images={item.images} alt={item.name} />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {item.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-charcoal-100">
                  <img src={img} alt={`${item.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs text-charcoal-400 mt-3 text-center">
              Swipe or use arrows to browse all photos
            </p>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                isLost ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'
              }`}>
                {isLost ? 'Lost' : 'Found'}
              </span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[item.status]}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal-800">{item.name}</h1>

            <p className="text-charcoal-500 mt-4 leading-relaxed">{item.description}</p>

            <div className="mt-6 space-y-3 bg-white border border-charcoal-100 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-sand-500" />
                </div>
                <div>
                  <div className="text-xs text-charcoal-400 uppercase tracking-wide">Category</div>
                  <div className="text-sm font-medium text-charcoal-700">{item.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-sand-500" />
                </div>
                <div>
                  <div className="text-xs text-charcoal-400 uppercase tracking-wide">Location</div>
                  <div className="text-sm font-medium text-charcoal-700">{item.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-sand-500" />
                </div>
                <div>
                  <div className="text-xs text-charcoal-400 uppercase tracking-wide">Date</div>
                  <div className="text-sm font-medium text-charcoal-700">{formatDate(item.date)}</div>
                </div>
              </div>
            </div>

            {/* Reporter info */}
            <div className="mt-6 bg-white border border-charcoal-100 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-charcoal-700 mb-4">Reported By</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center">
                  <span className="font-display text-lg font-semibold text-cream-50">
                    {item.reporterName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-charcoal-700">
                    <User className="w-4 h-4 text-charcoal-400" />
                    {item.reporterName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal-400 mt-1">
                    <Mail className="w-4 h-4 text-charcoal-400" />
                    {item.reporterEmail}
                  </div>
                </div>
              </div>
            </div>

            {/* Action button */}
            {!isMyItem && item.status === 'active' && (
              <button
                onClick={() => {
                  if (!currentUser) {
                    navigate('/login');
                    return;
                  }
                  setShowClaimModal(true);
                }}
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-medium rounded-xl transition-all hover:scale-[1.01] ${
                  isLost ? 'bg-charcoal-800 text-cream-50 hover:bg-charcoal-700' : 'bg-sand-600 text-cream-50 hover:bg-sand-500'
                }`}
              >
                <HandHeart className="w-5 h-5" />
                {isLost ? 'I Found This Item' : 'This Is My Item'}
              </button>
            )}

            {isMyItem && (
              <div className="mt-6 px-6 py-4 bg-cream-100 border border-sand-200 rounded-xl text-sm text-charcoal-500 text-center">
                This is your reported item. You can manage claims from your{' '}
                <Link to="/dashboard" className="text-sand-600 font-medium hover:underline">dashboard</Link>.
              </div>
            )}

            {item.status !== 'active' && !isMyItem && (
              <div className="mt-6 px-6 py-4 bg-charcoal-50 border border-charcoal-100 rounded-xl text-sm text-charcoal-400 text-center">
                This item is no longer active.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fadeIn"
          onClick={() => setShowClaimModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {claimSent ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-charcoal-800">Claim Submitted!</h2>
                <p className="text-charcoal-400 mt-2">
                  Your claim request has been sent to {item.reporterName}. They will review it and
                  respond soon.
                </p>
                <button
                  onClick={() => {
                    setShowClaimModal(false);
                    setClaimSent(false);
                    setClaimMessage('');
                  }}
                  className="mt-6 px-6 py-2.5 bg-charcoal-800 text-cream-50 text-sm font-medium rounded-xl hover:bg-charcoal-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-charcoal-800">
                      {isLost ? 'Found This Item?' : 'Claim This Item'}
                    </h2>
                    <p className="text-sm text-charcoal-400 mt-1">{item.name}</p>
                  </div>
                  <button
                    onClick={() => setShowClaimModal(false)}
                    className="text-charcoal-300 hover:text-charcoal-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleClaimSubmit}>
                  <label className="block text-sm font-medium text-charcoal-600 mb-2">
                    Message to reporter
                  </label>
                  <textarea
                    value={claimMessage}
                    onChange={(e) => setClaimMessage(e.target.value)}
                    placeholder={
                      isLost
                        ? 'Describe where and when you found this item, or any details that can help verify...'
                        : 'Provide details that confirm this is your item (color, contents, distinguishing features)...'
                    }
                    rows={5}
                    className="w-full px-4 py-3 bg-cream-50 border border-charcoal-100 rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none focus:border-sand-400 transition-colors resize-none"
                    required
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowClaimModal(false)}
                      className="flex-1 px-5 py-3 bg-white text-charcoal-600 font-medium rounded-xl border border-charcoal-100 hover:border-sand-300 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-charcoal-800 text-cream-50 font-medium rounded-xl hover:bg-charcoal-700 transition-colors text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Submit Claim
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
