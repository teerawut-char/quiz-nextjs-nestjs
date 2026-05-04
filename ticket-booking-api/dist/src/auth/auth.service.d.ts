import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto, LoginDto, ResponseAuthProfileDto, ResponseLoginDto } from "./dto/auth.dto";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerUser(data: RegisterDto): Promise<ResponseAuthProfileDto>;
    loginUser(data: LoginDto): Promise<ResponseLoginDto>;
    registerAdmin(data: RegisterDto): Promise<ResponseAuthProfileDto>;
    loginAdmin(data: LoginDto): Promise<ResponseLoginDto>;
}
