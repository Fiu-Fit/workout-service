import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Exercise } from 'src/modules/exercise/schemas/exercise.schema';
import { HydratedDocument } from 'mongoose';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  duration: number;

  @Prop()
  difficulty: number;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop([Number])
  athleteIds: number[];

  @Prop()
  authorId: number;

  // @Prop()
  // exercises: ExerciseInfo[];
}

// const ExcerciseInfo = new Schema({
//   exercise: Exercise,
//   repetitions?: Number,
//   duration?: Number,
// })

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
