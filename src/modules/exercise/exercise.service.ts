import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { ExerciseList } from './interfaces/exercise.pb';
import { Exercise } from './schemas/exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>
  ) {}

  createExercise(exercise: Exercise): Promise<Exercise> {
    const newExercise = this.exerciseModel.create(exercise);
    return newExercise;
  }

  async getExercises(): Promise<ExerciseList> {
    const exercises = await this.exerciseModel.find();
    return { exercises };
  }

  async getExercise(id: string): Promise<Exercise> {
    const exercise = await this.exerciseModel.findById({
      _id: new ObjectId(id),
    });
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    return exercise;
  }

  async updateExercise(id: string, exercise: Exercise): Promise<Exercise> {
    const updatedExercise = await this.exerciseModel.findByIdAndUpdate(
      id,
      exercise,
      { new: true }
    );
    if (!updatedExercise) {
      throw new NotFoundException('Exercise not found');
    }
    return updatedExercise;
  }

  async deleteExercise(id: string): Promise<Exercise> {
    const deletedExercise = await this.exerciseModel.findByIdAndDelete({
      _id: new ObjectId(id),
    });
    if (!deletedExercise) {
      throw new NotFoundException('Exercise not found');
    }
    return deletedExercise;
  }

  async getExerciseByName(name: string): Promise<Exercise> {
    const exercise = await this.exerciseModel.findOne({ name });
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    return exercise;
  }

  async getExerciseByCategory(category: string): Promise<ExerciseList> {
    const exercises = await this.exerciseModel.find({ category });
    return { exercises };
  }
}
