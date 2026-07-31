import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  return (
    <main className="min-h-screen bg-surface flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 max-w-lg mx-auto w-full">
        <Link to="/" className="flex items-center gap-2.5 mb-10">
          <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl text-primary-900">
            CarRental<span className="text-secondary-600">Desk</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-primary-900 mb-2">Welcome back</h1>
          <p className="text-muted mb-8">Sign in to manage your bookings and preferences.</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  id="login-email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
                <Link to="/forgot-password" className="text-xs text-secondary-600 hover:underline font-semibold">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Your password"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-4 text-base font-bold" id="login-submit">
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="h-px bg-border" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-3 text-xs text-muted">or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors" id="login-google">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors" id="login-apple">
              <img src="https://www.svgrepo.com/show/452232/apple.svg" alt="Apple" className="w-5 h-5" />
              Apple
            </button>
          </div>

          <p className="text-center text-sm text-muted">
            Don't have an account?{' '}
            <Link to="/register" className="text-secondary-600 font-bold hover:underline">Create one free</Link>
          </p>
        </motion.div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-hero overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=1200&q=80"
          alt="Luxury car"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-14">
          <h2 className="text-4xl font-extrabold text-white mb-6">Drive Smarter.<br />Book Faster.</h2>
          <div className="space-y-4">
            {['Manage all your bookings in one place', 'Exclusive member-only deals', 'Faster checkout with saved details', '24/7 priority support access'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-success-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
