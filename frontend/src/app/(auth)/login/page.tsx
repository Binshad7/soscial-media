'use client';
import { useState, useCallback, useEffect } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import GoogleIcon from '@/components/ui/GoogleIcon';
import GitHubIcon from '@/components/ui/GitHubIcon';
import { login } from '@/lib/api';
import { LoginPayload } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { MESSAGES } from '@/constant/message';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<LoginPayload>({ email: "", password: "" })
    const { user, loginUser } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [])
    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }))
    }, [userData])




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
            const response = await login(payload);
            loginUser(response);
            toast.success(response.message);
            router.push('/')
        } catch (err) {
            toast.error(MESSAGES.LOGIN_FAILED);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8 animate-fade-in">
                <p className="text-slate-400 mt-2">Welcome back! Sign in to continue</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm p-8">
                <div className="space-y-3 mb-6">
                    <Button variant="social" icon={<svg className="w-5 h-5" viewBox="0 0 24 24">{<GoogleIcon />}</svg>}>
                        Continue with Google
                    </Button>
                    <Button variant="social" icon={<svg className="w-5 h-5" viewBox="0 0 24 24">{<GitHubIcon />}</svg>}>
                        Continue with GitHub
                    </Button>
                </div>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-900/50 px-4 text-slate-500 font-medium">Or continue with email</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input handleOnChange={handleOnChange} id="email" name="email" type="email" label="Email" icon={<Mail />} placeholder="you@example.com" />
                    <Input handleOnChange={handleOnChange} id="password" name="password" type="password" label="password" icon={<Lock />} placeholder="••••••••" />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex items-center justify-end">
                        <Link href="/forgot-password" className="text-sm text-purple-400 hover:underline font-medium">
                            Forgot password?
                        </Link>
                    </div>
                    <Button type="submit">Sign In</Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-purple-400 hover:underline font-semibold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}