import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guard';
import { PrismaService } from './prisma/prisma.service';
import * as process from 'node:process';

/* Start the app */
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Swagger - OPENAPI
	const config = new DocumentBuilder()
		.setTitle('Transcendence API')
		.setDescription('API for the Transcendence 42 Project')
		.setVersion('0.1')
		.addTag('transcendence')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	// Setup Prisma
	app.get(PrismaService);

	// setup app to use validation pipe
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	// Enable CORS
	app.enableCors({
		origin: process.env.FRONT_URL,
	});


	// set JwtGuard as a global guard
	const reflector = new Reflector();
	app.useGlobalGuards(new JwtGuard(reflector));

	// start api to listen on port 4000
	await app.listen(process.env.BACK_PORT);
	// console.log(process.env);
}

bootstrap().then();
