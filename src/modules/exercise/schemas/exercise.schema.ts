import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExerciseDocument = HydratedDocument<Exercise>;

@Schema()
export class Exercise {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
