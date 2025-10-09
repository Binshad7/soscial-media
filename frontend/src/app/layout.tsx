import { ReactNode } from 'react';
import ToastProvider from '@/components/ui/ToastContainer';
import UserProvider from '@/context/UserProvider';
import './global.css'

export const metadata = {
    title: 'ChatFlow',
    description: 'A group chat app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 min-h-screen">
                <UserProvider>
                    <ToastProvider position="top-right" />
                    <main className="flex items-center justify-center p-4">{children}</main>
                </UserProvider>
            </body>
        </html>
    );
}