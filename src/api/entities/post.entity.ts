import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @Index({ fulltext: true })
  title: string;

  @Column('text')
  content: string;

  @Column({ length: 100 })
  @Index({ fulltext: true })
  author: string;

  @Column({ length: 100 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];
}
