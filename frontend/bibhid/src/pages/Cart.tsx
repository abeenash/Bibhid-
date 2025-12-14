import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { useCart } from '../context/CardContext';
import { toast } from 'sonner';

const CartPage = () => {
    const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

    const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

    const handleRemove = (productId: string, productName: string) => {
        removeFromCart(productId);
        toast.success(`${productName} removed from cart`);
    };

    const shippingCost = totalPrice >= 2000 ? 0 : 150;
    const grandTotal = totalPrice + shippingCost;

    if (items.length === 0) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-3">Your cart is empty</h1>
                        <p className="text-muted-foreground mb-6">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Start Shopping
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                        Shopping Cart ({totalItems} items)
                    </h1>
                    <button
                        onClick={() => {
                            clearCart();
                            toast.success('Cart cleared');
                        }}
                        className="text-sm text-destructive hover:underline font-medium"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(({ product, quantity }) => (
                            <div
                                key={product.id}
                                className="card-elevated p-4 flex gap-4"
                            >
                                {/* Image */}
                                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                                    />
                                </Link>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                                        >
                                            {product.name}
                                        </Link>
                                        <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* Quantity */}
                                        <div className="flex items-center border border-border rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center font-medium">{quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            <p className="font-bold text-foreground">
                                                {formatPrice(product.price * quantity)}
                                            </p>
                                            {quantity > 1 && (
                                                <p className="text-sm text-muted-foreground">
                                                    {formatPrice(product.price)} each
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => handleRemove(product.id, product.name)}
                                    className="self-start p-2 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card-elevated p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className={shippingCost === 0 ? 'text-primary font-medium' : ''}>
                                        {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                                    </span>
                                </div>
                                {shippingCost > 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        Add {formatPrice(2000 - totalPrice)} more for free shipping
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-border pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold text-foreground">
                                    <span>Total</span>
                                    <span>{formatPrice(grandTotal)}</span>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Promo Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="input-field flex-1"
                                    />
                                    <button className="px-4 py-2 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Checkout */}
                            <button
                                className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                onClick={() => toast.info('Checkout feature coming soon!')}
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Continue Shopping */}
                            <Link
                                to="/products"
                                className="block text-center text-sm text-primary font-medium hover:underline mt-4"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CartPage;