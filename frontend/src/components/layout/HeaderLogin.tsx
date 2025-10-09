'use client'
import { MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center py-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/50">
        <MessageCircle className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        ChatFlow
      </h1>
    </header>
  );
}