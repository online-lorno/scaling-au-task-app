import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  providers: [TasksService, PrismaService],
  controllers: [TasksController],
})
export class TasksModule {}
