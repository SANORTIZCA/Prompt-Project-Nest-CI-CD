import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Obtener el ConfigService
  const configService = app.get(ConfigService);
  // Activa la validación global
  app.useGlobalPipes(new ValidationPipe());

  // Usar Helmet aquí
  app.use(helmet());

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: [
          "'self'",
          'https://nestjs.com',
          'https://insomnia.rest',
          'https://raw.githubusercontent.com',
          'https://nodejs.org',
          'https://handlebarsjs.com',
          'https://www.debian.org',
          'https://upload.wikimedia.org',
          'https://github.githubassets.com',
          'https://prismalens.vercel.app/header/logo-white.svg',
        ],
      },
    }),
  );

  app.use(cookieParser());

  // Configurar el directorio de vistas y el motor de plantillas
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('hbs'); // Configura Handlebars como motor de plantillas

  // Habilitar el guard global
  // Obtener JwtService y Reflector
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(jwtService, reflector));

  // Acceder a la variable de entorno 'PORT'
  const port = configService.get<number>('PORT'); // Usar un valor predeterminado si no se encuentra la variable

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
