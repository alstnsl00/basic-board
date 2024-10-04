import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { Comment } from '../entities/comment.entity';
import { PostService } from '../post/post.service';
import { CreateCommentDto } from '../dtos/comment.dto';
import { KeywordAlertService } from '../keyword-alert/keyword-alert.service';
import { KeywordAlertDto } from '../dtos/keyword-alert.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private postService: PostService,
    private keywordAlertService: KeywordAlertService,
  ) {}

  async getCommentsByPost(
    postId: number,
    page: number,
    limit: number,
  ): Promise<Comment[]> {
    const post = await this.postService.findOne(postId);
    if (!post) throw new NotFoundException('Post not found');

    const offset = (page - 1) * limit;

    return this.commentRepository.find({
      where: { post: { id: postId }, parent_comment_id: IsNull() },
      skip: offset,
      take: limit,
      relations: ['replies'],
      order: { created_at: 'ASC' },
    });
  }

  async createComment(
    postId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const post = await this.postService.findOne(postId);
    delete post.password;

    const parentComment = createCommentDto.parentCommentId
      ? await this.commentRepository.findOneBy({
          id: createCommentDto.parentCommentId,
        })
      : null;

    if (createCommentDto.parentCommentId && !parentComment)
      throw new NotFoundException('Commnet not found');

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      author: createCommentDto.author,
      post,
      parentComment,
    });

    await this.commentRepository.save(comment);

    const keywordAlertDto: KeywordAlertDto = {
      author: comment.author,
      keyword: comment.content,
    };

    await this.keywordAlertService.checkForKeywords(keywordAlertDto);

    return comment;
  }
}
