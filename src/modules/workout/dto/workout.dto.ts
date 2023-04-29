import { WorkoutExercise } from '../interfaces/workout.pb';

export class WorkoutDto {
  name: string;

  description?: string;

  duration: number;

  difficulty: number;

  category?: string;

  exercises: WorkoutExercise[];

  athleteIds: number[] = [];

  authorId: number;
}
