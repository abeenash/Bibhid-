import { Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Flash Sale */}
                    <Link
                        to="/products?sale=true"
                        className="group relative bg-red-400 overflow-hidden rounded-xl p-6 gradient-hero text-primary-foreground"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5" />
                                <span className="font-semibold uppercase tracking-wide text-sm">Flash Sale</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Up to 70% Off</h3>
                            <p className="text-primary-foreground/80 text-sm">Limited time offers</p>
                        </div>
                        <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full bg-secondary/20 group-hover:scale-150 transition-transform duration-500" />
                    </Link>

                    {/* New Arrivals */}
                    <Link
                        to="/products?new=true"
                        className="group relative bg-violet-500 overflow-hidden rounded-xl p-6 bg-secondary text-secondary-foreground"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5" />
                                <span className="font-semibold uppercase tracking-wide text-sm">Just In</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">New Arrivals</h3>
                            <p className="text-secondary-foreground/80 text-sm">Fresh picks for you</p>
                        </div>
                        <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full bg-foreground/20 group-hover:scale-150 transition-transform duration-500" />
                    </Link>

                    {/* Trending */}
                    <Link
                        to="/products?trending=true"
                        className="group relative bg-amber-500 overflow-hidden rounded-xl p-6 bg-foreground text-primary-foreground"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5" />
                                <span className="font-semibold uppercase tracking-wide text-sm">Trending</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">Best Sellers</h3>
                            <p className="text-primary-foreground/80 text-sm">What everyone loves</p>
                        </div>
                        <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full bg-primary/20 group-hover:scale-150 transition-transform duration-500" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;