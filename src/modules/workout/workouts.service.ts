import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    const createdWorkout = this.workoutModel.create(createWorkoutDto);
    return createdWorkout;
  }

  async getWorkouts(): Promise<WorkoutList> {
    const workouts = await this.workoutModel.find();
    return { workouts } as WorkoutList;
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

  async getWorkoutsByCategory(category: string): Promise<WorkoutList> {
    const workouts = await this.workoutModel.find({ category });
    return { workouts } as WorkoutList;
  }

  async getWorkoutsByExerciseId(exerciseId: string): Promise<WorkoutList> {
    const workouts = await this.workoutModel.find({
      exercises: { $elemMatch: { exerciseId } },
    });
    return { workouts } as WorkoutList;
  }

  async deleteWorkout(id: string): Promise<Workout> {
    const workout = await this.workoutModel.findByIdAndDelete({ _id: id });
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    return workout;
  }

  async updateWorkout(id: string, updateWorkout: Workout): Promise<Workout> {
    const updatedWorkout = (await this.workoutModel.findByIdAndUpdate(
      { _id: id },
      updateWorkout,
      { new: true }
    )) as Workout;

    return updatedWorkout;
  }
}
