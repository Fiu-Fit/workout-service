import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  duration: number;

  @IsString()
  category?: string;

  @IsNumber()
  athleteIds: number[];

  @IsNumber()
  authorId: number;
}
