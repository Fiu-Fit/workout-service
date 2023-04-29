import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExerciseDto } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';
import {
  EXERCISE_SERVICE_NAME,
  Exercise,
  ExerciseCategory,
  ExerciseId,
  ExerciseName,
  Exercises,
} from './interfaces/exercise.pb';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'create')
  createExercise(exercise: ExerciseDto): Promise<Exercise> {
    return this.exerciseService.createExercise(exercise);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findAll')
  getExercises(): Promise<Exercises> {
    return this.exerciseService.getExercises();
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findById')
  getExercise({ id }: ExerciseId): Promise<Exercise> {
    return this.exerciseService.getExercise(id);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'put')
  updateExercise(exerciseRequest: Exercise): Promise<Exercise> {
    return this.exerciseService.updateExercise(
      exerciseRequest.id,
      exerciseRequest
    );
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'deleteById')
  deleteExercise({ id }: ExerciseId): Promise<Exercise> {
    return this.exerciseService.deleteExercise(id);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findByName')
  getExerciseByName({ name }: ExerciseName): Promise<Exercise> {
    return this.exerciseService.getExerciseByName(name);
  }

  @GrpcMethod(EXERCISE_SERVICE_NAME, 'findByCategory')
  getExerciseByCategory({ category }: ExerciseCategory): Promise<Exercises> {
    return this.exerciseService.getExerciseByCategory(category);
  }
}
