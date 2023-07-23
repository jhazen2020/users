import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import cors = require('cors');
async function bootstrap() {
  const app =
    process.env.ENVIRONMENT === 'prod'
      ? await NestFactory.create(AppModule, {
          httpsOptions: {
            key: fs.readFileSync('./secrets/private_cert_key.key'),
            cert: fs.readFileSync('./secrets/public.crt'),
          },
        })
      : await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    '/graphql',
    cors({
      origin: [
        'http://localhost:4040',
        'http://localhost:3000',
        'https://studio.apollographql.com',
        'https://jessehazen.net:443',
        'http://jessehazen.net:80',
        'https://api.jessehazen.net:443',
        'http://api.jessehazen.net:80',
      ],
    }),
  );

  await app.listen(3000);
}
bootstrap();
