import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { ResponseDto } from '../common/response.dto';
import { UserSignUpDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from '../common/request.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    //create user
    @Post('sign_up')
    async create(@Body() user: UserSignUpDto): Promise<ResponseDto> {
        const newUser = await this.authService.signUp(user.user_name, user.email, user.password);
        return new ResponseDto({
            statusCode: 200,
            message: 'Sign up successful!',
            data: {
                id: newUser.id,
                user_name: newUser.user_name,
                email: newUser.email
            }
        });
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() user: LoginDto): Promise<ResponseDto> {
        const user_record = await this.authService.login(user.email, user.password);
        return new ResponseDto({
            statusCode: 200,
            message: 'Login successful!',
            data: {
                id: user_record.id,
                user_name: user_record.user_name,
                token: 'generate a JWT token'
            }
        });
    }

    @Post('forgot-password')
    @HttpCode(200)
    async forgotPassword(@Body() user: ForgotPasswordDto): Promise<ResponseDto> {
        const [user_record, resetToken] = await this.authService.forgotPassword(user.email);
        return new ResponseDto({
            statusCode: 200,
            message: 'Reset link',
            data: {
                id: user_record.id,
                user_name: user_record.user_name,
                token: resetToken
            }
        });
    }

    @Post('reset-password')
    @HttpCode(200)
    async resetPassword(@Body() reset_user: ResetPasswordDto): Promise<ResponseDto> {
        await this.authService.resetPassword(
            reset_user.email,
            reset_user.token,
            reset_user.new_password,
        );
        return new ResponseDto({
            statusCode: 200,
            message: 'Password reset successful'
        });
    }
}

