export interface ApiResponse<T = unknown> {
    code: string
    message: string
    data: T | null
}

export const errorResponse = <T>(error: unknown): ApiResponse<T> => {
    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response?.data === "object"
    ) {
        return (error as any).response.data as ApiResponse<T>
    }
    return {
        code: "500",
        message: "Internal Server Error or Network Issue",
        data: null,
    }
}
