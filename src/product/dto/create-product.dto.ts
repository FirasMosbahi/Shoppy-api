import { MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @MinLength(5, { message: 'product name is too short' })
  @MaxLength(25, { message: 'product name is too long' })
  name: string;
  @MinLength(15, { message: 'please provide a longer description' })
  @MaxLength(125, { message: 'description is too long' })
  description: string;
  price: number;
  quantity: number;
  photo: string;
}
