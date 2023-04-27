import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  duration: number;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop([Number])
  athleteIds: number[];

  @Prop()
  authorId: number;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
