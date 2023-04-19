import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutsModule } from './modules/workout/workouts.module';

@Module({
  imports: [
    WorkoutsModule,
    MongooseModule.forRoot(process.env.MONGODB_URL || ''),
  ],
  controllers: [],
})
export class AppModule {}
