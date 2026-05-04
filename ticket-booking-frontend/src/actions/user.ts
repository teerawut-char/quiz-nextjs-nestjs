"use server"

import axiosInstance from "@/lib/axios"

export const createBookingAction = async (data: { userId: number; concertId: number; numSeats: number }) => {
    try {
        const res = await axiosInstance.post("/bookings/create", data)
        return res.data;
    } catch (error: any) {
        return {
            code: "500",
            message: error.response?.data?.message || "Failed to create booking",
        }
    }
}

export const cancelBookingAction = async (bookingId: number) => {
    try {
        const res = await axiosInstance.post("/bookings/cancel", { id: bookingId })
        return res.data;
    } catch (error: any) {
        return {
            code: "500",
            message: error.response?.data?.message || "Failed to cancel booking",
        }
    }
}

export const getMyBookingsAction = async (userId?: number) => {
    try {
        const res = await axiosInstance.post("/bookings/list", { userId })
        return res.data;
    } catch (error: any) {
        return {
            code: "500",
            message: "Failed to fetch bookings",
        }
    }
}
export const getBookingHistoryAction = async (userId: number) => {
    try {
        const res = await axiosInstance.post("/bookings/history", { userId })
        return res.data;
    } catch (error: any) {
        return {
            code: "500",
            message: "Failed to fetch history",
        }
    }
}
