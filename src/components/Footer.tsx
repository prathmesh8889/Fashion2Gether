import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send, Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#1a1a2e] text-gray-300 relative">
      {/* Newsletter Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-95"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-10 text-6xl">👗</div>
          <div className="absolute top-8 right-20 text-5xl">🥻</div>
          <div className="absolute bottom-4 left-1/3 text-4xl">💃</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair mb-2">
            Join the Fashion2gether Family
          </h3>
          <p className="text-pink-100 mb-6 text-sm md:text-base">
            Get exclusive offers & new women's fashion arrivals directly in your inbox
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 text-sm"
            />
            <button className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-pink-50 transition-colors text-sm flex items-center gap-2">
              <Send size={16} /> Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg" 
                alt="Fashion2gether Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-pink-400/50"
              />
              <div>
                <h3 className="text-white font-bold text-lg font-playfair">Fashion2gether</h3>
                <p className="text-xs text-pink-300 font-script text-base">Since 2010</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Yavatmal's premier destination for women's & girls' fashion. 15+ years of delivering style, elegance, and quality. 
              <span className="text-pink-300"> Exclusively a women's clothing store!</span> 👗
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/fashion2gether_" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <Instagram size={16} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <Facebook size={16} className="text-white" />
              </a>
              <a href="https://wa.me/919595535339" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <Phone size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Women's Collection</h4>
            <ul className="space-y-3">
              {[
                { name: 'All Women\'s Wear', path: '/products' },
                { name: 'Western Wear', path: '/products?category=Western+Wear' },
                { name: 'Ethnic Wear & Kurtis', path: '/products?category=Ethnic+Wear' },
                { name: 'Sarees', path: '/products?search=saree' },
                { name: 'Dresses & Gowns', path: '/products?search=dress' },
                { name: 'New Arrivals', path: '/products?filter=new' },
                { name: 'Trending Now 🔥', path: '/products?filter=trending' },
                { name: 'Mega Sale 💰', path: '/products?filter=sale' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-pink-300 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-pink-500/50 rounded-full group-hover:bg-pink-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Shopping Help</h4>
            <ul className="space-y-3">
              {[
                'Shipping Policy',
                'Return & Exchange',
                'Size Guide',
                'Track Your Order',
                'FAQ',
                'Privacy Policy',
                'Terms & Conditions',
              ].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-pink-300 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-pink-500/50 rounded-full group-hover:bg-pink-400 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Visit Our Store</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-pink-400" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">
                  Near Veer Vamanrao Chowk, Behind Jay Ambe Tel Bandar, Tilakwadi, Yavatmal, Maharashtra 445002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-green-400" />
                </div>
                <div>
                  <span className="text-sm text-gray-400">+91 95955 35339</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">info@fashion2gether.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">10:00 AM - 9:30 PM (All Days)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment & Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              © 2024 Fashion2gether. Made with <Heart size={12} className="text-pink-500 fill-pink-500" /> in Yavatmal
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">We Accept:</span>
              <div className="flex gap-2">
                {['GPay', 'PhonePe', 'Paytm', 'UPI', 'COD'].map(method => (
                  <span key={method} className="bg-gray-800 px-2.5 py-1 rounded text-[10px] text-gray-400 font-medium border border-gray-700">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-pink-500/30 flex items-center justify-center transition-all hover:-translate-y-1 z-40"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
