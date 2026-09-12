import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products as initialProducts } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface OrderRequest {
  id: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  notes?: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Auth
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  adminLogin: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  
  // Products (admin managed)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  
  // Orders
  orders: OrderRequest[];
  addOrder: (order: Omit<OrderRequest, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, status: OrderRequest['status']) => void;
  
  // Enquiries
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'read'>) => void;
  markEnquiryRead: (id: string) => void;
  
  // Store Info
  storeInfo: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    hours: string;
    instagram: string;
  };
  updateStoreInfo: (info: Partial<StoreContextType['storeInfo']>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Helper for localStorage
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage('f2g_cart', []));
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadFromStorage('f2g_loggedIn', false));
  const [isAdmin, setIsAdmin] = useState(() => loadFromStorage('f2g_isAdmin', false));
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => loadFromStorage('f2g_user', null));
  const [wishlist, setWishlist] = useState<number[]>(() => loadFromStorage('f2g_wishlist', []));
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage('f2g_products', initialProducts));
  const [orders, setOrders] = useState<OrderRequest[]>(() => loadFromStorage('f2g_orders', []));
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => loadFromStorage('f2g_enquiries', []));
  const [storeInfo, setStoreInfo] = useState(() => loadFromStorage('f2g_storeInfo', {
    name: "Fashion2gether",
    phone: "+91 95955 35339",
    whatsapp: "919595535339",
    email: "info@fashion2gether.com",
    address: "Near Veer Vamanrao Chowk, Behind Jay Ambe Tel Bandar, Tilakwadi, Yavatmal, Maharashtra 445002",
    hours: "10:00 AM - 9:30 PM (All Days)",
    instagram: "https://www.instagram.com/fashion2gether_/"
  }));

  // Persist to localStorage
  useEffect(() => { saveToStorage('f2g_cart', cart); }, [cart]);
  useEffect(() => { saveToStorage('f2g_loggedIn', isLoggedIn); }, [isLoggedIn]);
  useEffect(() => { saveToStorage('f2g_isAdmin', isAdmin); }, [isAdmin]);
  useEffect(() => { saveToStorage('f2g_user', user); }, [user]);
  useEffect(() => { saveToStorage('f2g_wishlist', wishlist); }, [wishlist]);
  useEffect(() => { saveToStorage('f2g_products', products); }, [products]);
  useEffect(() => { saveToStorage('f2g_orders', orders); }, [orders]);
  useEffect(() => { saveToStorage('f2g_enquiries', enquiries); }, [enquiries]);
  useEffect(() => { saveToStorage('f2g_storeInfo', storeInfo); }, [storeInfo]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size, color }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const login = (email: string, password: string): boolean => {
    if (email && password.length >= 4) {
      setIsLoggedIn(true);
      setIsAdmin(false);
      const userData = { name: email.split('@')[0], email };
      setUser(userData);
      return true;
    }
    return false;
  };

  const adminLogin = (email: string, password: string): boolean => {
    // NOTE: In production, this must be validated server-side.
    // This is a frontend-only demo. Real auth requires a backend.
    if (email === 'admin@fashion2gether.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUser({ name: 'Admin', email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    setProducts(prev => [...prev, { ...product, id: newId }]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (order: Omit<OrderRequest, 'id' | 'date' | 'status'>) => {
    const newOrder: OrderRequest = {
      ...order,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: OrderRequest['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addEnquiry = (enquiry: Omit<Enquiry, 'id' | 'date' | 'read'>) => {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `ENQ-${Date.now()}`,
      date: new Date().toISOString(),
      read: false
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
  };

  const markEnquiryRead = (id: string) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
  };

  const updateStoreInfo = (info: Partial<StoreContextType['storeInfo']>) => {
    setStoreInfo(prev => ({ ...prev, ...info }));
  };

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
      isLoggedIn, isAdmin, user, login, adminLogin, logout,
      wishlist, toggleWishlist,
      products, addProduct, updateProduct, deleteProduct,
      orders, addOrder, updateOrderStatus,
      enquiries, addEnquiry, markEnquiryRead,
      storeInfo, updateStoreInfo
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
