import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../user/entities/user.entity';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    //const review = this.reviewRepository.create(createUserDto);
    const review = new Review();
    review.comment = createReviewDto.comment;
    const owner = await this.userRepository.findOne({
      where: { id: createReviewDto.ownerId },
    });
    review.owner = owner;
    return await this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find();
  }

  async findOne(id: string): Promise<Review> {
    return await this.reviewRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<UpdateResult> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new Error('Review not found');
    }
    return await this.reviewRepository.update(review, { ...updateReviewDto });
  }

  async remove(id: string): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
