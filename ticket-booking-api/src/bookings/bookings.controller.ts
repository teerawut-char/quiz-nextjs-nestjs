import { Controller, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, BookingIdDto, ResponseCreateBookingDto, ResponseBookingDetailDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post('list')
    findAll(): Promise<ResponseBookingDetailDto[]> {
        return this.bookingsService.findAll();
    }

    @Post('detail')
    findOne(@Body() data: BookingIdDto): Promise<ResponseBookingDetailDto> {
        return this.bookingsService.findOne(data.id);
    }

    @Post('create')
    create(@Body() data: CreateBookingDto): Promise<ResponseCreateBookingDto> {
        return this.bookingsService.create(data);
    }

    @Post('cancel')
    cancel(@Body() data: BookingIdDto): Promise<ResponseCreateBookingDto> {
        return this.bookingsService.cancel(data.id);
    }
}
