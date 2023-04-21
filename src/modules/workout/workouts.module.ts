import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { grpcClientOptions } from 'grpc-client-options';
import { WORKOUT_SERVICE_NAME } from './interfaces/workout.pb';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { WorkoutsController } from './workouts.controllers';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: WORKOUT_SERVICE_NAME,
        ...grpcClientOptions,
      },
    ]),
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
  ],
  exports:     [WorkoutsService],
  controllers: [WorkoutsController],
  providers:   [WorkoutsService],
})
export class WorkoutsModule {}
