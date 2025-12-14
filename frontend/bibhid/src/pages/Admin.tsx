import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    FolderTree,
    Users,
    ShoppingCart,
    Settings,
    BarChart3,
    Plus,
    Edit,
    Trash2,
    Search,
    Menu,
    X,
    TrendingUp,
    DollarSign,
    Eye
} from 'lucide-react';
import { products, categories as mockCategories } from '../data/mockData';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'categories', label: 'Categories', icon: FolderTree },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const stats = [
        { label: 'Total Revenue', value: 'Rs. 1,245,890', change: '+12.5%', icon: DollarSign },
        { label: 'Total Orders', value: '1,234', change: '+8.2%', icon: ShoppingCart },
        { label: 'Total Products', value: products.length.toString(), change: '+3', icon: Package },
        { label: 'Page Views', value: '45,678', change: '+15.3%', icon: Eye },
    ];

    const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

    return (
        <div className="min-h-screen bg-surface-sunken">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-foreground/50 z-40 lg:hidden bg-gray-950"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 gradient-hero rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">B</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">Admin</span>
                    </Link>
                    <button
                        className="lg:hidden p-1.5 hover:bg-muted rounded-lg"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === item.id
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Back to Store */}
                <div className="absolute bottom-4 left-4 right-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 w-full py-2.5 border border-border rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                        Back to Store
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    <button
                        className="lg:hidden p-2 hover:bg-muted rounded-lg"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <h1 className="text-xl font-bold text-foreground capitalize">{activeTab}</h1>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="input-field pl-10 pr-4 py-2 text-sm w-64"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                            A
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 lg:p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="card-elevated p-5 border rounded-md bg-slate-950 border-slate-950">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                                                <stat.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <span className="text-sm text-primary font-semibold flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                {stat.change}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Orders Table */}
                            <div className="card-elevated overflow-hidden">
                                <div className="p-4 border-b border-border flex items-center justify-between">
                                    <h2 className="font-semibold text-foreground">Recent Orders</h2>
                                    <button className="text-sm text-primary hover:underline">View All</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-950">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Product</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {[
                                                { id: '#ORD-001', customer: 'Ram Sharma', product: 'Wireless Headphones', amount: 12999, status: 'Delivered' },
                                                { id: '#ORD-002', customer: 'Sita Thapa', product: 'Smart Watch Pro', amount: 24999, status: 'Processing' },
                                                { id: '#ORD-003', customer: 'Hari Gurung', product: 'Leather Bag', amount: 4599, status: 'Shipped' },
                                                { id: '#ORD-004', customer: 'Maya KC', product: 'Running Shoes', amount: 8999, status: 'Pending' },
                                            ].map((order) => (
                                                <tr key={order.id} className="hover:bg-slate-950">
                                                    <td className="px-4 py-3 text-sm font-medium text-foreground">{order.id}</td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">{order.customer}</td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">{order.product}</td>
                                                    <td className="px-4 py-3 text-sm font-medium text-foreground">{formatPrice(order.amount)}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-primary/10 text-primary' :
                                                            order.status === 'Shipped' ? 'bg-secondary/20 text-secondary-foreground' :
                                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                                    'bg-slate-950 text-slate-50'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="relative flex-1 max-w-md">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="input-field pl-10 w-full"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                                    <Plus className="w-5 h-5" />
                                    Add Product
                                </button>
                            </div>

                            <div className="card-elevated overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-muted">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Product</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {products.map((product) => (
                                                <tr key={product.id} className="hover:bg-muted/50">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                            />
                                                            <div>
                                                                <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                                                                <p className="text-sm text-muted-foreground">{product.brand}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">{product.category}</td>
                                                    <td className="px-4 py-3 text-sm font-medium text-foreground">{formatPrice(product.price)}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.inStock ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                                                            }`}>
                                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-1.5 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Categories Tab */}
                    {activeTab === 'categories' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-foreground">Manage Categories</h2>
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                                    <Plus className="w-5 h-5" />
                                    Add Category
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {mockCategories.map((category) => (
                                    <div key={category.id} className="card-elevated p-4 flex items-center gap-4">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-foreground">{category.name}</h3>
                                            <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Other tabs placeholder */}
                    {!['overview', 'products', 'categories'].includes(activeTab) && (
                        <div className="card-elevated p-12 text-center">
                            <p className="text-muted-foreground">
                                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon...
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;