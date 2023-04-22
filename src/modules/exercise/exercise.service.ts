import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseDTO } from './dto/exercise.dto';
import { Exercise } from './interfaces/exercise.interface';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel('Exercise') private readonly exerciseModel: Model<Exercise>
  ) {}

  // Get all exercises
  async getExercises(): Promise<Exercise[]> {
    const exercises = await this.exerciseModel.find();
    return exercises;
  }

  // Get a single exercise
  async getExercise(exerciseID: string): Promise<Exercise> {
    const exercise = await this.exerciseModel.findById(exerciseID);
    if (!exercise) {
      throw new NotFoundException('Exercise with ID ${exerciseID} not found');
    }
    return exercise;
  }

  // Post a single exercise
  createExercise(createExerciseDTO: CreateExerciseDTO): Promise<Exercise> {
    const exercise = new this.exerciseModel(createExerciseDTO);
    return exercise.save();
  }

  // Put a single exercise
  async updateExercise(
    exerciseID: string,
    createProductDTO: CreateExerciseDTO
  ): Promise<Exercise> {
    const updatedExercise = await this.exerciseModel.findByIdAndUpdate(
      exerciseID,
      createProductDTO,
      { new: true }
    );
    if (!updatedExercise) {
      throw new NotFoundException('Exercise with ID ${exerciseID} not found');
    }
    return updatedExercise;
  }

  // Detele Exercise
  async deleteExercise(exerciseID: string): Promise<Exercise> {
    const deletedExercise = await this.exerciseModel.findByIdAndDelete(
      exerciseID
    );
    if (!deletedExercise) {
      throw new NotFoundException('Exercise with ID ${exerciseID} not found');
    }
    return deletedExercise;
  }
}
