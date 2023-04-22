import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateExerciseDTO } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Post('/create')
  async createPost(
    @Res() res: Response,
    @Body() createExerciseDTO: CreateExerciseDTO
  ) {
    const exercise = await this.exerciseService.createExercise(
      createExerciseDTO
    );
    return res.status(HttpStatus.OK).json({
      message: 'Exercise Successfully Created',
      exercise,
    });
  }
}
