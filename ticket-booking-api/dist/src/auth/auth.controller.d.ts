import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ResponseAuthProfileDto, ResponseLoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(data: RegisterDto): Promise<ResponseAuthProfileDto>;
    loginUser(data: LoginDto): Promise<ResponseLoginDto>;
    registerAdmin(data: RegisterDto): Promise<ResponseAuthProfileDto>;
    loginAdmin(data: LoginDto): Promise<ResponseLoginDto>;
}
