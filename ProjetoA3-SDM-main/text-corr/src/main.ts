import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove dados que nao possuem decoradores no DTO
      forbidNonWhitelisted: true, // lança um erro quando recebidos dados extras
      transform: true, // transforma os objs de entrada para o tipo de obj do DTO
      exceptionFactory: (errors) =>
        new HttpException(
          {
            message: 'Entrada de dados invalida', // resposta de erro
            errors: errors,
          },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  const config = new DocumentBuilder()
  .setTitle('Swagger Pizzaria')
  .setDescription('API para gerenciamento de projetos')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();

