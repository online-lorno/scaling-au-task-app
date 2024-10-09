import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  isCompleted: boolean;
}
