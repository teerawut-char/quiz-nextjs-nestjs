import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        totalSeats: any;
        reservedSeats: any;
        cancelledSeats: any;
    }>;
}
