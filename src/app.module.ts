import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ExerciseModule } from './modules/exercise/exercise.module';

@Module({
  imports: [
    ExerciseModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
  ],
  controllers: [AppController],
  providers:   [],
})
export class AppModule {}
