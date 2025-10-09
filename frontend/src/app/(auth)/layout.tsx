import { ReactNode } from 'react';
import Header from '@/components/layout/HeaderLogin';
import Footer from '@/components/layout/FooterLogin';

export const metadata = {
  title: 'ChatFlow - Auth',
  description: 'Login or register for ChatFlow',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-layout min-h-screen flex flex-col items-center justify-between">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">{children}</main>
      <Footer />
    </div>
  );
}