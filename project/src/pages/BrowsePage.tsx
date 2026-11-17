import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import ItemCard from '@/components/ItemCard';
import { useApp } from '@/context/AppContext';
import { CATEGORIES, LOCATIONS } from '@/types';

export default function BrowsePage() {
  const { items } = useApp();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter((item) => item.type === typeFilter);
    }
    if (categoryFilter !== 'all') {
      result = result.filter((item) => item.category === categoryFilter);
    }
    if (locationFilter !== 'all') {
      result = result.filter((item) => item.location === locationFilter);
    }

    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [items, query, typeFilter, categoryFilter, locationFilter, sortBy]);

  const activeFilterCount =
    (typeFilter !== 'all' ? 1 : 0) +
    (categoryFilter !== 'all' ? 1 : 0) +
    (locationFilter !== 'all' ? 1 : 0);

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-semibold text-charcoal-800">Browse Items</h1>
          <p className="text-charcoal-400 mt-2">
            Search through all reported lost and found items across campus
          </p>
        </div>

        {/* Search + Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <SearchIcon className="w-5 h-5 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, description, or location..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-charcoal-100 rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none focus:border-sand-400 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'bg-charcoal-800 text-cream-50 border-charcoal-800'
                : 'bg-white text-charcoal-600 border-charcoal-100 hover:border-sand-300'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-sand-500 text-cream-50 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-charcoal-100 rounded-2xl p-6 mb-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-400 uppercase tracking-wide mb-2">
                  Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | 'lost' | 'found')}
                  className="w-full px-3 py-2.5 bg-cream-50 border border-charcoal-100 rounded-lg text-sm text-charcoal-700 focus:outline-none focus:border-sand-400"
                >
                  <option value="all">All Types</option>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-400 uppercase tracking-wide mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-cream-50 border border-charcoal-100 rounded-lg text-sm text-charcoal-700 focus:outline-none focus:border-sand-400"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-400 uppercase tracking-wide mb-2">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-cream-50 border border-charcoal-100 rounded-lg text-sm text-charcoal-700 focus:outline-none focus:border-sand-400"
                >
                  <option value="all">All Locations</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-400 uppercase tracking-wide mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 bg-cream-50 border border-charcoal-100 rounded-lg text-sm text-charcoal-700 focus:outline-none focus:border-sand-400"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setTypeFilter('all');
                  setCategoryFilter('all');
                  setLocationFilter('all');
                }}
                className="mt-4 text-sm text-sand-600 hover:text-sand-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-4 h-4 text-charcoal-400" />
          <span className="text-sm text-charcoal-400">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
          </span>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-cream-200 flex items-center justify-center mb-4">
              <SearchIcon className="w-8 h-8 text-charcoal-300" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-charcoal-700">No items found</h3>
            <p className="text-charcoal-400 mt-2">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setQuery('');
                setTypeFilter('all');
                setCategoryFilter('all');
                setLocationFilter('all');
              }}
              className="mt-6 px-5 py-2.5 bg-charcoal-800 text-cream-50 text-sm font-medium rounded-xl hover:bg-charcoal-700 transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
