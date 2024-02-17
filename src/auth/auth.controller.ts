import { Controller, Post, Body } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';

// Create a DTO (Data Transfer Object) for the login request payload
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


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    //create user
    @Post('sign_up')
    async create(@Body() user: User): Promise<User> {
        return await this.authService.signUp(user.user_name, user.email, user.password);
    }

    @Post('login')
    async login(@Body() user: LoginDto): Promise<User> {
        return await this.authService.login(user.email, user.password);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() user: ForgotPasswordDto) {
        return this.authService.forgotPassword(user.email);
    }

    @Post('reset-password')
    async resetPassword(@Body() reset_user: ResetPasswordDto)  {
        
        await this.authService.resetPassword(
            reset_user.email,
            reset_user.token,
            reset_user.new_password,
        );
        return { message: 'Password reset successful' };
    }
}

