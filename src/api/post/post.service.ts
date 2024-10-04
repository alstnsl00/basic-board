import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Post } from '../entities/post.entity';
import { CreatePostDto, DeletePostDto, UpdatePostDto } from '../dtos/post.dto';
import { KeywordAlertService } from '../keyword-alert/keyword-alert.service';
import { KeywordAlertDto } from '../dtos/keyword-alert.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private keywordAlertService: KeywordAlertService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const hashedPassword = await bcrypt.hash(createPostDto.password, 10);
    createPostDto.password = hashedPassword;

    const post = this.postRepository.create(createPostDto);

    const result = await this.postRepository.save(post);
    delete result.password;

    const keywordAlertDto: KeywordAlertDto = {
      author: post.author,
      keyword: post.content,
    };

    await this.keywordAlertService.checkForKeywords(keywordAlertDto);

    return result;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');

    if (!(await bcrypt.compare(updatePostDto.password, post.password))) {
      throw new UnauthorizedException('Incorrect password');
    }
    delete updatePostDto.password;

    Object.assign(post, updatePostDto);

    const result = await this.postRepository.save(post);
    delete result.password;

    return result;
  }

  async deletePost(id: number, deletePostDto: DeletePostDto): Promise<void> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');

    if (!(await bcrypt.compare(deletePostDto.password, post.password))) {
      throw new UnauthorizedException('Incorrect password');
    }

    await this.postRepository.remove(post);
  }

  async getPaginatedPosts(
    page: number,
    limit: number,
    title?: string,
    author?: string,
  ): Promise<Post[]> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    if (title || author) {
      const fullTextQuery = [];

      if (title) {
        fullTextQuery.push(
          `MATCH(post.title) AGAINST (:title IN NATURAL LANGUAGE MODE)`,
        );
      }

      if (author) {
        fullTextQuery.push(
          `MATCH(post.author) AGAINST (:author IN NATURAL LANGUAGE MODE)`,
        );
      }

      queryBuilder.where(fullTextQuery.join(' AND '), { title, author });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    const posts = queryBuilder.getMany();

    const result = (await posts).map((e) => {
      delete e.password;
      return e;
    });

    return result;
  }

  async findOne(postId: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
