import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, LogOut, UserCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CardContext';
import { handleLogout as authLogout } from '../../utils/auth.utils';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    // we need to fetch user on component mount and route changes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:5000/auth/me", {
                    credentials: "include",
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // if not authenticated, clear user state
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            } finally {
                setIsLoadingUser(false);
            }
        };
        fetchUser();
    }, [location]); // Re-fetch when location changes

    // Logout handler
    const handleLogout = async () => {
        const success = await authLogout();
        if (success) {
            setUser(null);
            setIsUserMenuOpen(false);
            navigate("/");
        }
    };

    const categories = [
        { name: 'Electronics', href: '/products?category=electronics' },
        { name: 'Fashion', href: '/products?category=fashion' },
        { name: 'Home & Living', href: '/products?category=home-living' },
        { name: 'Beauty', href: '/products?category=beauty' },
        { name: 'Sports', href: '/products?category=sports' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md">

            {/* Top Bar */}
            <div className="bg-primary bg-violet-500 text-primary-foreground py-1.5 text-center text-sm">
                <span className="font-medium">Free Shipping on orders above Rs. 2,000</span>
                <span className="mx-2">|</span>
                <span>Use code <span className="font-bold">BIBHID10</span> for 10% off</span>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center bg-violet-500 rounded-full">
                            <span className="text-primary-foreground font-bold text-xl">B</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground hidden sm:block">
                            Bibhid
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className={`hidden md:flex flex-1 w-xl p-2 mx-8 relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                        <input
                            type="text"
                            placeholder="Search for products, brands and more..."
                            className="input-field pl-10 w-full"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Search Icon - Mobile */}
                        <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
                            <Search className="w-5 h-5 text-foreground" />
                        </button>

                        {/* User Profile / Login */}
                        {!isLoadingUser && user && location.pathname !== '/login' && location.pathname !== '/register' ? (
                            // Authenticated - Show user dropdown (hidden on auth pages)
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden lg:block text-sm font-medium text-foreground">
                                        {user?.name}
                                    </span>
                                    <ChevronDown className="hidden lg:block w-4 h-4" />
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-gray-950 border border-border rounded-lg shadow-lg py-2 z-50">
                                        <div className="px-4 py-2 border-b border-border">
                                            <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors hover:bg-violet-500"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <UserCircle className="w-4 h-4" />
                                            <span className="text-sm">My Profile</span>
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors hover:bg-violet-500"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <Menu className="w-4 h-4" />
                                                <span className="text-sm">Admin Dashboard</span>
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-500/10 text-red-600 transition-colors hover:bg-red-500"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="text-sm">Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Not authenticated - Show login button
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <User className="w-5 h-5 text-foreground" />
                                <span className="hidden lg:block text-sm font-medium text-foreground">Login</span>
                            </Link>
                        )}

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5 text-foreground" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary bg-violet-500 text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                            <span className="hidden lg:block text-sm font-medium text-foreground">Cart</span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5 text-foreground" />
                            ) : (
                                <Menu className="w-5 h-5 text-foreground" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Categories Bar - Desktop */}
                <div className="hidden md:flex items-center gap-6 pb-3 overflow-x-auto">
                    <Link
                        to="/products"
                        className="flex items-center gap-1 nav-link whitespace-nowrap group"
                    >
                        <Menu className="w-4 h-4" />
                        <span>All Categories</span>
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            to={cat.href}
                            className="nav-link whitespace-nowrap hover:text-primary transition-colors"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-card border-t border-border animate-fade-in">
                    {/* Mobile Search */}
                    <div className="p-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="input-field pl-12 p-1 w-full"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Mobile Categories */}
                    <div className="border-t border-border">
                        <Link
                            to="/products"
                            className="block px-4 py-3 hover:bg-slate-950 transition-colors font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            All Products
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.name}
                                to={cat.href}
                                className="block px-4 py-3 hover:bg-slate-950 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;