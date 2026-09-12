import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Phone, MapPin, Instagram } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const LOGO_URL = "https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, isLoggedIn, user, logout, wishlist, storeInfo } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Ethnic Wear', path: '/collections?category=Ethnic+Wear' },
    { name: 'Western Wear', path: '/collections?category=Western+Wear' },
    { name: 'New Arrivals', path: '/collections?filter=new' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] text-white text-xs py-2 hidden md:block">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${storeInfo.phone}`} className="flex items-center gap-1.5 hover:text-[var(--rose)] transition-colors">
              <Phone size={12} />
              <span>{storeInfo.phone}</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              <span>Yavatmal, Maharashtra</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--rose)] transition-colors">
              <Instagram size={12} />
              <span>@fashion2gether_</span>
            </a>
            <span className="text-[var(--light-gray)]">|</span>
            <span>Free Shipping on orders above ₹999</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={LOGO_URL}
              alt="Fashion2gether Logo" 
              className="w-12 h-12 rounded-full object-cover border-2 border-[var(--light-gray)] group-hover:border-[var(--rose)] transition-colors"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-xl font-playfair font-bold text-[var(--charcoal)] leading-tight">
                Fashion<span className="text-[var(--rose)]">2</span>gether
              </h1>
              <p className="text-[10px] text-[var(--medium-gray)] uppercase tracking-widest">
                Women's Fashion Boutique
              </p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search kurtis, sarees, dresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-4 pr-12 bg-[var(--cream)] border border-[var(--light-gray)] rounded-full text-sm focus:outline-none focus:border-[var(--rose)] focus:bg-white transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--medium-gray)] hover:text-[var(--rose)]">
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 hover:text-[var(--rose)] transition-colors" aria-label="Wishlist">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--rose)] text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:text-[var(--rose)] transition-colors" aria-label="Cart">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--rose)] text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to={isLoggedIn ? "/account" : "/login"} className="hidden sm:flex items-center gap-2 p-2 hover:text-[var(--rose)] transition-colors">
              <User size={22} />
              <span className="text-sm font-medium">
                {isLoggedIn ? user?.name : 'Login'}
              </span>
            </Link>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:block border-t border-[var(--light-gray)]">
          <div className="flex items-center justify-center gap-8 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-[var(--rose)] ${
                  location.pathname === link.path ? 'text-[var(--rose)]' : 'text-[var(--charcoal)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 pr-10 bg-[var(--cream)] border border-[var(--light-gray)] rounded-full text-sm focus:outline-none focus:border-[var(--rose)]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--medium-gray)]">
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[var(--light-gray)] animate-slideDown">
          <nav className="container-custom py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-3 text-sm font-medium text-[var(--charcoal)] hover:bg-[var(--cream)] hover:text-[var(--rose)] rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-[var(--light-gray)] pt-3 mt-3">
              {isLoggedIn ? (
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-[var(--rose)] hover:bg-[var(--blush)] rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="block px-4 py-3 text-sm font-medium text-[var(--charcoal)] hover:bg-[var(--cream)] rounded-lg">
                  Login / Sign Up
                </Link>
              )}
              <Link to="/admin/login" className="block px-4 py-3 text-sm font-medium text-[var(--medium-gray)] hover:bg-[var(--cream)] rounded-lg">
                Admin Panel
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
