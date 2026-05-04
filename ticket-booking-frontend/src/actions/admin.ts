"use server"

import axiosInstance from "@/lib/axios"
import { ApiResponse, errorResponse } from "@/lib/apiResponse"
import { IConcert, ICreateConcert, IUpdateConcert, IDashboardStats } from "@/types/concert.types"

export async function getConcertsAction(): Promise<ApiResponse<IConcert[]>> {
    try {
        const response = await axiosInstance.post(`/concerts/list`)
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}

export async function createConcertAction(data: ICreateConcert): Promise<ApiResponse<IConcert>> {
    try {
        const response = await axiosInstance.post(`/concerts/create`, data)
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}

export async function updateConcertAction(data: IUpdateConcert): Promise<ApiResponse<IConcert>> {
    try {
        const response = await axiosInstance.post(`/concerts/update`, data)
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}

export async function deleteConcertAction(id: number): Promise<ApiResponse<IConcert>> {
    try {
        const response = await axiosInstance.post(`/concerts/remove`, { id })
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}

export async function getDashboardStatsAction(): Promise<ApiResponse<IDashboardStats>> {
    try {
        const response = await axiosInstance.get(`/admin/dashboard-stats`)
        if (response.data.code === "500") {
            return {
                code: "000",
                message: "Fallback stats due to 500 error",
                data: {
                    totalSeats: 0,
                    reservedSeats: 0,
                    cancelledSeats: 0
                }
            }
        }
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}

export async function getBookingsAction(): Promise<ApiResponse<any[]>> {
    try {
        const response = await axiosInstance.post(`/bookings/list`)
        return response.data
    } catch (error) {
        return errorResponse(error)
    }
}
