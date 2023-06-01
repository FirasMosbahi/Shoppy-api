import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existantUser = await this.userRepository.findOne({
      where: { mail: createUserDto.mail },
    });
    if (existantUser) {
      throw new BadRequestException('A user with this  email already exists');
    }
    const user = new User();
    user.mail = createUserDto.mail;
    user.password = createUserDto.password;
    user.reviews = [];
    user.cart = null;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update({ id }, { ...updateUserDto });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  async loginUser(userCredentials: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { ...userCredentials },
    });
    if (user) {
      return { result: 'logged in successfuly' };
    } else {
      throw new NotFoundException('No user name with those credentials');
    }
  }
}
