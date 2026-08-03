import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-surface flex">
      <div className="hidden lg:flex flex-1 relative bg-gradient-hero overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1499038374975-03a3bba9bc70?w=1200&q=80"
          alt="Road trip"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-14 pb-14">
          <blockquote className="text-white text-2xl font-bold italic leading-relaxed mb-4">
            "The best journeys answer questions that in the beginning you didn't even think to ask."
          </blockquote>
          <cite className="text-blue-200 text-sm"> Jeff Johnson</cite>
        </div>
      </div>

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
          <h1 className="text-3xl font-extrabold text-primary-900 mb-2">Create your account</h1>
          <p className="text-muted mb-8">Join 2 million+ travelers already booking smarter.</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" id="reg-firstname" required placeholder="James" className="input-field pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Last Name</label>
                <input type="text" id="reg-lastname" required placeholder="Whitfield" className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" id="reg-email" required placeholder="you@example.com" className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="tel" id="reg-phone" placeholder="+1 555 000 0000" className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="reg-password"
                  required
                  placeholder="Min. 8 characters"
                  className="input-field pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input type="checkbox" id="reg-terms" required className="mt-1 accent-secondary-600" />
              <label htmlFor="reg-terms" className="text-sm text-muted">
                I agree to CarRentalDesk's{' '}
                <Link to="/terms" className="text-secondary-600 font-semibold hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-secondary-600 font-semibold hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="btn-primary w-full py-4 text-base font-bold" id="register-submit">
              Create Account <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary-600 font-bold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default RegisterPage;
