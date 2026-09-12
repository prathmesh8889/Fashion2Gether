import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Eye, Edit, Trash2, Plus, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout, products, orders, enquiries, storeInfo, updateStoreInfo, deleteProduct, updateOrderStatus, updateProduct } = useStore();
  const [tab, setTab] = useState('dashboard');

  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'enquiries', label: 'Enquiries', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r hidden lg:block">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--rose)] rounded-full flex items-center justify-center text-white text-xs font-bold">F</div>
            <span className="font-bold text-sm">F2G Admin</span>
          </Link>
        </div>
        <nav className="p-2 space-y-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-2 px-3 py-2.5 rounded text-sm font-medium transition-colors ${tab === t.id ? 'bg-[var(--rose)] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
          <button onClick={() => { logout(); }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded text-sm font-medium text-red-500 hover:bg-red-50 mt-4">
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-bold capitalize">{tab}</h1>
          <div className="flex items-center gap-3">
            <select value={tab} onChange={(e) => setTab(e.target.value)} className="lg:hidden border rounded px-2 py-1 text-sm">
              {tabs.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <Link to="/" className="text-xs text-[var(--rose)] hover:underline">View Store →</Link>
          </div>
        </div>

        <div className="p-6">
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Revenue', value: `₹${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, color: 'bg-green-500' },
                  { label: 'Orders', value: orders.length, color: 'bg-blue-500' },
                  { label: 'Products', value: products.length, color: 'bg-purple-500' },
                  { label: 'Enquiries', value: enquiries.length, color: 'bg-pink-500' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border">
                    <div className={`w-8 h-8 ${s.color} rounded flex items-center justify-center text-white text-xs font-bold mb-2`}>₹</div>
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-bold mb-3">Recent Orders</h3>
                {orders.length === 0 ? <p className="text-sm text-gray-500">No orders yet</p> : (
                  <div className="space-y-2">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                        <div>
                          <span className="font-medium">{o.customerName}</span>
                          <span className="text-gray-400 ml-2">{o.id}</span>
                        </div>
                        <span className="font-bold">₹{o.total}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'products' && (
            <div className="bg-white rounded-lg border overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Product</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Category</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Price</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Stock</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                        <span className="line-clamp-1">{p.name}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{p.category}</td>
                      <td className="px-4 py-3 font-medium">₹{p.price}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.inStock ? 'In Stock' : 'Out'}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => updateProduct(p.id, { inStock: !p.inStock })} className="text-gray-400 hover:text-blue-500"><Edit size={14} /></button>
                        <button onClick={() => { if (confirm('Delete?')) deleteProduct(p.id); }} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'orders' && (
            <div className="bg-white rounded-lg border overflow-x-auto">
              {orders.length === 0 ? <div className="p-8 text-center text-gray-500">No orders yet</div> : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Order</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Total</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td className="px-4 py-3 font-medium">{o.id}</td>
                        <td className="px-4 py-3">{o.customerName}<br /><span className="text-xs text-gray-400">{o.customerPhone}</span></td>
                        <td className="px-4 py-3 font-bold">₹{o.total}</td>
                        <td className="px-4 py-3">
                          <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value as any)} className="text-xs border rounded px-2 py-1">
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === 'enquiries' && (
            <div className="space-y-3">
              {enquiries.length === 0 ? <div className="bg-white rounded-lg border p-8 text-center text-gray-500">No enquiries yet</div> :
                enquiries.map(e => (
                  <div key={e.id} className={`bg-white rounded-lg border p-4 ${!e.read ? 'border-l-4 border-l-[var(--rose)]' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{e.name} <span className="text-xs text-gray-400">({e.phone})</span></p>
                        <p className="text-sm text-gray-600 mt-1">{e.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(e.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}

          {tab === 'settings' && (
            <div className="bg-white rounded-lg border p-6 max-w-xl space-y-4">
              <h3 className="font-bold">Store Information</h3>
              {Object.entries(storeInfo).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{key}</label>
                  <input type="text" value={value} onChange={(e) => updateStoreInfo({ [key]: e.target.value })} className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-[var(--rose)]" />
                </div>
              ))}
              <p className="text-xs text-green-600">✓ Changes saved automatically</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
