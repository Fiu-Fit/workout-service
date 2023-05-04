import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { WorkoutsController } from './workouts.controllers';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
    HttpModule,
  ],
  exports:     [WorkoutsService],
  controllers: [WorkoutsController],
  providers:   [WorkoutsService],
})
export class WorkoutsModule {}
