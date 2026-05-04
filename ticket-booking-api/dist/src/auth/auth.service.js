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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerUser(data) {
        console.log('Registering user:', data.email);
        try {
            const { email, password, name } = data;
            const existingUser = await this.prisma.client.user.findUnique({ where: { email } });
            if (existingUser) {
                console.warn('User registration failed: User already exists', email);
                throw new common_1.BadRequestException("User already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.prisma.client.user.create({
                data: { email, password: hashedPassword, name },
                select: { id: true, email: true, name: true },
            });
            console.log('User registered successfully:', email);
            return newUser;
        }
        catch (error) {
            console.error('Error in registerUser:', error);
            if (error instanceof common_1.BadRequestException)
                throw error;
            throw new common_1.InternalServerErrorException("Failed to register user");
        }
    }
    async loginUser(data) {
        try {
            const { email, password } = data;
            const user = await this.prisma.client.user.findUnique({ where: { email } });
            if (!user)
                throw new common_1.UnauthorizedException("Invalid credentials");
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid)
                throw new common_1.UnauthorizedException("Invalid credentials");
            const payload = { sub: user.id, email: user.email, role: "USER" };
            return {
                accessToken: await this.jwtService.signAsync(payload),
                user: { id: user.id, email: user.email, name: user.name, role: "USER" },
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.InternalServerErrorException("Failed to login user");
        }
    }
    async registerAdmin(data) {
        console.log('Registering admin:', data.email);
        try {
            const { email, password, name } = data;
            const existingUser = await this.prisma.client.user.findUnique({ where: { email } });
            if (existingUser) {
                console.warn('Admin registration failed: User already exists', email);
                throw new common_1.BadRequestException("User already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = await this.prisma.client.user.create({
                data: { email, password: hashedPassword, name, role: 'ADMIN' },
                select: { id: true, email: true, name: true },
            });
            console.log('Admin registered successfully:', email);
            return newAdmin;
        }
        catch (error) {
            console.error('Error in registerAdmin:', error);
            if (error instanceof common_1.BadRequestException)
                throw error;
            throw new common_1.InternalServerErrorException("Failed to register admin");
        }
    }
    async loginAdmin(data) {
        try {
            const { email, password } = data;
            const user = await this.prisma.client.user.findUnique({ where: { email } });
            if (!user || user.role !== 'ADMIN')
                throw new common_1.UnauthorizedException("Invalid credentials");
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid)
                throw new common_1.UnauthorizedException("Invalid credentials");
            const payload = { sub: user.id, email: user.email, role: "ADMIN" };
            return {
                accessToken: await this.jwtService.signAsync(payload),
                user: { id: user.id, email: user.email, name: user.name, role: "ADMIN" },
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.InternalServerErrorException("Failed to login admin");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map