export declare class RegisterDto {
    email: string;
    password: string;
    name?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ResponseAuthProfileDto {
    id: number;
    email: string;
    name: string | null;
}
export declare class ResponseLoginDto {
    accessToken: string;
    user: {
        id: number;
        email: string;
        name: string | null;
        role: string;
    };
}
