import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async signUp(user_name: string, email: string, password: string): Promise<User> {
        const hashedPassword = hashSync(password, 10);
        const user = this.usersRepository.create({ user_name: user_name, email, password: hashedPassword });
        console.log('hiii ', user)
        return this.usersRepository.save(user);
    }

    async login(email: string, password: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user || !compareSync(password, user.password)) {
            throw new NotFoundException('Invalid credentials');
        }

        return user;
    }


    async forgotPassword(email: string): Promise<[User, string]> {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Generate and save reset token
        const resetToken = uuidv4();
        user.reset_token = hashSync(resetToken, 10);
        user.reset_token_expry = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour
        await this.usersRepository.save(user);

        return [user, resetToken]
        // result.email = user.email;
        // result.token = resetToken;
        // return result
    }

    async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        console.log(token, user.reset_token)
        console.log(compareSync(token, user.reset_token)) 
        console.log(new Date() > user.reset_token_expry)

        if (!compareSync(token, user.reset_token) || new Date() > user.reset_token_expry) {
            throw new BadRequestException('Invalid reset token');
        }

        // Update password and clear reset token
        user.password = hashSync(newPassword, 10);
        user.reset_token = null;
        user.reset_token_expry = null;
        await this.usersRepository.save(user);
    }

}
