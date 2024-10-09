import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService, PrismaService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const now = new Date();
      const registerDto = { email: 'test@test.com', password: 'test123' };
      const user = {
        id: 1,
        email: 'test@test.com',
        password: 'test123',
        createdAt: now,
        updatedAt: now,
      };

      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockImplementation(async () => null);
      jest.spyOn(authService, 'register').mockImplementation(async () => user);

      expect(await controller.register(registerDto)).toEqual({
        message: 'User registered successfully',
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      const now = new Date();
      const registerDto = { email: 'test@test.com', password: 'test123' };

      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockImplementation(async () => ({
          id: 1,
          email: 'test@test.com',
          password: 'test123',
          createdAt: now,
          updatedAt: now,
        }));

      await expect(controller.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const now = new Date();
      const loginDto = { email: 'test@test.com', password: 'test123' };
      const user = {
        id: 1,
        email: 'test@test.com',
        password: 'test123',
        createdAt: now,
        updatedAt: now,
      };

      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(async () => user);
      jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => ({ access_token: 'testToken' }));

      expect(await controller.login(loginDto)).toEqual({
        access_token: 'testToken',
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const loginDto = { email: 'test@test.com', password: 'test123' };

      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(async () => null);

      await expect(controller.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
