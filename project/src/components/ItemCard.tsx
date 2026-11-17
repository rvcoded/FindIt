import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, Calendar, Tag } from 'lucide-react';
import type { Item } from '@/types';

interface ItemCardProps {
  item: Item;
}

const statusStyles: Record<string, string> = {
  active: 'bg-accent-100 text-accent-700',
  claimed: 'bg-charcoal-100 text-charcoal-600',
  resolved: 'bg-green-100 text-green-700',
  expired: 'bg-red-100 text-red-700',
};

const typeStyles: Record<string, string> = {
  lost: 'bg-red-50 text-red-600 border-red-200',
  found: 'bg-green-50 text-green-600 border-green-200',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link
      to={`/items/${item.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-charcoal-100 hover:border-sand-300 hover:shadow-xl transition-all duration-300 animate-fadeInUp"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${typeStyles[item.type]}`}>
            {item.type === 'lost' ? 'Lost' : 'Found'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[item.status]}`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-charcoal-800 group-hover:text-sand-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-charcoal-400 mt-1 line-clamp-2">{item.description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-charcoal-400">
            <Tag className="w-4 h-4 text-sand-400" />
            <span>{item.category}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-charcoal-400">
            <MapPin className="w-4 h-4 text-sand-400" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-charcoal-400">
            <Calendar className="w-4 h-4 text-sand-400" />
            <span>{formatDate(item.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
