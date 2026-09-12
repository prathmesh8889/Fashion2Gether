import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const LOGO_URL = "https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg";

const Footer: React.FC = () => {
  const { storeInfo } = useStore();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[var(--charcoal)] text-white">
      {/* Newsletter */}
      <div className="bg-[var(--rose)]">
        <div className="container-custom py-10 text-center">
          <h3 className="text-2xl font-playfair font-bold mb-2">Stay Connected</h3>
          <p className="text-white/80 text-sm mb-5">Get updates on new arrivals and exclusive offers</p>
          <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/30"
            />
            <button className="px-6 py-2.5 bg-white text-[var(--rose)] font-semibold rounded-full text-sm hover:bg-[var(--cream)] transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={LOGO_URL}
                alt="Fashion2gether" 
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div>
                <h3 className="font-playfair font-bold text-lg">Fashion2gether</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Women's Fashion Boutique</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Yavatmal's trusted destination for women's fashion since 2010. We offer a curated collection of ethnic wear, western wear, and accessories for the modern woman.
            </p>
            <div className="flex gap-3">
              <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--rose)] transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--rose)] transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" aria-label="WhatsApp">
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'All Collections', path: '/collections' },
                { name: 'Ethnic Wear', path: '/collections?category=Ethnic+Wear' },
                { name: 'Western Wear', path: '/collections?category=Western+Wear' },
                { name: 'New Arrivals', path: '/collections?filter=new' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-white/60 hover:text-[var(--rose)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Customer Service</h4>
            <ul className="space-y-2.5">
              {[
                'Shipping Policy',
                'Return & Exchange',
                'Size Guide',
                'Track Order',
                'FAQ',
                'Privacy Policy',
              ].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/60 hover:text-[var(--rose)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Visit Our Store</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[var(--rose)] mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">{storeInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[var(--rose)] shrink-0" />
                <a href={`tel:${storeInfo.phone}`} className="text-sm text-white/60 hover:text-white transition-colors">
                  {storeInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[var(--rose)] shrink-0" />
                <a href={`mailto:${storeInfo.email}`} className="text-sm text-white/60 hover:text-white transition-colors">
                  {storeInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={16} className="text-[var(--rose)] shrink-0" />
                <span className="text-sm text-white/60">{storeInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2024 Fashion2gether. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>We Accept:</span>
            <div className="flex gap-2">
              {['GPay', 'PhonePe', 'Paytm', 'UPI', 'COD'].map(method => (
                <span key={method} className="bg-white/10 px-2 py-0.5 rounded text-[10px]">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 bg-[var(--rose)] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[var(--burgundy)] transition-colors z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
};

export default Footer;
