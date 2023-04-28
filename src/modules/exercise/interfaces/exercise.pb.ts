/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'exercise';

export interface ExerciseId {
  id: string;
}

export interface Exercise {
  name: string;
  description: string;
  category: string;
}

export interface Empty {}

export interface ExerciseList {
  exercises: Exercise[];
}

export interface ExercisePutRequest {
  id: string;
  exercise: Exercise;
}

export interface ExerciseName {
  name: string;
}

export interface ExerciseCategory {
  category: string;
}

export const EXERCISE_PACKAGE_NAME = 'exercise';

export interface ExerciseServiceClient {
  create(request: Exercise): Observable<Exercise>;

  findById(request: ExerciseId): Observable<Exercise>;

  findByName(request: ExerciseName): Observable<Exercise>;

  findByCategory(request: ExerciseCategory): Observable<ExerciseList>;

  findAll(request: Empty): Observable<ExerciseList>;

  put(request: ExercisePutRequest): Observable<Exercise>;

  deleteById(request: ExerciseId): Observable<Exercise>;
}

export interface ExerciseServiceController {
  create(
    request: Exercise
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findById(
    request: ExerciseId
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findByName(
    request: ExerciseName
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findByCategory(
    request: ExerciseCategory
  ): Promise<ExerciseList> | Observable<ExerciseList> | ExerciseList;

  findAll(
    request: Empty
  ): Promise<ExerciseList> | Observable<ExerciseList> | ExerciseList;

  put(
    request: ExercisePutRequest
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  deleteById(
    request: ExerciseId
  ): Promise<Exercise> | Observable<Exercise> | Exercise;
}

export function ExerciseServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'create',
      'findById',
      'findByName',
      'findByCategory',
      'findAll',
      'put',
      'deleteById',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('ExerciseService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('ExerciseService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const EXERCISE_SERVICE_NAME = 'ExerciseService';
