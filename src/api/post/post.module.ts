import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { KeywordAlertModule } from '../keyword-alert/keyword-alert.module'; // 추가

@Module({
  imports: [TypeOrmModule.forFeature([Post]), KeywordAlertModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
