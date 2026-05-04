"use client"

import React, { useState, Suspense } from "react"
import AuthLayout from "@/components/AuthLayout"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signupAction } from "@/actions/auth"
import { useAuthStore } from "@/store/useAuthStore"

function SignupForm() {
    const router = useRouter()
    const role = useAuthStore((state) => state.role)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)

        try {
            const data = await signupAction(role, { name, email, password })

            if (data.code !== "000") {
                setError(data.message || "Signup failed")
            } else {
                router.push("/login")
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center", marginBottom: "2.5rem", color: "#1e293b" }}>Sign Up</h1>
            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <Input
                    label="Full name"
                    id="fullname"
                    type="text"
                    placeholder="Enter your Full Name"
                    icon="fa-solid fa-user"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    required
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your Email Address"
                    icon="fa-solid fa-envelope"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Create a Password"
                    icon="fa-solid fa-lock"
                    suffixIcon="fa-solid fa-eye-slash"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    required
                />

                <Input
                    label="Confirm Password"
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter your Password"
                    icon="fa-solid fa-shield-halved"
                    suffixIcon="fa-solid fa-eye-slash"
                    value={confirmPassword}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    required
                />

                {error && <div style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.5rem", textAlign: "center" }}>{error}</div>}

                <div style={{ marginTop: "1.5rem" }}>
                    <Button type="submit" style={{ width: "100%", padding: "0.875rem", backgroundColor: "#1e95e8" }} disabled={loading}>
                        {loading ? "Creating account..." : "Create an account"}
                    </Button>
                </div>

                <div style={{ textAlign: "center", fontSize: "0.75rem", marginTop: "2rem" }}>
                    <span style={{ color: "#64748b" }}>Already have an account?</span>
                    <Link href="/login" style={{ color: "#3b82f6", fontWeight: 600, marginLeft: "0.5rem", textDecoration: "none" }}>
                        Login
                    </Link>
                </div>
            </form>
        </>
    )
}

export default function SignupPage() {
    return (
        <AuthLayout>
            <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
                <SignupForm />
            </Suspense>
        </AuthLayout>
    )
}
