import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({ description: '댓글 내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '댓글 작성자' })
  author: string;

  @IsNumber()
  @ApiProperty({ description: '댓글의 댓글 ID', required: false })
  parentCommentId?: number;
}
