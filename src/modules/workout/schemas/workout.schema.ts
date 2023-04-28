import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class ExerciseInfo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' })
  exerciseId: string;

  @Prop()
  repetitions: number;

  @Prop()
  duration: number;
}

@Schema()
export class Workout {
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

  @Prop([ExerciseInfo])
  exercises: ExerciseInfo[];

  @Prop([Number])
  athleteIds: number[];

  @Prop()
  authorId: number;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
