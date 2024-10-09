import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { PrismaService } from 'src/database/prisma.service';

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

      expect(await controller.create(createTaskDto)).toEqual(task);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
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

      jest.spyOn(tasksService, 'findAll').mockImplementation(async () => tasks);

      expect(await controller.findAll()).toEqual(tasks);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const now = new Date();
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        isCompleted: true,
      };
      const task = {
        id: 1,
        ...updateTaskDto,
        createdAt: now,
        updatedAt: now,
        userId: 1,
      };

      jest.spyOn(tasksService, 'update').mockImplementation(async () => task);

      expect(await controller.update('1', updateTaskDto)).toEqual(task);
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

      jest.spyOn(tasksService, 'delete').mockImplementation(async () => task);

      expect(await controller.remove('1')).toEqual(task);
    });
  });
});
