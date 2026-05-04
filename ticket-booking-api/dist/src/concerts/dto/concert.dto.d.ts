export declare class CreateConcertDto {
    name: string;
    description: string;
    date: string;
    price: number;
    totalSeats: number;
}
export declare class UpdateConcertDto {
    id: number;
    name?: string;
    description?: string;
    date?: string;
    price?: number;
    totalSeats?: number;
}
export declare class ConcertIdDto {
    id: number;
}
export declare class ResponseConcertDto {
    id: number;
    name: string;
    description: string;
    date: Date;
    price: number;
    totalSeats: number;
    reservedSeats: number;
}
