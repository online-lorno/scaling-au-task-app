import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: userData,
    });
  }

  async findOneById(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }
}
