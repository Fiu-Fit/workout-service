import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { WorkoutsModule } from './modules/workout/workouts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WorkoutsModule,
    ExerciseModule,
    MongooseModule.forRoot(process.env.MONGODB_URL || ''),
  ],
  controllers: [],
})
export class AppModule {}
