import { create } from "zustand"
import { persist } from "zustand/middleware"

type Role = "user" | "admin"

interface User {
    id: number
    email: string
    name: string | null
}

interface AuthState {
    role: Role
    accessToken: string | null
    user: User | null
    setRole: (role: Role) => void
    setSession: (accessToken: string, user: User) => void
    clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            role: "user",
            accessToken: null,
            user: null,
            setRole: (role) => set({ role }),
            setSession: (accessToken, user) => {
                localStorage.setItem("token", accessToken)
                localStorage.setItem("user", JSON.stringify(user))
                set({ accessToken, user })
            },
            clearSession: () => {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                set({ accessToken: null, user: null })
            },
        }),
        {
            name: "auth-store",
            partialize: (state) => ({ role: state.role }),
        }
    )
)
