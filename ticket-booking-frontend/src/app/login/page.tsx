"use client"

import React, { useState, Suspense } from "react"
import AuthLayout from "@/components/AuthLayout"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loginAction } from "@/actions/auth"
import { useAuthStore } from "@/store/useAuthStore"

function LoginForm() {
    const router = useRouter()
    const { role, setSession } = useAuthStore()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const data = await loginAction(role, { email, password })

            if (data.code !== "000" || !data.data) {
                setError(data.message || "Login failed")
            } else {
                setSession(data.data.accessToken, data.data.user)
                router.push(`/dashboard/${role}`)
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center", marginBottom: "2.5rem", color: "#1e293b" }}>Login</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Input
                    label='Email'
                    id='email'
                    type='email'
                    placeholder='Enter your Email Address'
                    icon='fa-solid fa-user'
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label='Password'
                    id='password'
                    type='password'
                    placeholder='Enter your Password'
                    icon='fa-solid fa-lock'
                    suffixIcon='fa-solid fa-eye-slash'
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    required
                />

                {error && <div style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.5rem", textAlign: "center" }}>{error}</div>}

                <div style={{ marginTop: "1rem" }}>
                    <Button type='submit' style={{ width: "100%", padding: "0.875rem", backgroundColor: "#1e95e8" }} disabled={loading}>
                        {loading ? "Logging in..." : `Login as ${role === "admin" ? "Administrator" : "User"}`}
                    </Button>
                </div>

                <div style={{ textAlign: "center", fontSize: "0.75rem", marginTop: "2rem" }}>
                    <span style={{ color: "#64748b" }}>Don't have an account?</span>
                    <Link href="/signup" style={{ color: "#3b82f6", fontWeight: 600, marginLeft: "0.5rem", textDecoration: "none" }}>
                        Create an account
                    </Link>
                </div>
            </form>
        </>
    )
}

export default function LoginPage() {
    return (
        <AuthLayout>
            <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </AuthLayout>
    )
}
