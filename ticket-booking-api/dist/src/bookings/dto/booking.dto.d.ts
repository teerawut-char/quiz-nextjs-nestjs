export declare class CreateBookingDto {
    userId: number;
    concertId: number;
    numSeats: number;
}
export declare class BookingIdDto {
    id: number;
}
export declare class GetBookingsDto {
    userId?: number;
}
export declare class ResponseCreateBookingDto {
    id: number;
    userId: number;
    concertId: number;
    numSeats: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ResponseBookingDetailDto extends ResponseCreateBookingDto {
    user: {
        id: number;
        name: string | null;
        email: string;
    };
    concert: {
        id: number;
        name: string;
        date: Date;
    };
    transactions: {
        id: number;
        amount: number;
        status: string;
        createdAt: Date;
    }[];
}
