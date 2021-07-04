import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

const start = async () => {
  const PORT = process.env['PORT'];
  const isFastify = process.env['USE_FASTIFY'];
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

    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder().setTitle('Express-REST-Service').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/doc', app, document);

    await app.listen(Number(PORT), () => console.log(`server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
