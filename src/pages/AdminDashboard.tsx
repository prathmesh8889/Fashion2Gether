import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, TrendingUp, 
  DollarSign, Eye, Edit, Trash2, Plus, BarChart3, Settings, LogOut
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const stats = [
    { label: 'Total Revenue', value: '₹2,45,000', icon: DollarSign, color: 'bg-green-500', change: '+12%' },
    { label: 'Total Orders', value: '1,234', icon: ShoppingCart, color: 'bg-blue-500', change: '+8%' },
    { label: 'Total Products', value: products.length.toString(), icon: Package, color: 'bg-purple-500', change: '+3' },
    { label: 'Total Customers', value: '5,678', icon: Users, color: 'bg-pink-500', change: '+15%' },
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'Priya Sharma', amount: '₹1,299', status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD002', customer: 'Anita Patil', amount: '₹799', status: 'Shipped', date: '2024-01-15' },
    { id: '#ORD003', customer: 'Sneha Deshmukh', amount: '₹2,499', status: 'Processing', date: '2024-01-14' },
    { id: '#ORD004', customer: 'Kavita Joshi', amount: '₹599', status: 'Delivered', date: '2024-01-14' },
    { id: '#ORD005', customer: 'Meera Kulkarni', amount: '₹1,899', status: 'Pending', date: '2024-01-13' },
    { id: '#ORD006', customer: 'Pooja Tuptewar', amount: '₹1,499', status: 'Delivered', date: '2024-01-13' },
    { id: '#ORD007', customer: 'Bhoomika Lunawat', amount: '₹899', status: 'Shipped', date: '2024-01-12' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden lg:block">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div>
              <h2 className="font-bold text-sm">Fashion2gether</h2>
              <p className="text-[10px] text-gray-500">Women's Store Admin</p>
            </div>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { logout(); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin! | Women's Exclusive Store</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile nav */}
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="lg:hidden border rounded-lg px-3 py-2 text-sm"
            >
              {sidebarItems.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
            <Link to="/" className="text-sm text-purple-500 hover:underline">
              View Store →
            </Link>
          </div>
        </div>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon size={20} className="text-white" />
                      </div>
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold mt-3">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-5 border-b flex items-center justify-between">
                  <h3 className="font-bold">Recent Orders</h3>
                  <button className="text-sm text-purple-500 hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentOrders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-5 py-3 text-sm font-medium">{order.id}</td>
                          <td className="px-5 py-3 text-sm">{order.customer}</td>
                          <td className="px-5 py-3 text-sm font-medium">{order.amount}</td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-500">{order.date}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button className="text-gray-400 hover:text-blue-500"><Eye size={16} /></button>
                              <button className="text-gray-400 hover:text-green-500"><Edit size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Stats Chart Placeholder */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border shadow-sm p-5">
                  <h3 className="font-bold mb-4">Sales Overview</h3>
                  <div className="space-y-3">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                      const width = [60, 80, 45, 90, 70, 95, 55][i];
                      return (
                        <div key={day} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-8">{day}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-4">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-12 text-right">₹{(width * 50).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-5">
                  <h3 className="font-bold mb-4">Top Categories</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Kurtis & Suits', percent: 35, color: 'bg-pink-500' },
                      { name: 'Western Dresses', percent: 25, color: 'bg-purple-500' },
                      { name: 'Sarees', percent: 20, color: 'bg-blue-500' },
                      { name: 'Tops & Jeans', percent: 12, color: 'bg-green-500' },
                      { name: 'Accessories', percent: 8, color: 'bg-orange-500' },
                    ].map(cat => (
                      <div key={cat.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cat.name}</span>
                          <span className="font-medium">{cat.percent}%</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2">
                          <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">{products.length} products</p>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600">
                  <Plus size={16} /> Add Product
                </button>
              </div>
              <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="text-sm font-medium line-clamp-1">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-600">{product.category}</td>
                        <td className="px-5 py-3 text-sm font-medium">₹{product.price}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-sm">⭐ {product.rating}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button className="text-gray-400 hover:text-blue-500"><Eye size={16} /></button>
                            <button className="text-gray-400 hover:text-green-500"><Edit size={16} /></button>
                            <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm">All Orders</button>
                <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50">Pending</button>
                <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50">Shipped</button>
                <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50">Delivered</button>
              </div>
              <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 text-sm font-medium">{order.id}</td>
                        <td className="px-5 py-3 text-sm">{order.customer}</td>
                        <td className="px-5 py-3 text-sm font-medium">{order.amount}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-bold mb-4">Customer Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Priya Sharma', 'Anita Patil', 'Sneha Deshmukh', 'Kavita Joshi', 'Meera Kulkarni', 'Sunita Rao', 'Pooja Tuptewar', 'Bhoomika Lunawat', 'Ritu Deshpande'].map((name, i) => (
                  <div key={i} className="border rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{name}</p>
                      <p className="text-xs text-gray-500">{3 + i} orders • Member since 2023</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border shadow-sm p-5">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-green-500" /> Revenue Trend</h3>
                  <div className="flex items-end gap-2 h-40">
                    {[40, 65, 50, 80, 60, 90, 75, 85, 70, 95, 80, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-pink-500 to-purple-400 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Jan</span><span>Jun</span><span>Dec</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-5">
                  <h3 className="font-bold mb-4">Customer Growth</h3>
                  <div className="space-y-3">
                    {[
                      { month: 'October', count: 420 },
                      { month: 'November', count: 580 },
                      { month: 'December', count: 750 },
                      { month: 'January', count: 1020 },
                    ].map(item => (
                      <div key={item.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">{item.month}</span>
                        <span className="font-bold text-purple-600">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl border shadow-sm p-6 max-w-2xl">
              <h3 className="font-bold mb-6">Store Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Store Name</label>
                  <input type="text" defaultValue="Fashion2gether - Women's Exclusive" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input type="text" defaultValue="+91 95955 35339" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Store Address</label>
                  <textarea defaultValue="Near Veer Vamanrao Chowk, Tilakwadi, Yavatmal, Maharashtra 445002" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Operating Hours</label>
                  <input type="text" defaultValue="10:00 AM - 9:30 PM (All Days)" className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                </div>
                <button className="px-6 py-2.5 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
