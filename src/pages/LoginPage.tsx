import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isLogin && !name.trim()) { setError('Please enter your name'); return; }
    if (!email.trim()) { setError('Please enter your email'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters'); return; }
    const success = login(email, password);
    if (success) navigate('/');
    else setError('Login failed. Please try again.');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md relative">
        <div className="bg-white rounded-3xl shadow-heavy p-8 md:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <img 
              src="https://raw.githubusercontent.com/prathmesh8889/Fashion2Gether/main/fashion2gether.jpeg" 
              alt="Fashion2gether Logo" 
              className="w-20 h-20 rounded-full object-cover border-3 border-pink-100 mx-auto mb-4 shadow-lg"
            />
            <h1 className="text-2xl font-bold font-playfair text-[#1a1a2e]">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
            <p className="text-gray-500 mt-1 text-sm flex items-center justify-center gap-1">
              <Sparkles size={14} className="text-pink-400" />
              {isLogin ? 'Login to your Fashion2gether account' : 'Join the Fashion2gether family'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all text-sm"
                />
              </div>
            )}

            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all text-sm"
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all text-sm"
                />
              </div>
            )}

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-pink-500 hover:underline font-medium">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-pink-500/20 transition-all hover:-translate-y-0.5 text-sm"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Toggle */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-pink-500 font-bold ml-1 hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Admin link */}
          <div className="mt-4 text-center">
            <Link to="/admin/login" className="text-xs text-purple-500 hover:underline font-medium">
              🛡️ Admin Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
