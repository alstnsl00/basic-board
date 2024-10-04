import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeywordAlert } from '../entities/keyword-alert.entity';
import { KeywordAlertDto } from '../dtos/keyword-alert.dto';

@Injectable()
export class KeywordAlertService {
  constructor(
    @InjectRepository(KeywordAlert)
    private keywordAlertRepository: Repository<KeywordAlert>,
  ) {}

  async checkForKeywords(keywordAlertDto: KeywordAlertDto): Promise<void> {
    const { author, keyword } = keywordAlertDto;
    const alerts = await this.keywordAlertRepository.find({
      where: { author },
    });
    alerts.forEach((alert) => {
      if (keyword.includes(alert.keyword)) {
        this.sendAlert(alert);
      }
    });
  }

  sendAlert(alert: KeywordAlert) {
    console.log(
      `Keyword "${alert.keyword}" detected for author ${alert.author}`,
    );
    // 실제 알림 전송 로직 (생략)
  }
}
