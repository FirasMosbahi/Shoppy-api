import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  comment: string;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne((type) => User, { eager: true })
  @JoinColumn({ name: 'owner', referencedColumnName: 'id' })
  owner: User;
}
