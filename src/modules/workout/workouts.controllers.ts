import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { WorkoutDto } from './dto/workout.dto';
import { Workout, Workouts } from './interfaces/workout.pb';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Get()
  getWorkouts(): Promise<Workouts> {
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
  ): Promise<Workouts> {
    return this.workoutsService.getWorkoutsByCategory(category);
  }

  @Delete(':id')
  deleteWorkout(@Param('id', ParseIntPipe) id: number): Promise<WorkoutDto> {
    const deletedWorkout = this.workoutsService.deleteWorkout(id);
    return deletedWorkout;
  }

  @Put(':id')
  updateWorkout(
    @Param('id', ParseIntPipe) id: number,
    workoutRequest: Workout
  ): Promise<Workout> {
    return this.workoutsService.updateWorkout(id, workoutRequest);
  }
}
