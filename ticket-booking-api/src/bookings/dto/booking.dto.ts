import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  concertId: number;

  @IsNumber()
  @Min(1)
  numSeats: number;
}

export class BookingIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class ResponseCreateBookingDto {
  id: number;
  userId: number;
  concertId: number;
  numSeats: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ResponseBookingDetailDto extends ResponseCreateBookingDto {
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
