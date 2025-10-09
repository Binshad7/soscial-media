'use client'
import { useContext } from "react"
import { UserDataContext } from "@/context/UserProvider"

export function useAuth() {
    const context = useContext(UserDataContext)
    if (!context) {
        throw new Error("Some Goes Wrong")
    }
    return context
}