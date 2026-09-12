import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, isLoggedIn, isAdmin, user, logout, wishlist } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Western Wear', path: '/products?category=Western+Wear' },
    { name: 'Ethnic Wear', path: '/products?category=Ethnic+Wear' },
    { name: 'Dresses', path: '/products?search=dress' },
    { name: 'Sarees', path: '/products?search=saree' },
    { name: 'New Arrivals', path: '/products?filter=new' },
    { name: 'Sale', path: '/products?filter=sale' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#1a1a2e] via-[#2d1b4e] to-[#1a1a2e] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-xs">
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+919595535339" className="flex items-center gap-1 hover:text-pink-300 transition-colors">
                <Phone size={12} /> +91 95955 35339
              </a>
              <span className="text-gray-500">|</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> Yavatmal, Maharashtra
              </span>
            </div>
            <div className="flex-1 md:flex-none overflow-hidden">
              <div className="animate-marquee whitespace-nowrap inline-block">
                <span className="mx-8">✨ FREE Shipping on orders above ₹999</span>
                <span className="mx-8">🎉 Use code FASHION50 for extra 10% OFF</span>
                <span className="mx-8">👗 New Korean Collection Launched!</span>
                <span className="mx-8">💃 Up to 50% OFF on Ethnic Wear</span>
                <span className="mx-8">✨ FREE Shipping on orders above ₹999</span>
                <span className="mx-8">🎉 Use code FASHION50 for extra 10% OFF</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link to="/admin/login" className="hover:text-pink-300 transition-colors">Admin</Link>
              <span className="text-gray-500">|</span>
              <Link to="/contact" className="hover:text-pink-300 transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-soft'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-gray-700 hover:text-pink-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <img 
                  src="https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg" 
                  alt="Fashion2gether Logo" 
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-pink-100 group-hover:border-pink-400 transition-all duration-300 shadow-md"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold font-playfair tracking-tight">
                  <span className="gradient-text">Fashion</span>
                  <span className="text-[#1a1a2e]">2gether</span>
                </h1>
                <p className="text-[10px] lg:text-xs text-gray-400 font-medium tracking-wider uppercase">
                  Exclusive Women's Fashion
                </p>
              </div>
            </Link>

            {/* Search bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search kurtis, sarees, dresses, tops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-5 pr-12 bg-gray-50 border-2 border-gray-100 rounded-full 
                           focus:border-pink-500 focus:bg-white focus:outline-none focus:shadow-lg focus:shadow-pink-500/10
                           transition-all duration-300 text-sm"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-pink-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:from-pink-200 group-hover:to-purple-200 transition-colors">
                    <User size={16} className="text-pink-600" />
                  </div>
                  <span className="hidden lg:inline text-sm font-medium text-gray-700">
                    {isLoggedIn ? user?.name : 'Login'}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-slideDown z-50">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-sm">Hi, {user?.name}!</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 text-sm transition-colors">
                          <ShoppingBag size={16} className="text-gray-400" /> My Orders
                        </Link>
                        <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 text-sm transition-colors">
                          <Heart size={16} className="text-gray-400" /> Wishlist ({wishlist.length})
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 text-sm text-purple-600 transition-colors">
                            <span>🛡️</span> Admin Panel
                          </Link>
                        )}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={() => { logout(); navigate('/'); }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm w-full text-left text-red-500 transition-colors"
                          >
                            <span>🚪</span> Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-sm">Welcome!</p>
                          <p className="text-xs text-gray-500">Login to your account</p>
                        </div>
                        <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 text-sm transition-colors">
                          <User size={16} className="text-gray-400" /> Customer Login
                        </Link>
                        <Link to="/admin/login" className="flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 text-sm text-purple-600 transition-colors">
                          <span>🛡️</span> Admin Login
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-pink-50 transition-colors group">
                <Heart size={22} className="text-gray-600 group-hover:text-pink-500 transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-pink-50 transition-colors group">
                <ShoppingBag size={22} className="text-gray-600 group-hover:text-pink-500 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-4 pr-10 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-pink-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500">
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden lg:block border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-5 py-3.5 text-sm font-medium transition-all duration-300 relative group
                    ${location.pathname === link.path || (link.path !== '/' && location.pathname + location.search === link.path)
                      ? 'text-pink-600' 
                      : 'text-gray-700 hover:text-pink-600'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 rounded-full
                    ${location.pathname === link.path || (link.path !== '/' && location.pathname + location.search === link.path)
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                    }`}
                  />
                  {link.name === 'Sale' && (
                    <span className="absolute -top-1 -right-1 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                      HOT
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl animate-slideDown">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-3 pt-3">
                <Link to="/contact" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl">
                  📞 Contact Us
                </Link>
                <Link to="/admin/login" className="block px-4 py-3 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-xl">
                  🛡️ Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
