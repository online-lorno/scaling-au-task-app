import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, taskData: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...taskData,
        userId,
      },
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findAllByUserId(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async findOneById(id: number): Promise<Task> {
    return this.prisma.task.findFirst({
      where: { id },
    });
  }

  async update(id: number, taskData: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: taskData,
    });
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
