'use client';

import { useState } from 'react';
import { Mail, Lock, User, Github, MessageCircle } from 'lucide-react';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState<boolean | undefined>(undefined);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950">
            <div className="w-full max-w-md">
                {/* Logo & Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/50">
                        <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ChatFlow
                    </h1>
                    <p className="text-slate-400 mt-2">
                        {isLogin ? 'Welcome back! Sign in to continue' : 'Create your account to get started'}
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm p-8">
                    {/* Social Login Buttons */}
                    <div className="space-y-3 mb-6">
                        <button
                            type="button"
                            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800 transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                        <button
                            type="button"
                            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800 transition-all"
                        >
                            <Github className="w-5 h-5" />
                            Continue with GitHub
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900/50 px-4 text-slate-500 font-medium">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Login Form */}
                    {isLogin ? (
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="login-email" className="text-sm font-medium text-slate-200">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="login-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="login-password" className="text-sm font-medium text-slate-200">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="login-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    className="text-sm text-purple-400 hover:underline font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/50"
                            >
                                Sign In
                            </button>
                        </form>
                    ) : (
                        // Signup Form
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="signup-name" className="text-sm font-medium text-slate-200">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="signup-name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="signup-email" className="text-sm font-medium text-slate-200">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="signup-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="signup-password" className="text-sm font-medium text-slate-200">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="signup-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="signup-confirm-password" className="text-sm font-medium text-slate-200">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        id="signup-confirm-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/50"
                            >
                                Create Account
                            </button>
                        </form>
                    )}

                    {/* Toggle Login/Signup */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-purple-400 hover:underline font-semibold"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-500 mt-6">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-purple-400 hover:underline">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-purple-400 hover:underline">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
}
