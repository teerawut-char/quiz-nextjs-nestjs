
export interface IAuthProfile {
    id: number
    email: string
    name: string | null
}

export interface ILoginData {
    accessToken: string
    user: IAuthProfile
}

export interface ILoginRequest {
    email: string
    password: string
}

export interface ISignupRequest {
    name: string
    email: string
    password: string
}
