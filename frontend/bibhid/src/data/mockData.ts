import type { Product, Category } from '../types';

export const categories: Category[] = [
    {
        id: '1',
        name: 'Electronics',
        slug: 'electronics',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
        productCount: 245
    },
    {
        id: '2',
        name: 'Fashion',
        slug: 'fashion',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
        productCount: 512
    },
    {
        id: '3',
        name: 'Home & Living',
        slug: 'home-living',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        productCount: 189
    },
    {
        id: '4',
        name: 'Beauty',
        slug: 'beauty',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
        productCount: 156
    },
    {
        id: '5',
        name: 'Sports',
        slug: 'sports',
        image: 'https://images.unsplash.com/photo-1461896836934- voices-3c90b7e7&w=400&h=300&fit=crop',
        productCount: 98
    },
    {
        id: '6',
        name: 'Books',
        slug: 'books',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
        productCount: 324
    }
];

export const products: Product[] = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 12999,
        originalPrice: 18999,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
        ],
        category: 'Electronics',
        brand: 'SoundMax',
        rating: 4.8,
        reviews: 234,
        description: 'Experience premium audio with our flagship wireless headphones. Featuring active noise cancellation, 40-hour battery life, and premium comfort.',
        inStock: true,
        isFeatured: true,
        discount: 32
    },
    {
        id: '2',
        name: 'Smart Watch Pro',
        price: 24999,
        originalPrice: 29999,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        category: 'Electronics',
        brand: 'TechFit',
        rating: 4.6,
        reviews: 189,
        description: 'Stay connected with the Smart Watch Pro. Track your fitness, receive notifications, and control your smart home.',
        inStock: true,
        isNew: true,
        discount: 17
    },
    {
        id: '3',
        name: 'Leather Crossbody Bag',
        price: 4599,
        originalPrice: 5999,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
        category: 'Fashion',
        brand: 'UrbanStyle',
        rating: 4.9,
        reviews: 412,
        description: 'Handcrafted genuine leather crossbody bag with adjustable strap and multiple compartments.',
        inStock: true,
        isFeatured: true,
        discount: 23
    },
    {
        id: '4',
        name: 'Minimalist Desk Lamp',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
        category: 'Home & Living',
        brand: 'LightCraft',
        rating: 4.5,
        reviews: 87,
        description: 'Modern LED desk lamp with touch controls and adjustable color temperature.',
        inStock: true,
        isNew: true
    },
    {
        id: '5',
        name: 'Organic Skincare Set',
        price: 3499,
        originalPrice: 4499,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
        category: 'Beauty',
        brand: 'NaturGlow',
        rating: 4.7,
        reviews: 156,
        description: 'Complete skincare routine with organic ingredients. Includes cleanser, toner, and moisturizer.',
        inStock: true,
        isFeatured: true,
        discount: 22
    },
    {
        id: '6',
        name: 'Running Shoes Elite',
        price: 8999,
        originalPrice: 11999,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        category: 'Sports',
        brand: 'SpeedRun',
        rating: 4.8,
        reviews: 298,
        description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
        inStock: true,
        discount: 25
    },
    {
        id: '7',
        name: 'Bluetooth Speaker Mini',
        price: 1999,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
        category: 'Electronics',
        brand: 'SoundMax',
        rating: 4.4,
        reviews: 567,
        description: 'Portable Bluetooth speaker with 360° sound and 12-hour battery life.',
        inStock: true,
        isNew: true
    },
    {
        id: '8',
        name: 'Cotton Linen Blend Shirt',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop',
        category: 'Fashion',
        brand: 'UrbanStyle',
        rating: 4.6,
        reviews: 123,
        description: 'Breathable cotton-linen blend shirt perfect for casual and semi-formal occasions.',
        inStock: true,
        isFeatured: true
    }
];

export const brands = ['SoundMax', 'TechFit', 'UrbanStyle', 'LightCraft', 'NaturGlow', 'SpeedRun'];