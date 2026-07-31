import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-surface pt-20">
      {/* Hero */}
      <div className="bg-gradient-hero py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Get in Touch</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto px-4">
          Our team is ready to help with anything — from booking assistance to corporate inquiries.
        </p>
      </div>

      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Contact Information</h2>
                {[
                  { icon: Mail, title: 'Email Us', value: 'support@carrentaldesk.net', sub: 'We reply within 2 hours' },
                  { icon: Phone, title: 'Call Us', value: '+1 800 555 1234', sub: '24/7 Support Line' },
                  { icon: MapPin, title: 'Head Office', value: '350 Fifth Avenue, New York, NY 10118', sub: 'United States' },
                ].map(({ icon: Icon, title, value, sub }) => (
                  <div key={title} className="card p-5 flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 bg-secondary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-secondary-600" />
                    </div>
                    <div>
                      <p className="font-bold text-primary-900 text-sm">{title}</p>
                      <p className="text-gray-700 text-sm mt-0.5">{value}</p>
                      <p className="text-muted text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Support Hours */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-success-500" />
                  </div>
                  <h3 className="font-bold text-primary-900">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Monday – Friday', hours: '08:00 – 22:00 EST' },
                    { day: 'Saturday', hours: '09:00 – 18:00 EST' },
                    { day: 'Sunday', hours: '10:00 – 16:00 EST' },
                    { day: 'Emergency Line', hours: '24/7 · +1 800 999 0000' },
                  ].map((s) => (
                    <div key={s.day} className="flex justify-between text-sm">
                      <span className="text-muted">{s.day}</span>
                      <span className="font-semibold text-primary-900">{s.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-10 h-10 text-success-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">Message Received!</h3>
                    <p className="text-muted">We'll get back to you within 2 hours. Check your inbox for a confirmation.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Send Another Message</button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-primary-900 mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                          <input
                            type="text"
                            id="contact-name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="James Whitfield"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                          <input
                            type="email"
                            id="contact-email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="james@example.com"
                            className="input-field"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Subject</label>
                        <input
                          type="text"
                          id="contact-subject"
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          placeholder="How can we help?"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Message</label>
                        <textarea
                          id="contact-message"
                          required
                          rows={6}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your booking or inquiry..."
                          className="input-field resize-none"
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full sm:w-auto py-3.5 px-8 text-base" id="contact-submit">
                        <Send className="w-4 h-4" />
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
