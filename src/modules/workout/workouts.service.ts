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

  getWorkouts(): Promise<Workout[]> {
    return this.workoutModel.find();
  }

  async getWorkoutById(id: string): Promise<Workout> {
    const workout = await this.workoutModel.findById({ _id: id });
    if (!workout) {
      throw new BadRequestException('Workout not found');
    }
    return workout;
  }

  async getWorkoutByName(name: string): Promise<Workout> {
    const workout = await this.workoutModel.findOne({ name });
    if (!workout) {
      throw new BadRequestException('Workout not found');
    }
    return workout;
  }

  getWorkoutsByCategory(category: string): Promise<Workout[]> {
    return this.workoutModel.find({ category });
  }

  async deleteWorkout(id: number): Promise<Workout> {
    const workout = await this.workoutModel.findByIdAndDelete({ _id: id });
    if (!workout) {
      throw new BadRequestException('Workout not found');
    }
    return workout;
  }

  async updateWorkout(id: number, workout: Workout): Promise<Workout> {
    const updatedWorkout = (await this.workoutModel.findByIdAndUpdate(
      { _id: id },
      workout,
      { new: true }
    )) as Workout;

    return updatedWorkout;
  }
}
