import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const user: User = {
  id: 1,
  email: 'test@test.com',
  password: 'testpassword',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, PrismaService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const now = new Date();
      const createTaskDto: CreateTaskDto = { title: 'Test Task' };
      const task = {
        id: 1,
        ...createTaskDto,
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        userId: 1,
      };

      jest.spyOn(tasksService, 'create').mockImplementation(async () => task);

      expect(await controller.create(createTaskDto, user)).toEqual(task);
    });
  });

  describe('findAllByUserId', () => {
    it('should return all tasks of current user', async () => {
      const now = new Date();
      const task1 = {
        id: 1,
        title: 'Task 1',
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        userId: 1,
      };
      const task2 = {
        id: 2,
        title: 'Task 2',
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        userId: 1,
      };
      const tasks = [task1, task2];

      jest
        .spyOn(tasksService, 'findAllByUserId')
        .mockImplementation(async () => tasks);

      expect(await controller.findAllByUserId(user)).toEqual(tasks);
    });
  });

  describe('findOneById', () => {
    it('should return a task', async () => {
      const now = new Date();
      const task = {
        id: 1,
        title: 'Task 1',
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        userId: 1,
      };

      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => task);

      expect(await controller.findOneById('1', user)).toEqual(task);
    });

    it('should throw an error if task is not found', async () => {
      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => null);

      await expect(controller.findOneById('1', user)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if user does not have access to the task', async () => {
      const now = new Date();
      const task = {
        id: 1,
        title: 'Task 1',
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        userId: 2,
      };

      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => task);

      await expect(controller.findOneById('1', user)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('update', () => {
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task',
      isCompleted: true,
    };

    it('should update a task', async () => {
      const now = new Date();
      const task = {
        id: 1,
        ...updateTaskDto,
        createdAt: now,
        updatedAt: now,
        userId: 1,
      };

      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => task);
      jest.spyOn(tasksService, 'update').mockImplementation(async () => task);

      expect(await controller.update('1', updateTaskDto, user)).toEqual(task);
    });

    it('should throw an error if task does not exist', async () => {
      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => null);

      await expect(controller.update('1', updateTaskDto, user)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if user does not have access to the task', async () => {
      const now = new Date();
      const task = {
        id: 1,
        title: 'Task 1',
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        userId: 2,
      };

      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => task);

      await expect(controller.update('1', updateTaskDto, user)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const now = new Date();
      const task = {
        id: 1,
        title: 'Task 1',
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        userId: 1,
      };

      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => task);
      jest.spyOn(tasksService, 'delete').mockImplementation(async () => task);

      expect(await controller.remove('1', user)).toEqual(task);
    });

    it('should throw an error if task is not found', async () => {
      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => null);

      await expect(controller.remove('1', user)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if user does not have access to the task', async () => {
      const now = new Date();
      const task = {
        id: 1,
        title: 'Task 1',
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        userId: 2,
      };

      jest
        .spyOn(tasksService, 'findOneById')
        .mockImplementation(async () => task);

      await expect(controller.remove('1', user)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
