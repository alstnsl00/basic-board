import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from '../dtos/comment.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('posts/:postId/comments')
@ApiTags('댓글 관련 처리')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @ApiOperation({ summary: '댓글 목록 조회' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getComments(
    @Param('postId') postId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.commentService.getCommentsByPost(postId, page, limit);
  }

  @Post()
  @ApiOperation({ summary: '댓글 작성 (댓글의 댓글 포함)' })
  createComment(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(postId, createCommentDto);
  }
}
