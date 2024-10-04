import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { PostModule } from '../post/post.module';
import { KeywordAlertModule } from '../keyword-alert/keyword-alert.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    PostModule,
    KeywordAlertModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
