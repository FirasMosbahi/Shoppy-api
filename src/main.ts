import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  console.log(process.env.DB_PASSWORD);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5000);
}
dotenv.config();
console.log('configuring');
bootstrap();
