import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const LOGO_URL = "https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg";

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters'); return; }
    if (login(email, password)) navigate('/');
    else setError('Login failed');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[var(--cream)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-[var(--light-gray)]">
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="Fashion2gether" className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-[var(--light-gray)]" />
          <h1 className="text-2xl font-playfair font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-sm text-[var(--medium-gray)] mt-1">{isLogin ? 'Login to your account' : 'Join Fashion2gether'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--medium-gray)]" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[var(--cream)] border border-[var(--light-gray)] rounded-lg text-sm focus:outline-none focus:border-[var(--rose)]" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--medium-gray)]" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 bg-[var(--cream)] border border-[var(--light-gray)] rounded-lg text-sm focus:outline-none focus:border-[var(--rose)]" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--medium-gray)]">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}
          <button type="submit" className="w-full py-3 bg-[var(--rose)] text-white rounded-lg font-semibold hover:bg-[var(--burgundy)] transition-colors">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-[var(--medium-gray)]">{isLogin ? "Don't have an account? " : 'Already have an account? '}</span>
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-[var(--rose)] font-medium hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
        <div className="mt-3 text-center">
          <Link to="/admin/login" className="text-xs text-[var(--medium-gray)] hover:text-[var(--rose)]">Admin Login →</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
