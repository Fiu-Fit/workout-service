import { Body, Controller, NotFoundException, Param } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WorkoutDto } from './dto/workout.dto';
import { WORKOUT_SERVICE_NAME, WorkoutList } from './interfaces/workout.pb';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'create')
  createWorkout(@Body() createWorkoutDto: WorkoutDto): Promise<WorkoutDto> {
    const workout = this.workoutsService.createWorkout(createWorkoutDto);
    return workout;
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findAll')
  getWorkouts(): Promise<WorkoutList> {
    return this.workoutsService.getWorkouts();
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findById')
  getWorkout(id: string): Promise<WorkoutDto | null> {
    return this.workoutsService.getWorkoutById(id);
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'deleteById')
  deleteWorkout(id: string): Promise<WorkoutDto> {
    try {
      return this.workoutsService.deleteWorkout(id);
    } catch (e) {
      if ((e as any)?.code === 'P2025') {
        throw new NotFoundException('Workout not found');
      }
      throw e;
    }
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'updateWorkoutById')
  updateWorkout(
    @Param('workoutID') workoutID: string,
    @Body() workoutDto: WorkoutDto
  ): Promise<WorkoutDto> {
    return this.workoutsService.updateWorkout(workoutID, workoutDto);
  }
}
