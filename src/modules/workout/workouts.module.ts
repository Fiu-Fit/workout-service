import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { grpcClientOptions } from 'grpc-client-options';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { WorkoutsController } from './workouts.controllers';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WorkoutsService',
        ...grpcClientOptions,
      },
    ]),
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
  ],
  controllers: [WorkoutsController],
  providers:   [WorkoutsService],
})
export class WorkoutsModule {}
