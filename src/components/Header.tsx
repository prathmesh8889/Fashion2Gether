import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cartCount, isLoggedIn, isAdmin, user, logout, wishlist } = useStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-center py-1.5 text-sm font-medium">
        ✨ Free Shipping on orders above ₹999 | Use code FASHION50 for extra 10% OFF ✨
      </div>
      
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src="https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg" 
              alt="Fashion2gether Logo" 
              className="w-12 h-12 rounded-full object-cover border-2 border-pink-200"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text font-playfair">Fashion2gether</h1>
              <p className="text-[10px] text-gray-500 -mt-1">Exclusive Women's Fashion</p>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for kurtis, sarees, dresses, tops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
              >
                <User size={22} />
                <span className="hidden lg:inline text-sm font-medium">
                  {isLoggedIn ? user?.name : 'Login'}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link to="/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm" onClick={() => setUserMenuOpen(false)}>
                        <ShoppingBag size={16} /> My Orders
                      </Link>
                      <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm" onClick={() => setUserMenuOpen(false)}>
                        <Heart size={16} /> Wishlist ({wishlist.length})
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-purple-600" onClick={() => setUserMenuOpen(false)}>
                          <Shield size={16} /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm w-full text-left text-red-500"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm" onClick={() => setUserMenuOpen(false)}>
                        <User size={16} /> Customer Login
                      </Link>
                      <Link to="/admin/login" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-purple-600" onClick={() => setUserMenuOpen(false)}>
                        <Shield size={16} /> Admin Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-gray-700 hover:text-pink-500 transition-colors">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-pink-500 transition-colors">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pr-10 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500">
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-100 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8 py-3">
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors">
              ALL WOMEN'S WEAR
            </Link>
            <Link to="/products?category=Western+Wear" className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors">
              WESTERN WEAR
            </Link>
            <Link to="/products?category=Ethnic+Wear" className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors">
              ETHNIC WEAR
            </Link>
            <Link to="/products?category=Bottom+Wear" className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors">
              BOTTOMS & LEGGINGS
            </Link>
            <Link to="/products?filter=new" className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors">
              NEW ARRIVALS
            </Link>
            <Link to="/products?filter=trending" className="text-sm font-medium text-pink-500 transition-colors">
              🔥 TRENDING
            </Link>
            <Link to="/products?filter=sale" className="text-sm font-medium text-green-600 transition-colors">
              💰 SALE
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t animate-slideIn">
          <div className="px-4 py-4 space-y-3">
            <Link to="/products" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>All Women's Wear</Link>
            <Link to="/products?category=Western+Wear" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Western Wear</Link>
            <Link to="/products?category=Ethnic+Wear" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Ethnic Wear</Link>
            <Link to="/products?category=Bottom+Wear" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Bottoms & Leggings</Link>
            <Link to="/products?filter=new" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
            <Link to="/products?filter=trending" className="block py-2 text-sm font-medium text-pink-500" onClick={() => setMobileMenuOpen(false)}>🔥 Trending</Link>
            <Link to="/products?filter=sale" className="block py-2 text-sm font-medium text-green-600" onClick={() => setMobileMenuOpen(false)}>💰 Sale</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
