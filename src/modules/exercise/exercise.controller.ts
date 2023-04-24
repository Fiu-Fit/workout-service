import { Body, Controller, Param } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';
import { EXERCISE_SERVICE_NAME, ExerciseList } from './interfaces/exercise.pb';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'create')
  createExercise(@Body() exerciseDTO: ExerciseDTO): Promise<ExerciseDTO> {
    console.log(exerciseDTO);
    return this.exerciseService.createExercise(exerciseDTO);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findAll')
  getExercises(): Promise<ExerciseList> {
    return this.exerciseService.getExercises();
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findById')
  getExercise(@Param('exerciseID') exerciseID: string): Promise<ExerciseDTO> {
    return this.exerciseService.getExercise(exerciseID);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'put')
  updateExercise(
    @Param('exerciseID') exerciseID: string,
    @Body() exerciseDTO: ExerciseDTO
  ): Promise<ExerciseDTO> {
    return this.exerciseService.updateExercise(exerciseID, exerciseDTO);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'deleteById')
  deleteExercise(
    @Param('exerciseID') exerciseID: string
  ): Promise<ExerciseDTO> {
    return this.exerciseService.deleteExercise(exerciseID);
  }
}
