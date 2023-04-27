import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { WorkoutDto } from './dto/workout.dto';
import { WorkoutList } from './interfaces/workout.pb';
import { Workout } from './schemas/workout.schema';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name)
    private workoutModel: Model<Workout>
  ) {}

  createWorkout(createWorkoutDto: WorkoutDto): Promise<Workout> {
    const createdWorkout = new this.workoutModel(createWorkoutDto);
    return createdWorkout.save();
  }

  async getWorkouts(): Promise<WorkoutList> {
    const workouts = await this.workoutModel.find();
    return { workouts } as WorkoutList;
  }

  async getWorkoutById(id: string): Promise<Workout> {
    const workout = await this.workoutModel.findById({ _id: new ObjectId(id) });
    if (!workout) {
      throw new NotFoundException('Exercise not found');
    }
    return workout;
  }

  async getWorkoutByName(name: string): Promise<Workout> {
    const workout = await this.workoutModel.findOne({ name });
    if (!workout) {
      throw new NotFoundException('Exercise not found');
    }
    return workout;
  }

  async getWorkoutsByCategory(category: string): Promise<WorkoutList> {
    const workouts = await this.workoutModel.find({ category });
    return { workouts } as WorkoutList;
  }

  async deleteWorkout(id: string): Promise<Workout> {
    const workout = await this.workoutModel.findByIdAndDelete({
      _id: new ObjectId(id),
    });
    if (!workout) {
      throw new NotFoundException('Exercise not found');
    }
    return workout;
  }

  async updateWorkout(id: string, updateWorkout: WorkoutDto): Promise<Workout> {
    const updatedWorkout = (await this.workoutModel.findByIdAndUpdate(
      id,
      updateWorkout,
      { new: true }
    )) as Workout;
    return updatedWorkout;
  }
}
