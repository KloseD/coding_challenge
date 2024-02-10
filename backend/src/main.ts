import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO
  // Add Swagger for documentation

  // WARNING - Security issue!
  // Only enabled for development purposes
  // https://docs.nestjs.com/security/cors
  app.enableCors();

  await app.listen(4000);
}
bootstrap();
