import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class KeywordAlertDto {
  @IsString()
  @ApiProperty({ description: '키워드 작성자' })
  author: string;

  @IsString()
  @ApiProperty({ description: '키워드' })
  keyword: string;
}
