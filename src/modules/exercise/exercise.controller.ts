import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExerciseService } from './exercise.service';
import {
  EXERCISE_SERVICE_NAME,
  Exercise,
  ExerciseList,
  ExercisePutRequest,
} from './interfaces/exercise.pb';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'create')
  createExercise(@Body() exercise: Exercise): Promise<Exercise> {
    console.log(exercise);
    return this.exerciseService.createExercise(exercise);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findAll')
  getExercises(): Promise<ExerciseList> {
    return this.exerciseService.getExercises();
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findById')
  getExercise(id: string): Promise<Exercise> {
    return this.exerciseService.getExercise(id);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'put')
  updateExercise(exercise_request: ExercisePutRequest): Promise<Exercise> {
    return this.exerciseService.updateExercise(
      exercise_request.id,
      exercise_request.exercise
    );
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'deleteById')
  deleteExercise(id: string): Promise<Exercise> {
    return this.exerciseService.deleteExercise(id);
  }
}
