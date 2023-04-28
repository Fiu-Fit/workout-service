import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExerciseInfo {
  @IsString()
  exerciseId: string;

  @IsNumber()
  repetitions?: number;

  @IsNumber()
  duration?: number;
}

export class WorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  difficulty: number;

  @IsString()
  category?: string;

  exercises: ExerciseInfo[];

  @IsNumber()
  athleteIds: number[];

  @IsNumber()
  authorId: number;
}
