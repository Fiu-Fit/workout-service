import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkoutDocument = HydratedDocument<Workout>;

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

  @Prop([Number])
  athleteIds: number[];

  @Prop()
  authorId: number;

  @Prop({ type: [] })
  exercises: {
    exerciseId: string;
    repetitions?: number;
    duration?: number;
  };
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
