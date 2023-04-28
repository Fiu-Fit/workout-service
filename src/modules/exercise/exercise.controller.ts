import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExerciseService } from './exercise.service';
import {
  EXERCISE_SERVICE_NAME,
  Exercise,
  ExerciseCategory,
  ExerciseList,
  ExerciseName,
  ExercisePutRequest,
} from './interfaces/exercise.pb';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'create')
  createExercise(exercise: Exercise): Promise<Exercise> {
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
  updateExercise(exerciseRequest: ExercisePutRequest): Promise<Exercise> {
    return this.exerciseService.updateExercise(
      exerciseRequest.id,
      exerciseRequest.exercise
    );
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'deleteById')
  deleteExercise(id: string): Promise<Exercise> {
    return this.exerciseService.deleteExercise(id);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findByName')
  getExerciseByName({ name }: ExerciseName): Promise<Exercise> {
    return this.exerciseService.getExerciseByName(name);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findByCategory')
  getExerciseByCategory({ category }: ExerciseCategory): Promise<ExerciseList> {
    return this.exerciseService.getExerciseByCategory(category);
  }
}
