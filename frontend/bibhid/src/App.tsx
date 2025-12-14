import './styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CardContext';
import Index from "./pages/Index"
import { LoginPage, RegisterPage } from './pages/Auth';
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import AdminDashboard from './pages/Admin';
import ProtectedAdminRoute from './routes/protected/ProtectedAdminRoute';
import AuthSuccess from './pages/AuthSuccess';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/auth/success" element={<AuthSuccess />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
