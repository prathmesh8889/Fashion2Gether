import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const LOGO_URL = "https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg";

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
    if (!email.trim() || !password.trim()) { setError('Please fill all fields'); return; }
    if (adminLogin(email, password)) navigate('/admin');
    else setError('Invalid credentials. Demo: admin@fashion2gether.com / admin123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[var(--charcoal)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="Fashion2gether" className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-[var(--light-gray)]" />
          <div className="inline-flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full mb-2">
            <Shield size={12} className="text-purple-600" />
            <span className="text-[10px] font-bold text-purple-600 uppercase">Admin</span>
          </div>
          <h1 className="text-xl font-playfair font-bold">Admin Panel</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--medium-gray)]" />
            <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[var(--cream)] border border-[var(--light-gray)] rounded-lg text-sm focus:outline-none focus:border-purple-500" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--medium-gray)]" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 bg-[var(--cream)] border border-[var(--light-gray)] rounded-lg text-sm focus:outline-none focus:border-purple-500" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--medium-gray)]">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs bg-red-50 p-2 rounded">{error}</p>}
          <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">Login</button>
        </form>
        <div className="mt-4 p-3 bg-purple-50 rounded text-xs text-purple-600 text-center">
          Demo: admin@fashion2gether.com / admin123
        </div>
        <div className="mt-3 text-center"><Link to="/login" className="text-xs text-[var(--medium-gray)] hover:text-[var(--rose)]">← Customer Login</Link></div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
