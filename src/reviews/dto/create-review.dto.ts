import { MaxLength, MinLength } from 'class-validator';

export class CreateReviewDto {
  @MinLength(15, { message: 'please provide a longer review' })
  @MaxLength(125, { message: 'review is too long' })
  comment: string;
  ownerId: string;
}
