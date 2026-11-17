import { Link } from 'react-router-dom';
import { Compass, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-800 text-cream-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-cream-50 flex items-center justify-center">
                <Compass className="w-5 h-5 text-charcoal-800" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold">FindIt</span>
                <span className="block text-[10px] text-cream-100/60 tracking-wide uppercase">
                  Campus Lost &amp; Found
                </span>
              </div>
            </div>
            <p className="text-sm text-cream-100/70 max-w-md leading-relaxed">
              FindIt is the official campus lost and found platform helping students reunite with
              their belongings. Report lost items, post found items, and browse listings all in one
              place.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cream-50 mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-cream-100/70 hover:text-sand-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-sm text-cream-100/70 hover:text-sand-300 transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-sm text-cream-100/70 hover:text-sand-300 transition-colors">
                  Report Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-cream-100/70 hover:text-sand-300 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cream-50 mb-4 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-cream-100/70">
                <Mail className="w-4 h-4 text-sand-300" />
                findit@university.edu
              </li>
              <li className="flex items-center gap-2 text-sm text-cream-100/70">
                <Phone className="w-4 h-4 text-sand-300" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-cream-100/70">
                <MapPin className="w-4 h-4 text-sand-300" />
                Student Union, Room 101
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream-100/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-100/50">
            © 2026 FindIt Campus Lost &amp; Found. All rights reserved.
          </p>
          <p className="text-xs text-cream-100/50">A university student service platform.</p>
        </div>
      </div>
    </footer>
  );
}
