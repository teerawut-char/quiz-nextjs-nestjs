"use server"

import axios from "axios"
import { ApiResponse, errorResponse } from "@/lib/apiResponse"
import { ILoginData, ILoginRequest, IAuthProfile, ISignupRequest } from "@/types/auth.types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export async function loginAction(role: string, data: ILoginRequest): Promise<ApiResponse<ILoginData>> {
    try {
        const response = await axios.post(`${API_URL}/auth/${role}/login`, data)
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}

export async function signupAction(role: string, data: ISignupRequest): Promise<ApiResponse<IAuthProfile>> {
    try {
        const response = await axios.post(`${API_URL}/auth/${role}/register`, data)
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}
