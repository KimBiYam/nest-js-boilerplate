import { PasswordTransformer } from '../../util/password-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Posts } from './posts';

@Entity({ name: 'users' })
@Unique(['userId', 'email'])
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    type: 'varchar',
    transformer: new PasswordTransformer(),
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'tinyint', default: true })
  isActive: boolean;

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];
}
