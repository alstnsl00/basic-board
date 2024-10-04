import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty({ description: '게시글 제목' })
  title: string;

  @IsString()
  @ApiProperty({ description: '게시글 내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '게시글 작성자' })
  author: string;

  @IsString()
  @ApiProperty({ description: '게시글 비밀번호' })
  password: string;
}

export class UpdatePostDto {
  @IsString()
  @ApiProperty({ description: '게시글 제목', required: false })
  title?: string;

  @IsString()
  @ApiProperty({ description: '게시글 내용', required: false })
  content?: string;

  @IsString()
  @ApiProperty({ description: '게시글 비밀번호' })
  password: string;
}

export class DeletePostDto {
  @IsString()
  @ApiProperty({ description: '게시글 비밀번호' })
  password: string;
}
