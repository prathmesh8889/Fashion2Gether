import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ContactPage: React.FC = () => {
  const { storeInfo, addEnquiry } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name required';
    if (!formData.phone.trim()) errs.phone = 'Phone required';
    if (!formData.message.trim()) errs.message = 'Message required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addEnquiry(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[var(--charcoal)] mb-2">Get in Touch</h1>
          <div className="section-divider"></div>
          <p className="text-[var(--medium-gray)] mt-3">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-playfair font-bold mb-6">Store Information</h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Address', value: storeInfo.address, color: 'bg-pink-50 text-[var(--rose)]' },
                { icon: Phone, label: 'Phone', value: storeInfo.phone, color: 'bg-green-50 text-green-600', link: `tel:${storeInfo.phone}` },
                { icon: Mail, label: 'Email', value: storeInfo.email, color: 'bg-blue-50 text-blue-600', link: `mailto:${storeInfo.email}` },
                { icon: Clock, label: 'Hours', value: storeInfo.hours, color: 'bg-purple-50 text-purple-600' },
                { icon: Instagram, label: 'Instagram', value: '@fashion2gether_', color: 'bg-pink-50 text-[var(--rose)]', link: storeInfo.instagram },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[var(--light-gray)]">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--medium-gray)] uppercase tracking-wider">{item.label}</p>
                    {item.link ? (
                      <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm font-medium hover:text-[var(--rose)] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-xl font-playfair font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-[var(--light-gray)] space-y-4">
              <div>
                <input type="text" placeholder="Your Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full px-4 py-3 bg-[var(--cream)] border rounded-lg text-sm focus:outline-none focus:border-[var(--rose)] ${errors.name ? 'border-red-400' : 'border-[var(--light-gray)]'}`} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <input type="email" placeholder="Email (optional)" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--light-gray)] rounded-lg text-sm focus:outline-none focus:border-[var(--rose)]" />
              </div>
              <div>
                <input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full px-4 py-3 bg-[var(--cream)] border rounded-lg text-sm focus:outline-none focus:border-[var(--rose)] ${errors.phone ? 'border-red-400' : 'border-[var(--light-gray)]'}`} />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <textarea rows={4} placeholder="Your Message *" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`w-full px-4 py-3 bg-[var(--cream)] border rounded-lg text-sm focus:outline-none focus:border-[var(--rose)] resize-none ${errors.message ? 'border-red-400' : 'border-[var(--light-gray)]'}`} />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              {submitted && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
                  <CheckCircle size={16} /> Message sent! We'll get back to you soon.
                </div>
              )}
              <button type="submit" className="w-full py-3 bg-[var(--rose)] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[var(--burgundy)] transition-colors">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
