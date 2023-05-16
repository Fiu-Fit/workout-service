import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetQueryRatingDto } from './dto/get-query-rating.dto';
import { RatingDto } from './dto/rating.dto';
import { Rating } from './interfaces/rating.interface';
import { RatingService } from './rating.service';

@Controller('ratings')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Get()
  getRatings(@Query() filter: GetQueryRatingDto): Promise<Rating[]> {
    return this.ratingService.getRatings(filter);
  }

  @Post()
  createRating(@Body() rating: RatingDto): Promise<Rating> {
    return this.ratingService.createRating(rating);
  }

  @Get(':id')
  getRatingById(@Param('id') id: string): Promise<Rating> {
    return this.ratingService.getRatingById(id);
  }

  @Delete(':id')
  deleteRating(@Param('id') id: string): Promise<Rating> {
    const deletedRating = this.ratingService.deleteRating(id);
    return deletedRating;
  }

  @Put(':id')
  updateRating(
    @Param('id') id: string,
    @Body() rating: Rating
  ): Promise<Rating> {
    return this.ratingService.updateRating(id, rating);
  }
}
