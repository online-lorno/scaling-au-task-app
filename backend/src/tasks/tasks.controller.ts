import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { CurrentUser } from 'src/users/users.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() currentUser) {
    return this.tasksService.create(currentUser.id, createTaskDto);
  }

  @Get()
  findAllByUserId(@CurrentUser() currentUser) {
    return this.tasksService.findAllByUserId(+currentUser.id);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string, @CurrentUser() currentUser) {
    const task = await this.tasksService.findOneById(+id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== +currentUser.id) {
      throw new UnauthorizedException('You have no access to this task');
    }

    return task;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() currentUser,
  ) {
    const task = await this.tasksService.findOneById(+id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== +currentUser.id) {
      throw new UnauthorizedException('You have no access to this task');
    }

    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() currentUser) {
    const task = await this.tasksService.findOneById(+id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== +currentUser.id) {
      throw new UnauthorizedException('You have no access to this task');
    }

    return this.tasksService.delete(+id);
  }
}
