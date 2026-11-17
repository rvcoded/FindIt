import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { campusImg } from '@/data/sampleData';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.trim() || !password.trim()) {
    setError('Please enter both email and password');
    return;
  }

  if (!email.endsWith('.edu')) {
    setError('Please use your university email (.edu)');
    return;
  }

  const success = await login(email, password);

  if (success) {
    navigate('/dashboard');
  }
};
  return (
    <div className="min-h-screen flex">
      {/* Left panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 bg-cream-50">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-charcoal-800 flex items-center justify-center">
              <Compass className="w-5 h-5 text-cream-50" />
            </div>
            <div>
              <span className="font-display text-xl font-semibold text-charcoal-800">FindIt</span>
              <span className="block text-[10px] text-charcoal-400 tracking-wide uppercase">Campus Lost &amp; Found</span>
            </div>
          </Link>

          <h1 className="font-display text-3xl font-semibold text-charcoal-800">Welcome Back</h1>
          <p className="text-charcoal-400 mt-2">Sign in to your student account</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal-600 mb-2">University Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-charcoal-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-charcoal-100 rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none focus:border-sand-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-600 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-charcoal-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-white border border-charcoal-100 rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none focus:border-sand-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-300 hover:text-charcoal-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-charcoal-400">
                <input type="checkbox" className="rounded border-charcoal-200" />
                Remember me
              </label>
              <button type="button" className="text-sm text-sand-600 hover:text-sand-700 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-charcoal-800 text-cream-50 font-medium rounded-xl hover:bg-charcoal-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-sand-600 hover:text-sand-700 font-medium">
              Sign up
            </Link>
          </p>

          <div className="mt-6 px-4 py-3 bg-cream-100 rounded-xl border border-sand-200">
            <p className="text-xs text-charcoal-400 text-center">
              <span className="font-medium text-sand-600">Demo:</span> Use any .edu email and password to sign in
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-charcoal-400 hover:text-sand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>

      {/* Right panel — image */}
      <div className="hidden lg:block w-1/2 relative">
        <img src={campusImg} alt="University campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-800/40" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <h2 className="font-display text-4xl font-semibold text-cream-50 leading-tight">
            Reuniting students
            <br />
            with what matters.
          </h2>
          <p className="text-cream-100/80 mt-4 max-w-md">
            Join the campus community platform where lost items find their way home.
          </p>
        </div>
      </div>
    </div>
  );
}
