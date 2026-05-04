import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../prisma/prisma.service"
import * as bcrypt from "bcrypt"
import { RegisterDto, LoginDto, ResponseAuthProfileDto, ResponseLoginDto } from "./dto/auth.dto"

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

  

    async registerUser(data: RegisterDto): Promise<ResponseAuthProfileDto> {
        try {
            const { email, password, name } = data
            const existingUser = await this.prisma.client.user.findUnique({ where: { email } })
            if (existingUser) throw new BadRequestException("User already exists")

            const hashedPassword = await bcrypt.hash(password, 10)
            return await this.prisma.client.user.create({
                data: { email, password: hashedPassword, name },
                select: { id: true, email: true, name: true },
            })
        } catch (error) {
            if (error instanceof BadRequestException) throw error
            throw new InternalServerErrorException("Failed to register user")
        }
    }

    async loginUser(data: LoginDto): Promise<ResponseLoginDto> {
        try {
            const { email, password } = data
            const user = await this.prisma.client.user.findUnique({ where: { email } })
            if (!user) throw new UnauthorizedException("Invalid credentials")

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials")

            const payload = { sub: user.id, email: user.email, role: "USER" }
            return {
                accessToken: await this.jwtService.signAsync(payload),
                user: { id: user.id, email: user.email, name: user.name, role: "USER" },
            }
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error
            throw new InternalServerErrorException("Failed to login user")
        }
    }


    async registerAdmin(data: RegisterDto): Promise<ResponseAuthProfileDto> {
        try {
            const { email, password, name } = data
            const existingAdmin = await this.prisma.client.admin.findUnique({ where: { email } })
            if (existingAdmin) throw new BadRequestException("Admin already exists")

            const hashedPassword = await bcrypt.hash(password, 10)
            return await this.prisma.client.admin.create({
                data: { email, password: hashedPassword, name },
                select: { id: true, email: true, name: true },
            })
        } catch (error) {
            if (error instanceof BadRequestException) throw error
            throw new InternalServerErrorException("Failed to register admin")
        }
    }

    async loginAdmin(data: LoginDto): Promise<ResponseLoginDto> {
        try {
            const { email, password } = data
            const admin = await this.prisma.client.admin.findUnique({ where: { email } })
            if (!admin) throw new UnauthorizedException("Invalid credentials")

            const isPasswordValid = await bcrypt.compare(password, admin.password)
            if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials")

            const payload = { sub: admin.id, email: admin.email, role: "ADMIN" }
            return {
                accessToken: await this.jwtService.signAsync(payload),
                user: { id: admin.id, email: admin.email, name: admin.name, role: "ADMIN" },
            }
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error
            throw new InternalServerErrorException("Failed to login admin")
        }
    }
}
