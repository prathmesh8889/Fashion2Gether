import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-2 font-playfair">Join the Fashion2gether Family</h3>
          <p className="text-pink-100 mb-4">Get exclusive offers & new arrival updates directly in your inbox</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30"
            />
            <button className="px-6 py-2.5 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg font-playfair">Fashion2gether</h3>
                <p className="text-xs text-gray-400">Since 2010</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Yavatmal's premier destination for women's fashion. 15+ years of delivering style, elegance, and quality to our customers.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/fashion2gether_" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm hover:text-pink-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Western+Wear" className="text-sm hover:text-pink-400 transition-colors">Western Wear</Link></li>
              <li><Link to="/products?category=Ethnic+Wear" className="text-sm hover:text-pink-400 transition-colors">Ethnic Wear</Link></li>
              <li><Link to="/products?filter=new" className="text-sm hover:text-pink-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?filter=trending" className="text-sm hover:text-pink-400 transition-colors">Trending Now</Link></li>
              <li><Link to="/products?filter=sale" className="text-sm hover:text-pink-400 transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-pink-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-sm hover:text-pink-400 transition-colors">Return & Exchange</a></li>
              <li><a href="#" className="text-sm hover:text-pink-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-sm hover:text-pink-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="text-sm hover:text-pink-400 transition-colors">FAQ</a></li>
              <li><Link to="/contact" className="text-sm hover:text-pink-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Visit Our Store</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-pink-400 mt-0.5 shrink-0" />
                <span className="text-sm">Near Veer Vamanrao Chowk, Behind Jay Ambe Tel Bandar, Tilakwadi, Yavatmal, Maharashtra 445002</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-pink-400 shrink-0" />
                <span className="text-sm">+91 95955 35339</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-pink-400 shrink-0" />
                <span className="text-sm">info@fashion2gether.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-pink-400 shrink-0" />
                <span className="text-sm">10:00 AM - 9:30 PM (All Days)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">© 2024 Fashion2gether. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Payment Partners:</span>
            <div className="flex gap-2">
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">GPay</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">PhonePe</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">Paytm</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">UPI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
