import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';
import {
  EXERCISE_SERVICE_NAME,
  ExerciseId,
  ExerciseList,
} from './interfaces/exercise.pb';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'create')
  createExercise(@Body() exerciseDTO: ExerciseDTO): Promise<ExerciseDTO> {
    return this.exerciseService.createExercise(exerciseDTO);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findAll')
  getExercises(): Promise<ExerciseList> {
    return this.exerciseService.getExercises();
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findById')
  getExercise(exerciseID: ExerciseId): Promise<ExerciseDTO> {
    return this.exerciseService.getExercise(exerciseID);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'put')
  updateExercise(
    exerciseID: ExerciseId,
    @Body() exerciseDTO: ExerciseDTO
  ): Promise<ExerciseDTO> {
    return this.exerciseService.updateExercise(exerciseID, exerciseDTO);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'deleteById')
  deleteExercise(exerciseID: ExerciseId): Promise<ExerciseDTO> {
    console.log(exerciseID);
    return this.exerciseService.deleteExercise(exerciseID);
  }
}
