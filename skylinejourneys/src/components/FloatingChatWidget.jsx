import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitToGoogleSheets } from '../services/googleSheets';

export const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    bookingNumber: '',
    consent: false,
  });

  const handleSubmit = async (e) => {
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
      const passengerName = (form.firstName.trim() + ' ' + form.lastName.trim()).trim();
      const res = await submitToGoogleSheets({
        type: 'Chat Inquiry',
        passengerName: passengerName,
        email: form.email,
        phone: form.phone || 'N/A',
        subject: form.subject,
        bookingNumber: form.bookingNumber || 'N/A',
      });

      if (res.success) {
        setSuccess(true);
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          bookingNumber: '',
          consent: false,
        });
      } else {
        setError(res.message || 'Failed to send inquiry.');
      }
    } catch (err) {
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
          className="relative group flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none"
          aria-label="Open support chat inquiry form"
          style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2563eb', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(37,99,235,0.3)' }}
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" style={{ position: 'absolute', top: '-2px', right: '-2px', width: '12px', height: '12px', background: '#10b981', border: '2px solid #0f172a', borderRadius: '50%' }} />
          {isOpen ? <X size={24} style={{ color: '#fff' }} /> : <MessageSquare size={24} style={{ color: '#fff' }} />}
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
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] bg-slate-900 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden text-white"
            style={{ position: 'fixed', bottom: '96px', right: '24px', width: '380px', backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', zIndex: 50, color: '#fff', fontFamily: 'Manrope, sans-serif' }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(90deg, #0f172a, #1e293b)' }}>
              <div className="flex items-center gap-2.5" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white" style={{ margin: 0, fontSize: '15px', fontWeight: '800' }}>Chat & Support</h3>
                  <p className="text-[11px] text-blue-200" style={{ margin: 0, fontSize: '11px', color: '#bfdbfe' }}>Send us a message  We respond 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}
                aria-label="Close chat window"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto" style={{ padding: '24px', maxHeight: '480px', overflowY: 'auto' }}>
              {success ? (
                <div className="text-center py-8 space-y-4" style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400" style={{ width: '56px', height: '56px', backgroundColor: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#34d399' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white" style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px' }}>Message Sent!</h4>
                  <p className="text-sm text-blue-100/80" style={{ fontSize: '13px', color: 'rgba(219,234,254,0.8)', margin: '0 0 16px' }}>
                    Thank you for reaching out. Our support agent will respond to your email shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="select-flight-btn"
                    style={{ padding: '10px 20px', borderRadius: '12px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2" style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* First Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.7)' }}>
                      First Name <span style={{ color: '#f59e0b' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="e.g. John"
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.7)' }}>
                      Last Name <span style={{ color: '#f59e0b' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="e.g. Doe"
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.7)' }}>
                      Email <span style={{ color: '#f59e0b' }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john.doe@example.com"
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.7)' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      disabled={loading}
                    />
                  </div>

                  {/* Subject */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.7)' }}>
                      Subject <span style={{ color: '#f59e0b' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Inquiry or question"
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Booking Number */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.7)' }}>
                      Booking Number (If you have one)
                    </label>
                    <input
                      type="text"
                      value={form.bookingNumber}
                      onChange={(e) => setForm({ ...form, bookingNumber: e.target.value })}
                      placeholder="e.g. FF-98214"
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      disabled={loading}
                    />
                  </div>

                  {/* Consent */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
                    <input
                      type="checkbox"
                      id="chat-consent"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      style={{ marginTop: '3px', cursor: 'pointer' }}
                      disabled={loading}
                      required
                    />
                    <label htmlFor="chat-consent" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4', cursor: 'pointer' }}>
                      I consent to my data being processed in accordance with privacy guidelines.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', transition: 'background 0.2s', marginTop: '8px' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
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
