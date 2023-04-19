import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { WorkoutDto } from './dto/workout.dto';
import { Workout } from './schemas/workout.schema';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel('WORKOUT_MODEL')
    private workoutModel: Model<Workout>,
    @InjectConnection('workouts')
    private connection: Connection
  ) {}

  createWorkout(createWorkoutDto: WorkoutDto): Promise<Workout> {
    const createdWorkout = new this.workoutModel(createWorkoutDto);
    return createdWorkout.save();
  }

  async getWorkouts(): Promise<Workout[]> {
    const workouts = await this.workoutModel.find();
    return workouts;
  }

  async getWorkoutById(id: string): Promise<Workout | null> {
    const workout = (await this.workoutModel.findById(id)) as Workout;
    return workout;
  }

  async deleteWorkout(id: string): Promise<Workout> {
    const deletedWorkout = (await this.workoutModel.findByIdAndDelete(
      id
    )) as Workout;
    return deletedWorkout;
  }

  async updateWorkout(
    id: string,
    updateWorkoutDto: WorkoutDto
  ): Promise<Workout> {
    const updatedProduct = (await this.workoutModel.findByIdAndUpdate(
      id,
      updateWorkoutDto
    )) as Workout;
    return updatedProduct;
  }
}
