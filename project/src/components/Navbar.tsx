import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Compass, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Browse Items', path: '/browse' },
    { label: 'Report Item', path: '/report' },
    { label: 'How It Works', path: '/#how-it-works' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/#')) return location.pathname === '/';
    return location.pathname.startsWith(path.split('/')[1] ? path : path);
  };

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (route === '/' && location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-charcoal-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-charcoal-800 flex items-center justify-center">
              <Compass className="w-5 h-5 text-cream-50" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold text-charcoal-800">FindIt</span>
              <span className="text-[10px] text-charcoal-400 tracking-wide uppercase">Campus Lost &amp; Found</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-sand-600 bg-cream-200'
                    : 'text-charcoal-500 hover:text-charcoal-800 hover:bg-cream-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal-600 hover:text-sand-600 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-charcoal-600 hover:text-sand-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-medium bg-charcoal-800 text-cream-50 rounded-lg hover:bg-charcoal-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-charcoal-600"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-1 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-charcoal-600 hover:bg-cream-100 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-charcoal-100 space-y-1">
              {currentUser ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-charcoal-600 hover:bg-cream-100 rounded-lg"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                      navigate('/');
                    }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-cream-100 rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-charcoal-600 hover:bg-cream-100 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium bg-charcoal-800 text-cream-50 rounded-lg text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
