import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NotFoundExceptionFilter } from './not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useStaticAssets(join(__dirname, '../', 'wkeeper-front', 'dist'));
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(3000);
}
bootstrap();
