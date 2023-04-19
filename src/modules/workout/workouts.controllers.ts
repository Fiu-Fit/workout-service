import { Body, Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WorkoutDto } from './dto/workout.dto';
import { WORKOUT_SERVICE_NAME } from './interfaces/workout.pb';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'freate')
  async createWorkout(
    @Body() createWorkoutDto: WorkoutDto
  ): Promise<WorkoutDto> {
    const workout = await this.workoutsService.createWorkout(createWorkoutDto);
    return workout;
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findAll')
  getWorkouts(): Promise<WorkoutDto[]> {
    return this.workoutsService.getWorkouts();
  }

  @GrpcMethod(WORKOUT_SERVICE_NAME, 'findById')
  getWorkout(id: string): Promise<WorkoutDto | null> {
    return this.workoutsService.getWorkoutById(id);
  }

  @GrpcMethod('WorkoutService', 'deleteById')
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

  @GrpcMethod('WorkoutService', 'updateWorkoutById')
  updateWorkout(id: string, updateWorkoutDto: WorkoutDto): Promise<WorkoutDto> {
    return this.workoutsService.updateWorkout(id, updateWorkoutDto);
  }
}
