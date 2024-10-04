import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, DeletePostDto, UpdatePostDto } from '../dtos/post.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('게시글 관련 처리')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @ApiOperation({ summary: '게시글 작성' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 수정' })
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  delete(@Param('id') id: number, @Body() deletePostDto: DeletePostDto) {
    return this.postService.deletePost(id, deletePostDto);
  }

  @Get()
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'author', required: false })
  async getPosts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('title') title?: string,
    @Query('author') author?: string,
  ) {
    return this.postService.getPaginatedPosts(page, limit, title, author);
  }
}
