import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(taskData: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        userId: 1,
        ...taskData,
      },
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
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
