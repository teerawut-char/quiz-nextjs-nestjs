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
        console.log('Registering user:', data.email)
        try {
            const { email, password, name } = data
            const existingUser = await this.prisma.client.user.findUnique({ where: { email } })
            if (existingUser) {
                console.warn('User registration failed: User already exists', email)
                throw new BadRequestException("User already exists")
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await this.prisma.client.user.create({
                data: { email, password: hashedPassword, name },
                select: { id: true, email: true, name: true },
            })
            console.log('User registered successfully:', email)
            return newUser
        } catch (error) {
            console.error('Error in registerUser:', error)
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
        console.log('Registering admin:', data.email)
        try {
            const { email, password, name } = data
            const existingUser = await this.prisma.client.user.findUnique({ where: { email } })
            if (existingUser) {
                console.warn('Admin registration failed: User already exists', email)
                throw new BadRequestException("User already exists")
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newAdmin = await this.prisma.client.user.create({
                data: { email, password: hashedPassword, name, role: 'ADMIN' },
                select: { id: true, email: true, name: true },
            })
            console.log('Admin registered successfully:', email)
            return newAdmin
        } catch (error) {
            console.error('Error in registerAdmin:', error)
            if (error instanceof BadRequestException) throw error
            throw new InternalServerErrorException("Failed to register admin")
        }
    }

    async loginAdmin(data: LoginDto): Promise<ResponseLoginDto> {
        try {
            const { email, password } = data
            const user = await this.prisma.client.user.findUnique({ where: { email } })
            if (!user || user.role !== 'ADMIN') throw new UnauthorizedException("Invalid credentials")

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials")

            const payload = { sub: user.id, email: user.email, role: "ADMIN" }
            return {
                accessToken: await this.jwtService.signAsync(payload),
                user: { id: user.id, email: user.email, name: user.name, role: "ADMIN" },
            }
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error
            throw new InternalServerErrorException("Failed to login admin")
        }
    }
}
