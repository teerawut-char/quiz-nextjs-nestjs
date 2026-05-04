import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResponseAuthProfileDto {
  id: number;
  email: string;
  name: string | null;
}

export class ResponseLoginDto {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string | null;
    role: string;
  };
}

