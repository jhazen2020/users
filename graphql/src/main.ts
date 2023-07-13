import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cors = require('cors');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    '/graphql',
    cors({
      origin: [
        'http://localhost:4040',
        'http://localhost:3000',
        'https://studio.apollographql.com',
      ],
    }),
  );
  await app.listen(3000);
}
bootstrap();
