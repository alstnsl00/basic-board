import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    ['/api-docs'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('basic-board')
    .setDescription('댓글 기능이 있는 익명 게시판 및 키워드 알림 기능 구현')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
