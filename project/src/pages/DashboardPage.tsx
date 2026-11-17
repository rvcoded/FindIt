import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Package, Inbox, CheckCircle2, Clock, TrendingUp, Plus, User, Mail, IdCard, Building2, Calendar, Check, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ItemCard from '@/components/ItemCard';

type Tab = 'items' | 'claims' | 'profile';

export default function DashboardPage() {
  const { currentUser, items, claims, updateClaimStatus } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('items');

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const myItems = items.filter((i) => i.reporterId === currentUser.id);
  const myClaims = claims.filter((c) => c.claimantEmail === currentUser.email);
  const claimsOnMyItems = claims.filter((c) =>
    myItems.some((i) => i.id === c.itemId)
  );

  const activeCount = myItems.filter((i) => i.status === 'active').length;
  const resolvedCount = myItems.filter((i) => i.status === 'resolved' || i.status === 'claimed').length;
  const pendingClaims = claimsOnMyItems.filter((c) => c.status === 'pending').length;

  const statusBadge: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-semibold text-charcoal-800">Dashboard</h1>
            <p className="text-charcoal-400 mt-2">Welcome back, {currentUser.name}</p>
          </div>
          <Link
            to="/report"
            className="inline-flex items-center gap-2 px-5 py-3 bg-charcoal-800 text-cream-50 font-medium rounded-xl hover:bg-charcoal-700 transition-colors self-start"
          >
            <Plus className="w-5 h-5" />
            Report New Item
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-charcoal-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-cream-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-charcoal-600" />
              </div>
              <span className="text-xs text-charcoal-300 uppercase tracking-wide">Total</span>
            </div>
            <div className="font-display text-3xl font-semibold text-charcoal-800">{myItems.length}</div>
            <div className="text-sm text-charcoal-400 mt-1">My Reported Items</div>
          </div>
          <div className="bg-white border border-charcoal-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs text-charcoal-300 uppercase tracking-wide">Active</span>
            </div>
            <div className="font-display text-3xl font-semibold text-charcoal-800">{activeCount}</div>
            <div className="text-sm text-charcoal-400 mt-1">Active Reports</div>
          </div>
          <div className="bg-white border border-charcoal-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-charcoal-300 uppercase tracking-wide">Done</span>
            </div>
            <div className="font-display text-3xl font-semibold text-charcoal-800">{resolvedCount}</div>
            <div className="text-sm text-charcoal-400 mt-1">Resolved Items</div>
          </div>
          <div className="bg-white border border-charcoal-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-sand-100 flex items-center justify-center">
                <Inbox className="w-6 h-6 text-sand-600" />
              </div>
              <span className="text-xs text-charcoal-300 uppercase tracking-wide">Pending</span>
            </div>
            <div className="font-display text-3xl font-semibold text-charcoal-800">{pendingClaims}</div>
            <div className="text-sm text-charcoal-400 mt-1">Pending Claims</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-charcoal-100">
          {[
            { key: 'items' as Tab, label: 'My Reported Items', icon: Package },
            { key: 'claims' as Tab, label: 'Claim Requests', icon: Inbox },
            { key: 'profile' as Tab, label: 'Profile', icon: User },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.key
                  ? 'border-sand-600 text-sand-600'
                  : 'border-transparent text-charcoal-400 hover:text-charcoal-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'items' && (
          <div>
            {myItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-charcoal-100 rounded-2xl">
                <div className="w-16 h-16 mx-auto rounded-full bg-cream-200 flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-charcoal-300" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-charcoal-700">No items reported yet</h3>
                <p className="text-charcoal-400 mt-2">Start by reporting a lost or found item</p>
                <Link
                  to="/report"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal-800 text-cream-50 text-sm font-medium rounded-xl hover:bg-charcoal-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Report Item
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="space-y-6">
            {/* Claims on my items */}
            <div>
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-4">
                Claims on Your Items
              </h3>
              {claimsOnMyItems.length > 0 ? (
                <div className="space-y-4">
                  {claimsOnMyItems.map((claim) => (
                    <div key={claim.id} className="bg-white border border-charcoal-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-4">
                      <img src={claim.itemImage} alt={claim.itemName} className="w-full sm:w-24 h-24 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              to={`/items/${claim.itemId}`}
                              className="font-display text-lg font-semibold text-charcoal-800 hover:text-sand-600 transition-colors"
                            >
                              {claim.itemName}
                            </Link>
                            <p className="text-sm text-charcoal-400 mt-1">
                              Claim by <span className="font-medium text-charcoal-600">{claim.claimantName}</span> ({claim.claimantEmail})
                            </p>
                          </div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusBadge[claim.status]}`}>
                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-charcoal-500 mt-3 bg-cream-50 rounded-lg p-3">{claim.message}</p>
                        {claim.status === 'pending' && (
                          <div className="flex gap-3 mt-3">
                            <button
                              onClick={() => updateClaimStatus(claim.id, 'approved')}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => updateClaimStatus(claim.id, 'rejected')}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-charcoal-100 rounded-2xl">
                  <Inbox className="w-10 h-10 text-charcoal-300 mx-auto mb-3" />
                  <p className="text-charcoal-400">No claims on your items yet</p>
                </div>
              )}
            </div>

            {/* My claims */}
            <div>
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-4">
                My Claim Requests
              </h3>
              {myClaims.length > 0 ? (
                <div className="space-y-4">
                  {myClaims.map((claim) => (
                    <div key={claim.id} className="bg-white border border-charcoal-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-4">
                      <img src={claim.itemImage} alt={claim.itemName} className="w-full sm:w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/items/${claim.itemId}`}
                            className="font-display text-lg font-semibold text-charcoal-800 hover:text-sand-600 transition-colors"
                          >
                            {claim.itemName}
                          </Link>
                          <p className="text-sm text-charcoal-400 mt-1 line-clamp-1">{claim.message}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border shrink-0 ${statusBadge[claim.status]}`}>
                          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-charcoal-100 rounded-2xl">
                  <TrendingUp className="w-10 h-10 text-charcoal-300 mx-auto mb-3" />
                  <p className="text-charcoal-400">You haven't submitted any claim requests yet</p>
                  <Link to="/browse" className="mt-4 inline-block text-sm font-medium text-sand-600 hover:text-sand-700">
                    Browse items to claim →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-white border border-charcoal-100 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-charcoal-800 flex items-center justify-center">
                  <span className="font-display text-3xl font-semibold text-cream-50">
                    {currentUser.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-charcoal-800">{currentUser.name}</h2>
                  <p className="text-charcoal-400">{currentUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 px-4 py-3 bg-cream-50 rounded-xl border border-charcoal-100">
                  <User className="w-5 h-5 text-sand-500" />
                  <div>
                    <div className="text-xs text-charcoal-400 uppercase tracking-wide">Full Name</div>
                    <div className="text-sm font-medium text-charcoal-700">{currentUser.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-cream-50 rounded-xl border border-charcoal-100">
                  <Mail className="w-5 h-5 text-sand-500" />
                  <div>
                    <div className="text-xs text-charcoal-400 uppercase tracking-wide">Email</div>
                    <div className="text-sm font-medium text-charcoal-700">{currentUser.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-cream-50 rounded-xl border border-charcoal-100">
                  <IdCard className="w-5 h-5 text-sand-500" />
                  <div>
                    <div className="text-xs text-charcoal-400 uppercase tracking-wide">Student ID</div>
                    <div className="text-sm font-medium text-charcoal-700">{currentUser.studentId}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-cream-50 rounded-xl border border-charcoal-100">
                  <Building2 className="w-5 h-5 text-sand-500" />
                  <div>
                    <div className="text-xs text-charcoal-400 uppercase tracking-wide">Department</div>
                    <div className="text-sm font-medium text-charcoal-700">{currentUser.department}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-cream-50 rounded-xl border border-charcoal-100">
                  <Calendar className="w-5 h-5 text-sand-500" />
                  <div>
                    <div className="text-xs text-charcoal-400 uppercase tracking-wide">Member Since</div>
                    <div className="text-sm font-medium text-charcoal-700">
                      {new Date(currentUser.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-cream-50 rounded-xl border border-charcoal-100">
                  <Package className="w-5 h-5 text-sand-500" />
                  <div>
                    <div className="text-xs text-charcoal-400 uppercase tracking-wide">Items Reported</div>
                    <div className="text-sm font-medium text-charcoal-700">{myItems.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
