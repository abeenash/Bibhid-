import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, Truck, Shield, RefreshCw } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        shop: [
            { name: 'All Products', href: '/products' },
            { name: 'Electronics', href: '/products?category=electronics' },
            { name: 'Fashion', href: '/products?category=fashion' },
            { name: 'Home & Living', href: '/products?category=home-living' },
            { name: 'New Arrivals', href: '/products?new=true' },
        ],
        support: [
            { name: 'Help Center', href: '#' },
            { name: 'Track Order', href: '#' },
            { name: 'Shipping Info', href: '#' },
            { name: 'Returns & Refunds', href: '#' },
            { name: 'Contact Us', href: '#' },
        ],
        company: [
            { name: 'About Bibhid', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Press', href: '#' },
            { name: 'Affiliate Program', href: '#' },
            { name: 'Sell on Bibhid', href: '#' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
        ],
    };

    const features = [
        { icon: Truck, title: 'Free Delivery', desc: 'On orders over Rs. 2,000' },
        { icon: RefreshCw, title: 'Easy Returns', desc: '7-day return policy' },
        { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
        { icon: CreditCard, title: 'Multiple Payment', desc: 'Cards, wallets & COD' },
    ];

    return (
        <footer className="bg-foreground text-primary-foreground mt-16">
            {/* Features Bar */}
            <div className="border-b border-muted-foreground/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center bg-violet-500">
                                <span className="text-primary-foreground font-bold text-xl">B</span>
                            </div>
                            <span className="text-2xl font-bold">Bibhid</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            Your premium destination for varieties of quality products. Shop with confidence.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-primary transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                support@bibhid.com
                            </li>
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                +977 1-4XXXXXX
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                Kathmandu, Nepal
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-muted-foreground/20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Bibhid. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            {footerLinks.legal.map((link) => (
                                <Link key={link.name} to={link.href} className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;