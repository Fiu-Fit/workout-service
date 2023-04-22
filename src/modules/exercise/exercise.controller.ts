import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateExerciseDTO } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get('/')
  async getExercises(@Res() res: Response) {
    const exercises = await this.exerciseService.getExercises();
    return res.status(HttpStatus.OK).json(exercises);
  }

  @Get('/:exerciseID')
  async getExercise(
    @Res() res: Response,
    @Param('exerciseID') exerciseID: string
  ) {
    const exercise = await this.exerciseService.getExercise(exerciseID);
    return res.status(HttpStatus.OK).json(exercise);
  }

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

  @Post('/:exerciseID')
  async updateExercise(
    @Res() res: Response,
    @Param('exerciseID') exerciseID: string,
    @Body() createExerciseDTO: CreateExerciseDTO
  ) {
    const exercise = await this.exerciseService.updateExercise(
      exerciseID,
      createExerciseDTO
    );
    return res.status(HttpStatus.OK).json({
      message: 'Exercise Successfully Updated',
      exercise,
    });
  }

  @Delete('/:exerciseID')
  async deleteExercise(
    @Res() res: Response,
    @Param('exerciseID') exerciseID: string
  ) {
    const exercise = await this.exerciseService.deleteExercise(exerciseID);
    return res.status(HttpStatus.OK).json({
      message: 'Exercise Successfully Deleted',
      exercise,
    });
  }
}
