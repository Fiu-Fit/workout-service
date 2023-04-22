import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExerciseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  category?: string;
}
