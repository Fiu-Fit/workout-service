import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category, Units } from '../interfaces/workout.pb';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class WorkoutExercise {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' })
  exerciseId: string;

  @Prop()
  sets: number;

  @Prop()
  reps: number;

  @Prop()
  weight?: number;

  @Prop()
  units: Units;
}

@Schema()
export class Workout {
  @Prop({ type: String, name: '_id' })
  id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true, min: 1, max: 5 })
  difficulty: number;

  @Prop({ required: true })
  category: Category;

  @Prop([WorkoutExercise])
  exercises: WorkoutExercise[];

  @Prop([Number])
  athleteIds: number[];

  @Prop({ required: true })
  authorId: number;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  completedAt?: Date;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
