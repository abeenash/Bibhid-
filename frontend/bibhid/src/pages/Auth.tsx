import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { toast } from 'sonner';

interface AuthFormProps {
    mode: 'login' | 'register';
}

const AuthForm = ({ mode }: AuthFormProps) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const isLogin = mode === 'login';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!isLogin && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setIsLoading(false);
            return;
        }

        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
        navigate('/');
        setIsLoading(false);
    };

    // const handleGoogleLogin = () => {
    //     toast.info('Google login coming soon!');
    // };

    return (
        <MainLayout showFooter={false}>
            <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="w-12 h-12 gradient-hero rounded-xl bg-violet-500 flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-2xl">B</span>
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isLogin
                                ? 'Enter your credentials to access your account'
                                : 'Sign up to start shopping with Bibhid'}
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="card-elevated p-8">
                        {/* Google Button */}
                        <button
                            type="button"
                            onClick={() => { window.location.href = "http://localhost:5000/auth/google" }}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-violet-500 hover:border-violet-500 transition-colors mb-6"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span className="font-medium text-foreground">Continue with Google</span>
                        </button>

                        {/* Divider */}
                        <div className="relative mb-6">
                            {/* <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div> */}
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-card text-muted-foreground">or continue with email</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input-field pl-12 w-full p-2 rounded"
                                        required
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field pl-12 w-full p-2 rounded"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input-field pl-12 pr-12 w-full p-2 rounded"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {!isLogin && (
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="input-field pl-12 pr-12 w-full p-2 rounded"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            )}

                            {isLogin && (
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                        <span className="text-muted-foreground">Remember me</span>
                                    </label>
                                    <a href="#" className="text-primary font-medium hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="loading loading-spinner loading-sm" />
                                        {isLogin ? 'Signing in...' : 'Creating account...'}
                                    </span>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                            <Link
                                to={isLogin ? '/register' : '/login'}
                                className="text-primary font-semibold hover:underline"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </Link>
                        </p>
                    </div>

                    {/* Terms */}
                    {!isLogin && (
                        <p className="text-center text-xs text-muted-foreground mt-6">
                            By creating an account, you agree to our{' '}
                            <a href="#" className="text-primary hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export const LoginPage = () => <AuthForm mode="login" />;
export const RegisterPage = () => <AuthForm mode="register" />;