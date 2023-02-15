import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
/* JASON WEB TOKEN AUTH MODULE */
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy, FOURTYTWOStrategy } from './strategy';
/* USER Module */
import { forwardRef } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { AppModule } from 'src/app.module';

@Module({
	imports: [
		JwtModule.register({}),
		forwardRef(() => AppModule),
		forwardRef(() => UserModule),
		// forwardRef(() => UploadModule),
		forwardRef(() => HttpModule),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		jwtStrategy,
		FOURTYTWOStrategy,
	],
	exports: [AuthService],
})
export class AuthModule {}
