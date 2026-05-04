export interface IConcert {
  id: number;
  name: string;
  description: string;
  date: string;
  price: number;
  totalSeats: number;
  reservedSeats: number;
}

export interface ICreateConcert {
  name: string;
  description: string;
  date: string;
  price: number;
  totalSeats: number;
}

export interface IUpdateConcert extends Partial<ICreateConcert> {
  id: number;
}

export interface IDashboardStats {
  totalSeats: number;
  reservedSeats: number;
  cancelledSeats: number;
}
