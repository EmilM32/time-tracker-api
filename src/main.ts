import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.getPort() || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
