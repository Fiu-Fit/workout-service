import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseList } from './interfaces/exercise.pb';
import { Exercise } from './schemas/exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>
  ) {}

  createExercise(exerciseDTO: ExerciseDTO): Promise<Exercise> {
    const exercise = new this.exerciseModel(exerciseDTO);
    return exercise.save();
  }

  async getExercises(): Promise<ExerciseList> {
    const exercises = await this.exerciseModel.find();
    return { exercises };
  }

  async getExercise(exerciseID: string): Promise<Exercise> {
    const exercise = await this.exerciseModel.findById(exerciseID);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    return exercise;
  }

  async updateExercise(
    exerciseID: string,
    exerciseDTO: ExerciseDTO
  ): Promise<Exercise> {
    const updatedExercise = await this.exerciseModel.findByIdAndUpdate(
      exerciseID,
      exerciseDTO,
      { new: true }
    );
    if (!updatedExercise) {
      throw new NotFoundException('Exercise not found');
    }
    return updatedExercise;
  }

  // Detele Exercise
  async deleteExercise(exerciseID: string): Promise<Exercise> {
    const deletedExercise = await this.exerciseModel.findByIdAndDelete(
      exerciseID
    );
    if (!deletedExercise) {
      throw new NotFoundException('Exercise not found');
    }
    return deletedExercise;
  }
}
