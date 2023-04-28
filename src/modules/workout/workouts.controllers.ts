import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WorkoutDto } from './dto/workout.dto';
import {
  ExerciseId,
  WORKOUT_SERVICE_NAME,
  WorkoutCategory,
  WorkoutId,
  WorkoutList,
  WorkoutName,
  WorkoutPutRequest,
} from './interfaces/workout.pb';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findAll')
  getWorkouts(): Promise<WorkoutList> {
    return this.workoutsService.getWorkouts();
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'create')
  createWorkout(@Body() createWorkoutDto: WorkoutDto): Promise<WorkoutDto> {
    const workout = this.workoutsService.createWorkout(createWorkoutDto);
    return workout;
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findById')
  getWorkoutById(workoutId: WorkoutId): Promise<WorkoutDto> {
    return this.workoutsService.getWorkoutById(workoutId.id);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findByName')
  getWorkoutByName(workoutName: WorkoutName): Promise<WorkoutDto> {
    return this.workoutsService.getWorkoutByName(workoutName.name);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findByCategory')
  getWorkoutsByCategory(
    workoutCategory: WorkoutCategory
  ): Promise<WorkoutList> {
    return this.workoutsService.getWorkoutsByCategory(workoutCategory.category);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findByExerciseId')
  getWorkoutsByExerciseId(exerciseId: ExerciseId): Promise<WorkoutList> {
    return this.workoutsService.getWorkoutsById(exerciseId.exerciseId);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'deleteById')
  deleteWorkout(workoutId: WorkoutId): Promise<WorkoutDto> {
    const deletedWorkout = this.workoutsService.deleteWorkout(workoutId.id);
    return deletedWorkout;
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'put')
  updateWorkout(workoutRequest: WorkoutPutRequest): Promise<WorkoutDto> {
    return this.workoutsService.updateWorkout(
      workoutRequest.id,
      workoutRequest.workout
    );
  }
}
