import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { UserWithoutPassword } from 'src/users/types';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const now = new Date();
    const registerDto: RegisterDto = {
      email: 'test@test.com',
      password: 'test123',
    };
    const user: User = {
      id: 1,
      email: 'test@test.com',
      password: 'test123',
      createdAt: now,
      updatedAt: now,
    };

    jest.spyOn(usersService, 'create').mockImplementation(async () => user);

    expect(await service.register(registerDto)).toEqual(user);
  });

  it('should validate a user', async () => {
    const now = new Date();
    const loginDto: LoginDto = { email: 'test@test.com', password: 'test123' };
    const user: User = {
      id: 1,
      email: 'test@test.com',
      password: 'test123',
      createdAt: now,
      updatedAt: now,
    };
    const userWithoutPassword: UserWithoutPassword = {
      id: 1,
      email: 'test@test.com',
      createdAt: now,
      updatedAt: now,
    };

    jest
      .spyOn(usersService, 'findOneByEmail')
      .mockImplementation(async () => user);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    expect(await service.validateUser(loginDto)).toEqual(userWithoutPassword);
  });

  it('should login a user', async () => {
    const now = new Date();
    const userWithoutPassword: UserWithoutPassword = {
      id: 1,
      email: 'test@test.com',
      createdAt: now,
      updatedAt: now,
    };
    const token: string = 'testToken';

    jest.spyOn(jwtService, 'sign').mockImplementation(() => token);

    expect(await service.login(userWithoutPassword)).toEqual({
      access_token: token,
    });
  });

  it('should fail to register a user with an existing email', async () => {
    const registerDto: RegisterDto = {
      email: 'test@test.com',
      password: 'test123',
    };
    jest
      .spyOn(usersService, 'create')
      .mockRejectedValue(new Error('User already exists'));

    await expect(service.register(registerDto)).rejects.toThrow(
      'User already exists',
    );
  });

  it('should fail to validate a user with an incorrect password', async () => {
    const loginDto: LoginDto = {
      email: 'test@test.com',
      password: 'wrongPassword',
    };
    jest.spyOn(usersService, 'findOneByEmail').mockImplementation(async () => ({
      id: 1,
      email: 'test@test.com',
      password: 'test123',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    expect(await service.validateUser(loginDto)).toBeNull();
  });
});
