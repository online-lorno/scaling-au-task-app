import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserWithoutPassword } from 'src/users/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerData: RegisterDto): Promise<User> {
    const { email, password } = registerData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      email,
      password: hashedPassword,
    });
  }

  async validateUser(loginData: LoginDto): Promise<UserWithoutPassword | null> {
    const { email, password } = loginData;
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
