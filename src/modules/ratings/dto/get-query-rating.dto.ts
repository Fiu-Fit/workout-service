import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetQueryRatingDto {
  @IsOptional()
  @IsString()
  workoutId?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  athleteId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rating?: number;
}
