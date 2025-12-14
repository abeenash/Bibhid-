import MainLayout from '../components/layout/MainLayout'
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductCarousel from '../components/home/ProductCarousel';
import PromoBanner from '../components/home/PromoBanner';
import { products } from '../data/mockData';

const Index = () => {
    const featuredProducts = products.filter(p => p.isFeatured);
    const newProducts = products.filter(p => p.isNew);
    const discountedProducts = products.filter(p => p.discount);

    return (
        <MainLayout>
            {/* Hero Banner */}
            <HeroBanner />

            {/* Promo Banner */}
            <PromoBanner />

            {/* Categories */}
            <CategoryGrid />

            {/* Featured Products */}
            <ProductCarousel
                title="Featured Products"
                products={featuredProducts.length > 0 ? featuredProducts : products}
                viewAllLink="/products?featured=true"
            />

            {/* Special Offers Section */}
            <section className="py-10 gradient-hero">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-primary-foreground text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                Special Offer This Week
                            </h2>
                            <p className="text-primary-foreground/80 text-lg mb-4">
                                Get exclusive deals on premium products. Limited stock available!
                            </p>
                            <a
                                href="/products?sale=true"
                                className="inline-block px-8 py-3 bg-violet-500 bg-secondary text-secondary-foreground font-bold rounded-lg shadow-gold hover:scale-105 transition-transform"
                            >
                                Shop Deals
                            </a>
                        </div>
                        <div className="flex gap-4">
                            {['Days', 'Hours', 'Mins', 'Secs'].map((label, i) => (
                                <div
                                    key={label}
                                    className="w-20 h-20 bg-primary-foreground/10 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center"
                                >
                                    <span className="text-2xl font-bold text-primary-foreground">
                                        {[3, 12, 45, 22][i]}
                                    </span>
                                    <span className="text-xs text-primary-foreground/70">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <ProductCarousel
                title="New Arrivals"
                products={newProducts.length > 0 ? newProducts : products}
                viewAllLink="/products?new=true"
            />

            {/* Best Deals */}
            <div className="bg-surface-sunken">
                <ProductCarousel
                    title="Best Deals"
                    products={discountedProducts.length > 0 ? discountedProducts : products}
                    viewAllLink="/products?sale=true"
                />
            </div>

            {/* Newsletter */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="section-title mb-4">Subscribe to Our Newsletter</h2>
                        <p className="text-muted-foreground mb-6">
                            Get the latest updates on new products and exclusive offers
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input-field flex-1 pl-2"
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Index;