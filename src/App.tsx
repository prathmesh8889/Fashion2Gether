import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import WishlistPage from './pages/WishlistPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';

const Layout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminDashboard = location.pathname === '/admin';

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={isAdminDashboard ? '' : 'min-h-screen'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const OrdersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold font-playfair mb-6">My Orders</h1>
      <div className="bg-white rounded-xl border p-8 text-center">
        <p className="text-5xl mb-4">📦</p>
        <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Your order history will appear here once you place an order</p>
        <a href="/products" className="inline-block px-6 py-2.5 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600">
          Start Shopping
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <Router>
        <Layout />
      </Router>
    </StoreProvider>
  );
}

export default App;
