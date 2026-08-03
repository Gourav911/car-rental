import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { submitBookingToGoogleSheets } from '../services/googleSheets';

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    bookingNumber: '',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.firstName.trim()) {
      setError('First Name is required.');
      return;
    }
    if (!form.lastName.trim()) {
      setError('Last Name is required.');
      return;
    }
    if (!form.email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!form.subject.trim()) {
      setError('Subject is required.');
      return;
    }
    if (!form.consent) {
      setError('Please acknowledge the privacy policy consent.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitBookingToGoogleSheets({
        type: 'Chat Inquiry',
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        subject: form.subject,
        bookingNumber: form.bookingNumber,
      });

      if (res.success) {
        setSuccess(true);
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          bookingNumber: '',
          consent: false,
        });
      } else {
        setError(res.message || 'Failed to send inquiry.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button at Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setSuccess(false);
            setError('');
          }}
          className="relative group flex items-center justify-center w-14 h-14 bg-secondary-600 hover:bg-secondary-500 text-white rounded-full shadow-2xl shadow-secondary-600/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-secondary-400/50"
          aria-label="Open support chat inquiry form"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Floating Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] bg-slate-900/95 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden text-white"
          >
            {/* Header matching existing website theme */}
            <div className="bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-secondary-600 flex items-center justify-center text-white">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Chat & Support</h3>
                  <p className="text-[11px] text-blue-200">Send us a message  We respond 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                  <p className="text-sm text-blue-100/80">
                    Thank you for reaching out. Our support agent will respond to your email shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-secondary py-2.5 px-6 text-sm mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      <span className="text-amber-400 mr-1">*</span>First Name
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="e.g. John"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      <span className="text-amber-400 mr-1">*</span>Last Name
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="e.g. Doe"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      <span className="text-amber-400 mr-1">*</span>Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john.doe@example.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      <span className="text-amber-400 mr-1">*</span>Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Inquiry or question"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Booking Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      Booking Number (If you have one)
                    </label>
                    <input
                      type="text"
                      value={form.bookingNumber}
                      onChange={(e) => setForm({ ...form, bookingNumber: e.target.value })}
                      placeholder="e.g. BK-98214"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="chat-consent"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 accent-secondary-600 rounded cursor-pointer"
                      disabled={loading}
                      required
                    />
                    <label htmlFor="chat-consent" className="text-[11px] text-white/70 leading-normal cursor-pointer">
                      I acknowledge that CarRentalDesk is the controller of my personal data and consent to my data provided via chat being processed in accordance with privacy guidelines.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 px-6 mt-2 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Start Conversation</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatWidget;
