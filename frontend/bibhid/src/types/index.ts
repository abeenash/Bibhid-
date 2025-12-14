export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    description: string;
    inStock: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    discount?: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    productCount: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'customer' | 'admin';
}

export interface FilterState {
    categories: string[];
    priceRange: [number, number];
    brands: string[];
    rating: number | null;
    sortBy: 'newest' | 'price-low' | 'price-high' | 'popular';
}