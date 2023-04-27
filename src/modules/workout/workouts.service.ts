import { LoggerFactory } from '@fiu-fit/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { WorkoutDto } from './dto/workout.dto';
import { WorkoutList } from './interfaces/workout.pb';
import { Workout } from './schemas/workout.schema';

const logger = LoggerFactory('WorkoutService');

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name)
    private workoutModel: Model<Workout>
  ) {}

  createWorkout(createWorkoutDto: WorkoutDto): Promise<Workout> {
    logger.info('Request body: ', createWorkoutDto);
    const createdWorkout = new this.workoutModel(createWorkoutDto);
    return createdWorkout.save();
  }

  async getWorkouts(): Promise<WorkoutList> {
    const workouts = await this.workoutModel.find();
    return { workouts } as WorkoutList;
  }

  async getWorkoutById(id: string): Promise<Workout> {
    logger.info('Request body: ', id);
    const workout = await this.workoutModel.findOne({ _id: new ObjectId(id) });
    if (!workout) {
      throw new NotFoundException('Exercise not found');
    }
    return workout;
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
