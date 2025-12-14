import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CardContext';
import { toast } from 'sonner';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} added to cart`);
    };

    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString()}`;
    };

    return (
        <Link to={`/product/${product.id}`} className="group">
            <div className="card-product relative">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.discount && (
                            <span className="badge-sale border rounded-md p-1 bg-red-500 border-red-500 text-xs font-bold" >-{product.discount}%</span>
                        )}
                        {product.isNew && (
                            <span className="badge-new border rounded-md p-1 bg-yellow-500 border-yellow-500 text-gray-950 font-bold text-xs">NEW</span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            className="w-9 h-9 rounded-full bg-card shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Add to Cart Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Brand */}
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {product.brand}
                    </p>

                    {/* Name */}
                    <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-violet-500 text-violet-500" />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {!product.inStock && (
                        <p className="text-sm text-destructive mt-2 font-medium">Out of Stock</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;