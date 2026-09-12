import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-playfair">Get in Touch</h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Have questions? We'd love to hear from you. Visit our exclusive women's store or send us a message.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-6">Store Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Address</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Near Veer Vamanrao Chowk, Behind Jay Ambe Tel Bandar,<br />
                  Tilakwadi, Yavatmal, Maharashtra 445002
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <Phone size={20} className="text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Phone</h3>
                <p className="text-gray-600 text-sm mt-1">+91 95955 35339</p>
                <p className="text-gray-600 text-sm">+91 70205 15428</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Mail size={20} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Email</h3>
                <p className="text-gray-600 text-sm mt-1">info@fashion2gether.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <Clock size={20} className="text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Working Hours</h3>
                <p className="text-gray-600 text-sm mt-1">Monday - Sunday: 10:00 AM - 9:30 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                <Instagram size={20} className="text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Social Media</h3>
                <p className="text-gray-600 text-sm mt-1">
                  <a href="https://instagram.com/fashion2gether_" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
                    @fashion2gether_
                  </a>
                  {' • '}
                  <a href="https://instagram.com/fashion2gether_f2g" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
                    @fashion2gether_f2g
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919595535339"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border-2 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:outline-none resize-none"
                placeholder="How can we help you?"
              />
            </div>
            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
            >
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
