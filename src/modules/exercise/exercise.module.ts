import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { grpcClientOptions } from 'grpc-client-options';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { EXERCISE_SERVICE_NAME } from './interfaces/exercise.pb';
import { Exercise, ExerciseSchema } from './schemas/exercise.schema';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EXERCISE_SERVICE_NAME,
        ...grpcClientOptions,
      },
    ]),
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  exports:     [ExerciseService],
  controllers: [ExerciseController],
  providers:   [ExerciseService],
})
export class ExerciseModule {}
