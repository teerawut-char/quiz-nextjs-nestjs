import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ResponseAuthProfileDto, ResponseLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User Endpoints
  @Post('user/register')
  async registerUser(@Body() data: RegisterDto): Promise<ResponseAuthProfileDto> {
    return this.authService.registerUser(data);
  }

  @Post('user/login')
  async loginUser(@Body() data: LoginDto): Promise<ResponseLoginDto> {
    return this.authService.loginUser(data);
  }

  // Admin Endpoints
  @Post('admin/register')
  async registerAdmin(@Body() data: RegisterDto): Promise<ResponseAuthProfileDto> {
    return this.authService.registerAdmin(data);
  }

  @Post('admin/login')
  async loginAdmin(@Body() data: LoginDto): Promise<ResponseLoginDto> {
    return this.authService.loginAdmin(data);
  }
}
