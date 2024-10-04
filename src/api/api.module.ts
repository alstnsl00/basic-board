import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';
import { CommentModule } from './comment/comment.module';
import { CommentController } from './comment/comment.controller';
import { KeywordAlertModule } from './keyword-alert/keyword-alert.module';

@Module({
  imports: [PostModule, CommentModule, KeywordAlertModule],
  controllers: [PostController, CommentController],
})
export class ApiModule {}
