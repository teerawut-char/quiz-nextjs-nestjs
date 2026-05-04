import { BookingsService } from './bookings.service';
import { CreateBookingDto, BookingIdDto, ResponseCreateBookingDto, ResponseBookingDetailDto, GetBookingsDto } from './dto/booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    findAll(data?: GetBookingsDto): Promise<ResponseBookingDetailDto[]>;
    findOne(data: BookingIdDto): Promise<ResponseBookingDetailDto>;
    create(data: CreateBookingDto): Promise<ResponseCreateBookingDto>;
    findHistory(data: {
        userId: number;
    }): Promise<any>;
    cancel(data: BookingIdDto): Promise<ResponseCreateBookingDto>;
}
