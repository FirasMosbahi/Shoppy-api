import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cart } from "../cart/entities/cart.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = new User();
    user.mail = createUserDto.mail;
    const hash = await bcrypt.hash(createUserDto.password, 10);
    user.password = hash;
    console.log(user);
    await this.userRepository.save(user);
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
      where: { mail: userCredentials.mail },
    });
    console.log(user);
    if (user) {
      // const hashedCredential = await bcrypt.hash(userCredentials.password, 10);
      // console.log(hashedCredential);
      // console.log(user.password);
      const match: boolean = await bcrypt.compare(
        userCredentials.password,
        user.password,
      );
      if (match) {
        const payload = { mail: user.mail, id: user.id };
        const accessToken = this.jwtService.sign(payload);
        return { token: accessToken, id: user.id };
      } else {
        throw new UnauthorizedException('Wrong credentials');
      }
    } else {
      throw new NotFoundException('No user name with those credentials');
    }
  }
}
