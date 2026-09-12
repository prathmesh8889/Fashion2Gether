import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { adminLogin } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields'); return; }
    const success = adminLogin(email, password);
    if (success) navigate('/admin');
    else setError('Invalid admin credentials. Try: admin@fashion2gether.com / admin123');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#1a1a2e]">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md relative">
        <div className="bg-white rounded-3xl shadow-heavy p-8 md:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <img 
              src="https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg" 
              alt="Fashion2gether Logo" 
              className="w-20 h-20 rounded-full object-cover border-3 border-purple-100 mx-auto mb-4 shadow-lg"
            />
            <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-3">
              <Shield size={14} className="text-purple-500" />
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Admin Access</span>
            </div>
            <h1 className="text-2xl font-bold font-playfair text-[#1a1a2e]">Admin Panel</h1>
            <p className="text-gray-500 mt-1 text-sm">Fashion2gether - Women's Exclusive Store</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all text-sm"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all text-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

            <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/20 transition-all hover:-translate-y-0.5 text-sm">
              Login as Admin
            </button>
          </form>

          <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-xs text-purple-600 text-center">
              <strong>Demo Credentials:</strong><br />
              Email: admin@fashion2gether.com<br />
              Password: admin123
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-xs text-gray-500 hover:text-pink-500 font-medium">
              ← Customer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
