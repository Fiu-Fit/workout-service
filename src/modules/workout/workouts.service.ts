import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkoutDto } from './dto/workout.dto';
import { Workout } from './schemas/workout.schema';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name)
    private workoutModel: Model<Workout>
  ) {}

  createWorkout(newWorkout: WorkoutDto): Promise<Workout> {
    return this.workoutModel.create(newWorkout);
  }

  getWorkouts(
    q?: string,
    filters?: Record<
      string,
      string | number | [number, number] | { $gte: number; $lte: number }
    >
  ): Promise<Workout[]> {
    if (filters?.difficulty && Array.isArray(filters.difficulty)) {
      const [lower, upper] = filters.difficulty;
      filters.difficulty = { $gte: lower, $lte: upper };
    }

    return this.workoutModel.find({
      ...(q ? { $text: { $search: q, $caseSensitive: false } } : {}),
      ...filters,
    });
  }

  async getWorkoutById(id: string): Promise<Workout> {
    const workout = await this.workoutModel.findById({ _id: id });
    if (!workout) {
      throw new BadRequestException('Workout not found');
    }
    return workout;
  }

  async deleteWorkout(id: string): Promise<Workout> {
    const workout = await this.workoutModel.findByIdAndDelete({ _id: id });
    if (!workout) {
      throw new BadRequestException('Workout not found');
    }
    return workout;
  }

  async updateWorkout(id: string, exercise: Workout): Promise<Workout> {
    const updatedWorkout = await this.workoutModel.findByIdAndUpdate(
      { _id: id },
      exercise,
      { new: true }
    );
    if (!updatedWorkout) {
      throw new BadRequestException('Exercise not found');
    }
    return updatedWorkout;
  }
}
