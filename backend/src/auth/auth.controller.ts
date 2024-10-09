import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.usersService.findOneByEmail(registerDto.email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      await this.authService.register(registerDto);
      return { message: 'User registered successfully' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occured during registration',
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    try {
      return this.authService.login(user);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
