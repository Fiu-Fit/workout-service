import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RatingDto } from './dto/rating.dto';
import { Rating } from './schemas/rating.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private ratingModel: Model<Rating>
  ) {}

  createRating(newRating: RatingDto): Promise<Rating> {
    return this.ratingModel.create(newRating);
  }

  getRatings(): Promise<Rating[]> {
    return this.ratingModel.find({});
  }

  async getRatingById(id: string): Promise<Rating> {
    const rating = await this.ratingModel.findById({ _id: id });
    if (!rating) {
      throw new BadRequestException('Exercise not found');
    }
    return rating;
  }

  async deleteRating(id: string): Promise<Rating> {
    const rating = await this.ratingModel.findByIdAndDelete({ _id: id });
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    return rating;
  }

  async updateRating(id: string, exercise: Rating): Promise<Rating> {
    const updatedRating = await this.ratingModel.findByIdAndUpdate(
      { _id: id },
      exercise,
      { new: true }
    );
    if (!updatedRating) {
      throw new NotFoundException('Exercise not found');
    }
    return updatedRating;
  }
}
