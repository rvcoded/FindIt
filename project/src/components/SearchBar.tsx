import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  variant?: 'hero' | 'inline';
  onSearch?: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ variant = 'inline', onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/browse?q=${encodeURIComponent(query)}`);
    }
  };

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="relative flex items-center bg-white rounded-full shadow-lg border border-charcoal-100 overflow-hidden">
          <Search className="w-5 h-5 text-charcoal-400 ml-5 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for lost or found items..."
            className="flex-1 px-4 py-4 text-base bg-transparent text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none"
          />
          <button
            type="submit"
            className="mr-2 px-6 py-3 bg-charcoal-800 text-cream-50 text-sm font-medium rounded-full hover:bg-charcoal-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center bg-white rounded-xl border border-charcoal-100 overflow-hidden">
        <Search className="w-5 h-5 text-charcoal-400 ml-4 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items by name, location, or category..."
          className="flex-1 px-3 py-3 text-sm bg-transparent text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none"
        />
        <button
          type="submit"
          className="mr-2 px-4 py-2 bg-charcoal-800 text-cream-50 text-sm font-medium rounded-lg hover:bg-charcoal-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
