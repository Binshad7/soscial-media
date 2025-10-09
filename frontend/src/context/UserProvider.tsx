'use client'
import { createContext, ReactNode, useState } from "react";
import { AuthResponse } from "@/lib/types";

interface UserContextType {
    user: AuthResponse | null;
    loginUser: (newUser: AuthResponse) => void;
    logOutUser: () => void;
}
export const UserDataContext = createContext<UserContextType | null>(null)

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthResponse | null>(null)
    const loginUser = (newUser: AuthResponse): void => {
        setUser(newUser)
    }
    const logOutUser = () => setUser(null)
    return (
        <>
            <UserDataContext.Provider value={{ user, loginUser, logOutUser }} >
                {children}
            </UserDataContext.Provider>
        </>
    )
}