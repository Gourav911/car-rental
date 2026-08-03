import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car } from 'lucide-react';
import { useScrolled } from '../../hooks';
import { useOfferModal } from '../../context/OfferModalContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Cars', href: '/cars' },
  { label: 'Locations', href: '/locations' },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { openOfferModal } = useOfferModal();

  const isHome = location.pathname === '/';
  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="CarRentalDesk Home">
          <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className={`font-extrabold text-lg leading-none block ${scrolled || !isHome ? 'text-primary-900' : 'text-white'}`}>
              CarRental<span className="text-secondary-600">Desk</span>
            </span>
            <span className={`text-[10px] font-medium tracking-wider uppercase ${scrolled || !isHome ? 'text-muted' : 'text-blue-200'}`}>
              Drive Smarter.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-secondary-600 bg-secondary-50'
                    : scrolled || !isHome
                    ? 'text-gray-600 hover:text-primary-900 hover:bg-gray-100'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={openOfferModal}
            className="btn-primary text-sm py-2.5 px-5 cursor-pointer"
            id="navbar-book-now"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors duration-200 ${
            scrolled || !isHome ? 'text-primary-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-secondary-50 text-secondary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border flex gap-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openOfferModal();
                  }}
                  className="w-full btn-primary text-center text-sm py-2.5 cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
