import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '../../shared/rpc-exceptions/NotFoundException';
import { WorkoutDto } from './dto/workout.dto';
import { Workouts } from './interfaces/workout.pb';
import { Workout } from './schemas/workout.schema';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name)
    private workoutModel: Model<Workout>
  ) {}

  createWorkout(newWorkout: WorkoutDto): Promise<Workout> {
    const createdWorkout = this.workoutModel.create(newWorkout);
    return createdWorkout;
  }

  async getWorkouts(): Promise<Workouts> {
    const workouts = await this.workoutModel.find();
    return { workouts } as Workouts;
  }

  async getWorkoutById(id: string): Promise<Workout> {
    const workout = await this.workoutModel.findById({ _id: id });
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    return workout;
  }

  async getWorkoutByName(name: string): Promise<Workout> {
    const workout = await this.workoutModel.findOne({ name });
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    return workout;
  }

  async getWorkoutsByCategory(category: string): Promise<Workouts> {
    const workouts = await this.workoutModel.find({ category });
    return { workouts } as Workouts;
  }

  async getWorkoutsByExerciseId(exerciseId: string): Promise<Workouts> {
    const workouts = await this.workoutModel.find({
      exercises: { $elemMatch: { exerciseId } },
    });
    return { workouts } as Workouts;
  }

  async deleteWorkout(id: string): Promise<Workout> {
    const workout = await this.workoutModel.findByIdAndDelete({ _id: id });
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    return workout;
  }

  async updateWorkout(id: string, workout: WorkoutDto): Promise<Workout> {
    const updatedWorkout = (await this.workoutModel.findByIdAndUpdate(
      { _id: id },
      workout,
      { new: true }
    )) as Workout;

    return updatedWorkout;
  }
}
