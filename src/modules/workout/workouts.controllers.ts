import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkoutDto } from './dto/workout.dto';
import { Workout } from './interfaces/workout.pb';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Get()
  getWorkouts(): Promise<Workout[]> {
    return this.workoutsService.getWorkouts();
  }

  @Post('create')
  createWorkout(@Body() createWorkoutDto: WorkoutDto): Promise<Workout> {
    return this.workoutsService.createWorkout(createWorkoutDto);
  }

  @Get(':id')
  getWorkoutById(@Param('id') id: string): Promise<Workout> {
    return this.workoutsService.getWorkoutById(id);
  }

  @Get('name/:name')
  getWorkoutByName(@Param('name') name: string): Promise<Workout> {
    return this.workoutsService.getWorkoutByName(name);
  }

  @Get('category/:category')
  getWorkoutsByCategory(
    @Param('category') category: string
  ): Promise<Workout[]> {
    return this.workoutsService.getWorkoutsByCategory(category);
  }

  @Delete(':id')
  deleteWorkout(@Param('id') id: string): Promise<WorkoutDto> {
    const deletedWorkout = this.workoutsService.deleteWorkout(id);
    return deletedWorkout;
  }

  @Put(':id')
  updateWorkout(
    @Param('id') id: string,
    @Body() workout: Workout
  ): Promise<Workout> {
    return this.workoutsService.updateWorkout(id, workout);
  }
}
