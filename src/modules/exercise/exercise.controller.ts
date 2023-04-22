import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';
import { EXERCISE_SERVICE_NAME } from './interfaces/exercise.pb';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'create')
  createPost(@Body() exerciseDTO: ExerciseDTO): Promise<ExerciseDTO> {
    return this.exerciseService.createExercise(exerciseDTO);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findAll')
  getExercises(): Promise<ExerciseDTO[]> {
    return this.exerciseService.getExercises();
  }

  @Get('/:exerciseID')
  getExercise(@Param('exerciseID') exerciseID: string): Promise<ExerciseDTO> {
    return this.exerciseService.getExercise(exerciseID);
  }

  @Post('/:exerciseID')
  updateExercise(
    @Param('exerciseID') exerciseID: string,
    @Body() exerciseDTO: ExerciseDTO
  ): Promise<ExerciseDTO> {
    return this.exerciseService.updateExercise(exerciseID, exerciseDTO);
  }

  @Delete('/:exerciseID')
  deleteExercise(
    @Param('exerciseID') exerciseID: string
  ): Promise<ExerciseDTO> {
    return this.exerciseService.deleteExercise(exerciseID);
  }
}
