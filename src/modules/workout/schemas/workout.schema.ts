import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WorkoutDocument = HydratedDocument<Workout>;

enum Units {
  SECONDS = 0,
  MINUTES = 1,
  HOURS = 2,
  REPETITIONS = 3,
  METERS = 4,
  KILOMETERS = 5,
  UNRECOGNIZED = -1,
}

@Schema()
export class WorkoutExercise {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' })
  exerciseId: string;

  @Prop()
  repetitions: number;

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

  @Prop()
  duration: number;

  @Prop({ required: true, min: 1, max: 5 })
  difficulty: number;

  @Prop()
  category: string;

  @Prop([WorkoutExercise])
  exercises: WorkoutExercise[];

  @Prop([Number])
  athleteIds: number[];

  @Prop()
  authorId: number;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
