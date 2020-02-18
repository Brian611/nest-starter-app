import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ValidationFilter } from './utils/filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('NestJS api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const port = parseInt(process.env.PORT, 10) || 3000;
  app.enableCors();
  await app.listen(port);
  Logger.log(process.env.NODE_ENV, 'Environment')
  Logger.log(`[App] running on port ${port}`);
}
bootstrap();
