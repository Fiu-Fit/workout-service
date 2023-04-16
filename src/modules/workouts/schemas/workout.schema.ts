import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  duration: number;

  @Prop()
  category: string;

  @Prop([Number])
  athleteIds: number[];

  @Prop()
  authorId: number;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
