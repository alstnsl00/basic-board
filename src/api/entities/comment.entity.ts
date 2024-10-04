import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ length: 100 })
  author: string;

  @Column({ nullable: true })
  post_id: number;

  @Column({ nullable: true })
  parent_comment_id: number;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies: Comment[];

  @CreateDateColumn()
  created_at: Date;
}
