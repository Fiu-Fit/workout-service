import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExerciseDto } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';
import { Exercise } from './interfaces/exercise.pb';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Post('create')
  createExercise(@Body() newExercise: ExerciseDto): Promise<Exercise> {
    console.log(newExercise);
    return this.exerciseService.createExercise(newExercise);
  }

  @Get()
  getExercises(): Promise<Exercise[]> {
    return this.exerciseService.getExercises();
  }

  @Get(':id')
  getExercise(@Param('id') id: string): Promise<Exercise> {
    return this.exerciseService.getExercise(id);
  }

  @Put(':id')
  updateExercise(
    @Param('id') id: string,
    @Body() exercise: Exercise
  ): Promise<Exercise> {
    return this.exerciseService.updateExercise(id, exercise);
  }

  @Delete(':id')
  deleteExercise(@Param('id') id: string): Promise<Exercise> {
    return this.exerciseService.deleteExercise(id);
  }

  @Get('name/:name')
  getExerciseByName(@Param('name') name: string): Promise<Exercise> {
    return this.exerciseService.getExerciseByName(name);
  }

  @Get('category/:category')
  getExerciseByCategory(
    @Param('category') category: string
  ): Promise<Exercise[]> {
    return this.exerciseService.getExerciseByCategory(category);
  }
}
