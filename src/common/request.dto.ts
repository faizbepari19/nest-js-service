export class LoginDto {
    email: string;
    password: string;
}

export class ForgotPasswordDto {
    email: string;
}

export class ResetPasswordDto {
    email: string;
    token: string;
    new_password: string;
}

export class UserDto {
    id: number;
    email: string;
    user_name: string;
    token?: string;
    message?: string;
}

export class CreateTaskDto {
    title: string;
    description: string;
}
