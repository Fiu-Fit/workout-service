import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutsModule } from './modules/workout/workouts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WorkoutsModule,
    MongooseModule.forRoot(process.env.MONGODB_URL || ''),
  ],
  controllers: [],
})
export class AppModule {}
