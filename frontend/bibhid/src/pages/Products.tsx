import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, ChevronDown, X } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import ProductCard from '../components/product/ProductCard';
import { products, categories, brands } from '../data/mockData';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popular');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

    const categoryParam = searchParams.get('category');

    // Filter logic
    const filteredProducts = products.filter(product => {
        if (categoryParam && product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') !== categoryParam) {
            return false;
        }
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
        }
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
            return false;
        }
        return true;
    });

    // Sort logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            default:
                return b.reviews - a.reviews;
        }
    });

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, 50000]);
    };

    const activeFiltersCount = selectedCategories.length + selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-1">
                            {categoryParam ? categories.find(c => c.slug === categoryParam)?.name || 'Products' : 'All Products'}
                        </h1>
                        <p className="text-muted-foreground">
                            {sortedProducts.length} products found
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Filter Toggle (Mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                            {activeFiltersCount > 0 && (
                                <span className="w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="popular" className="bg-gray-950 hover:bg-violet-500">Most Popular</option>
                                <option value="newest" className="bg-gray-950 hover:bg-violet-500">Newest First</option>
                                <option value="price-low" className="bg-gray-950 hover:bg-violet-500">Price: Low to High</option>
                                <option value="price-high" className="bg-gray-950 hover:bg-violet-500">Price: High to Low</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
                        </div>

                        {/* View Toggle */}
                        <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`
            fixed lg:static inset-0 z-50 lg:z-0 bg-background lg:bg-transparent
            ${showFilters ? 'block' : 'hidden lg:block'}
            lg:w-64 lg:flex-shrink-0
          `}>
                        <div className="h-full lg:h-auto overflow-y-auto p-6 lg:p-0 bg-gray-950">
                            {/* Mobile Header */}
                            <div className="flex items-center justify-between mb-6 lg:hidden">
                                <h2 className="text-xl font-bold">Filters</h2>
                                <button onClick={() => setShowFilters(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Clear Filters */}
                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={clearFilters}
                                    className="w-full mb-6 py-2 text-sm text-destructive border border-destructive rounded-lg hover:bg-red-700 hover:border-red-700 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat.name)}
                                                onChange={() => toggleCategory(cat.name)}
                                                className="checkbox checkbox-sm checkbox-primary"
                                            />
                                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                                {cat.name} ({cat.productCount})
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-foreground mb-3">Brands</h3>
                                <div className="space-y-2">
                                    {brands.map(brand => (
                                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                                className="checkbox checkbox-sm checkbox-primary"
                                            />
                                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                                {brand}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        placeholder="Min"
                                        className="input-field text-sm py-2 w-full p-2"
                                    />
                                    <span className="text-muted-foreground">-</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        placeholder="Max"
                                        className="input-field text-sm py-2 w-full p-2"
                                    />
                                </div>
                            </div>

                            {/* Apply Button (Mobile) */}
                            <button
                                onClick={() => setShowFilters(false)}
                                className="lg:hidden w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {sortedProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-xl text-muted-foreground mb-4">No products found</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className={`grid gap-4 ${viewMode === 'grid'
                                ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1'
                                }`}>
                                {sortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {sortedProducts.length > 0 && (
                            <div className="flex justify-center mt-12">
                                <div className="join">
                                    <button className="join-item btn btn-sm">«</button>
                                    <button className="join-item btn btn-sm btn-active bg-primary text-primary-foreground">1</button>
                                    <button className="join-item btn btn-sm">2</button>
                                    <button className="join-item btn btn-sm">3</button>
                                    <button className="join-item btn btn-sm">»</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProductsPage;