import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WorkoutDto } from './dto/workout.dto';
import {
  ExerciseId,
  WORKOUT_SERVICE_NAME,
  Workout,
  WorkoutCategory,
  WorkoutId,
  WorkoutName,
  Workouts,
} from './interfaces/workout.pb';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findAll')
  getWorkouts(): Promise<Workouts> {
    return this.workoutsService.getWorkouts();
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'create')
  createWorkout(@Body() createWorkoutDto: WorkoutDto): Promise<Workout> {
    return this.workoutsService.createWorkout(createWorkoutDto);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findById')
  getWorkoutById(workoutId: WorkoutId): Promise<Workout> {
    return this.workoutsService.getWorkoutById(workoutId.id);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findByName')
  getWorkoutByName(workoutName: WorkoutName): Promise<Workout> {
    return this.workoutsService.getWorkoutByName(workoutName.name);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findByCategory')
  getWorkoutsByCategory(workoutCategory: WorkoutCategory): Promise<Workouts> {
    return this.workoutsService.getWorkoutsByCategory(workoutCategory.category);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findByExerciseId')
  getWorkoutsByExerciseId(exerciseId: ExerciseId): Promise<Workouts> {
    return this.workoutsService.getWorkoutsByExerciseId(exerciseId.exerciseId);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'deleteById')
  deleteWorkout(workoutId: WorkoutId): Promise<WorkoutDto> {
    const deletedWorkout = this.workoutsService.deleteWorkout(workoutId.id);
    return deletedWorkout;
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'put')
  updateWorkout(workoutRequest: Workout): Promise<Workout> {
    return this.workoutsService.updateWorkout(
      workoutRequest.id,
      workoutRequest
    );
  }
}
