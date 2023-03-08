/**
 * AUTHENTICATION CONTROLLER
 */

/* GLOBAL MODULES */
import {
	Controller,
	Get,
	HttpCode,
	Logger,
	Post,
	Req,
	Res,
	UseFilters,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
/* CUSTOM DECORATORS */
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/decorators';
/* INTERFACE FOR 42 API */
import { Profile_42 } from './interfaces';
/* AUTH MODULES */
import { AuthService } from './auth.service';
import { FOURTYTWOAuthGuard } from './guard';
/* AUTH DTOs */
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedirectOnLogin } from './filter';
import {totp} from "otplib";

// AUTH CONTROLLER - /auth
@ApiTags('authentication')
@ApiHeader({
	name: 'Authorization',
	description: 'Jason Web Token as Bearer Token',
})
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		// private twoFAService: TwoFactorService,
	) {}

	logger = new Logger('Authentication');

	/**
	 * /logout - logout from API
	 * Deletes the refresh token from the database
	 */
	@Post('logout')
	@HttpCode(200)
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	logout(
		@GetCurrentUserId() userId: number,
		@GetCurrentUser('username') username: string,
	) {
		// LOG
		this.logger.log('User logout ' + username);
		return this.authService.signout(userId);
	}


	@Public()
	@UseGuards(FOURTYTWOAuthGuard)
	@Get('42')
	signin_42() {
		console.log('42 API signin');
	}

	/**
	 * 42 Callback endpoint
	 * Creates user or signin if user already exists
	 */
	@Public()
	@UseGuards(FOURTYTWOAuthGuard)
	@UseFilters(RedirectOnLogin)
	@Get('42/callback')
	async callback_42(@Req() request: any, @Res() response: Response) {
		// Generate token using API response
		const user = await this.authService.signin_42(
			request.user as Profile_42,
		);
		const { username, twoFA, id, email } = user;
		// LOG
		this.logger.log('42 API signin ' + username);

		return this.authService.signin_42_token(response, id, email, twoFA);
	}

	/**
	 * Testing basic /auth route
	 */
	@Public()
	@Get('/')
	test_auth() {
		return this.authService.test_route();
	}
}
