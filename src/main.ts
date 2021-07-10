import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { logger } from './logger/logger';
import { CustomExceptionFilter } from './filters/exception-filter';
import { LoggingInterceptor } from './interceptors/requestLogger.interceptor';

process.on('uncaughtException', (error: Error) => {
  logger.error('uncaughtException', {stack: JSON.stringify(error.stack)});
  setTimeout(() => process.exit(1), 1000);
}).on('unhandledRejection', (error: Error) => {
  logger.error('unhandledRejection', {stack: JSON.stringify(error.stack)});
  setTimeout(() => process.exit(1), 1000);
});

const start = async () => {
  const PORT = process.env['PORT'];
  const isFastify = process.env['USE_FASTIFY']
  try {
    let app: INestApplication;

    if (isFastify) {
      app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
      );
    } else {
      app = await NestFactory.create<NestExpressApplication>(AppModule);
    }

    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new CustomExceptionFilter());

    const config = new DocumentBuilder().setTitle('Express-REST-Service').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/doc', app, document);

    await app.listen(Number(PORT), () => console.log(`server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();