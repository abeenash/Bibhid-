import { createContext, useReducer, useContext, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

type CartAction =
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0
};

const calculateTotals = (items: CartItem[]) => {
    return {
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);
            let newItems: CartItem[];

            if (existingItem) {
                newItems = state.items.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...state.items, { product: action.payload, quantity: 1 }];
            }

            return { ...state, items: newItems, ...calculateTotals(newItems) };
        }

        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(item => item.product.id !== action.payload);
            return { ...state, items: newItems, ...calculateTotals(newItems) };
        }

        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                const newItems = state.items.filter(item => item.product.id !== action.payload.id);
                return { ...state, items: newItems, ...calculateTotals(newItems) };
            }

            const newItems = state.items.map(item =>
                item.product.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return { ...state, items: newItems, ...calculateTotals(newItems) };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

interface CartContextType extends CartState {
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};