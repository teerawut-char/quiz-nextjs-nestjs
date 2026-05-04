"use server"

import axiosInstance from "@/lib/axios"
import { ApiResponse, errorResponse } from "@/lib/apiResponse"
import { ILoginData, ILoginRequest, IAuthProfile, ISignupRequest } from "@/types/auth.types"

export async function loginAction(role: string, data: ILoginRequest): Promise<ApiResponse<ILoginData>> {
    try {
        const response = await axiosInstance.post(`/auth/${role}/login`, data)
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}

export async function signupAction(role: string, data: ISignupRequest): Promise<ApiResponse<IAuthProfile>> {
    console.log(`Signing up ${role}:`, data.email)
    try {
        const response = await axiosInstance.post(`/auth/${role}/register`, data)
        console.log(`${role} signup success:`, response.data)
        return response.data
    } catch (error) {
        console.error(`${role} signup error:`, error)
        return errorResponse(error)
    }
}
