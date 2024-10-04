import { Module } from '@nestjs/common';
import { KeywordAlertService } from './keyword-alert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordAlert } from '../entities/keyword-alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordAlert])],
  providers: [KeywordAlertService],
  exports: [KeywordAlertService],
})
export class KeywordAlertModule {}
