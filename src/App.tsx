import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const Layout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminDashboard = location.pathname === '/admin';

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<LoginPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
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
