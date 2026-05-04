"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const concerts = await this.prisma.client.concert.findMany({
            select: {
                totalSeats: true,
                reservedSeats: true,
            },
        });
        const totalSeats = concerts.reduce((acc, c) => acc + c.totalSeats, 0);
        const reservedSeats = concerts.reduce((acc, c) => acc + c.reservedSeats, 0);
        const cancelledBookings = await this.prisma.client.booking.count({
            where: {
                status: 'CANCELLED',
            },
        });
        const cancelledSeatsData = await this.prisma.client.booking.aggregate({
            where: {
                status: 'CANCELLED',
            },
            _sum: {
                numSeats: true,
            },
        });
        return {
            totalSeats,
            reservedSeats,
            cancelledSeats: cancelledSeatsData._sum.numSeats || 0,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map