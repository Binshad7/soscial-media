'use client'
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  const { user } = useAuth()
  console.log(user)
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  })
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white text-5xl font-bold">
      Tailwind 4 Working ⚡
    </div>
  );
}
