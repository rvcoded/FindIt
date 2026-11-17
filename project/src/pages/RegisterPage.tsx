import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, User, IdCard, Building2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { campusImg } from '@/data/sampleData';

const DEPARTMENTS = [
  'Computer Science',
  'Engineering',
  'Business',
  'Arts & Humanities',
  'Sciences',
  'Medicine',
  'Law',
  'Other',
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    department: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    if (!formData.email.endsWith('.edu')) {
      setError('Please use your university email (.edu)');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
   const success = await register(
  formData.name,
  formData.email,
  formData.studentId,
  formData.department,
  formData.password
);

if (success) {
  navigate('/dashboard');
}
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — image */}
      <div className="hidden lg:block w-1/2 relative order-1">
        <img src={campusImg} alt="University campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-800/40" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <h2 className="font-display text-4xl font-semibold text-cream-50 leading-tight">
            Join the campus
            <br />
            lost &amp; found network.
          </h2>
          <p className="text-cream-100/80 mt-4 max-w-md">
            Create an account to report items, track claims, and help fellow students find their
            belongings.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 bg-cream-50 order-2">
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

          <h1 className="font-display text-3xl font-semibold text-charcoal-800">Create Account</h1>
          <p className="text-charcoal-400 mt-2">Sign up with your university email</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal-600 mb-2">Full Name</label>
              <div className="relative">
                <User className="w-5 h-5 text-charcoal-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-charcoal-100 rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none focus:border-sand-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-600 mb-2">University Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-charcoal-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@university.edu"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-charcoal-100 rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none focus:border-sand-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-600 mb-2">Student ID</label>
                <div className="relative">
                  <IdCard className="w-5 h-5 text-charcoal-300 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="CS2021042"
                    className="w-full pl-10 pr-3 py-3 bg-white border border-charcoal-100 rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none focus:border-sand-400 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-600 mb-2">Department</label>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-charcoal-300 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 bg-white border border-charcoal-100 rounded-xl text-sm text-charcoal-700 focus:outline-none focus:border-sand-400 transition-colors appearance-none"
                  >
                    <option value="">Select</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-600 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-charcoal-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
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

            <div>
              <label className="block text-sm font-medium text-charcoal-600 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-charcoal-300 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-charcoal-100 rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none focus:border-sand-400 transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-charcoal-800 text-cream-50 font-medium rounded-xl hover:bg-charcoal-700 transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal-400">
            Already have an account?{' '}
            <Link to="/login" className="text-sand-600 hover:text-sand-700 font-medium">
              Sign in
            </Link>
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-charcoal-400 hover:text-sand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  ); 
                                      }
