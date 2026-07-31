import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-secondary-600/20 to-blue-600/10 border border-white/10 rounded-3xl p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">Stay ahead of the best deals</h3>
            <p className="text-blue-200 text-sm">Get exclusive offers and travel tips delivered to your inbox.</p>
          </div>
          <form
            className="flex w-full md:w-auto gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200 text-sm focus:outline-none focus:border-secondary-400 transition-colors"
              id="footer-newsletter-email"
            />
            <button
              type="submit"
              className="btn-primary py-3 px-5 text-sm whitespace-nowrap"
              id="footer-newsletter-submit"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg">
                CarRental<span className="text-secondary-400">Desk</span>
              </span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6 max-w-xs">
              The world's most trusted platform for comparing and booking rental vehicles across 600+ cities worldwide.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '#' },
                { label: 'Press', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Partners', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Support</h4>
            <ul className="space-y-3">
              {[
                { label: 'Help Center', href: '/faq' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Cancellations', href: '/faq' },
                { label: 'Insurance', href: '/faq' },
                { label: 'Fleet Partners', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Locations</h4>
            <ul className="space-y-3">
              {['Dubai', 'London', 'New York', 'Paris', 'Tokyo', 'Sydney'].map((city) => (
                <li key={city}>
                  <Link to="/locations" className="text-blue-200 hover:text-white text-sm transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Legal</h4>
            <ul className="space-y-3 mb-8">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '#' },
                { label: 'Accessibility', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a href="mailto:support@carrentaldesk.net" className="flex items-center gap-2 text-blue-200 hover:text-white text-xs transition-colors">
                <Mail className="w-3.5 h-3.5" /> support@carrentaldesk.net
              </a>
              <a href="tel:+18005551234" className="flex items-center gap-2 text-blue-200 hover:text-white text-xs transition-colors">
                <Phone className="w-3.5 h-3.5" /> +1 800 555 1234
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-300">
          <p>© {new Date().getFullYear()} CarRentalDesk.net · All rights reserved.</p>
          <p className="flex items-center gap-1">
            Trusted by <span className="text-white font-semibold mx-1">2M+</span> travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
