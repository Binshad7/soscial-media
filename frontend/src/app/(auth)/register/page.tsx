'use client';
import { useEffect, useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { register } from '@/lib/api';
import Link from 'next/link';
import GoogleIcon from '@/components/ui/GoogleIcon';
import GitHubIcon from '@/components/ui/GitHubIcon';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {MESSAGES} from '@/constant/message'
import { toast } from 'react-toastify';
export default function RegisterPage() {

    const [error, setError] = useState<string | null>(null);
    const router = useRouter()
    const { user, loginUser } = useAuth();
    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirm-password') as string,
        };

        if (payload.password !== payload.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const newUser = await register(payload);
            loginUser(newUser)
            toast.success(MESSAGES.REGISTER_SUCCESS)
            router.push('/')
        } catch (err) {
            toast.error(MESSAGES.REGISTER_FAILED)
            setError('Registration failed');
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8 animate-fade-in">
                <p className="text-slate-400 mt-2">Create your account to get started</p>
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
                    <Input id="name" name="name" type="text" label="Full Name" icon={<User />} placeholder="John Doe" />
                    <Input id="email" name="email" type="email" label="Email" icon={<Mail />} placeholder="you@example.com" />
                    <Input id="password" name="password" type="password" label="Password" icon={<Lock />} placeholder="••••••••" />
                    <Input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        label="Confirm Password"
                        icon={<Lock />}
                        placeholder="••••••••"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit">Create Account</Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link href="/login" className="text-purple-400 hover:underline font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}