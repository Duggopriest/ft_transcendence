import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Auth42Dto, AuthTokenDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { User } from '@prisma/client';

/**
 * AUTHENTIFICATION SERVICE
 */
@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		// private readonly uploadService: UploadService,
	) {}

	/* SIGNOUT */
	async signout(userId: number): Promise<void> {
		//sending status update to the frontend
		//todo update the user status
	}

	/* SIGNIN USING 42 API */
	async signin_42(dto: Auth42Dto): Promise<User> {
		// DTO
		const { id } = dto;
		// check if user exists
		const user = await this.prisma.user.findFirst({
			where: {
				id42: id,
			},
		});
		//sending status update to the frontend

		// if user does not exist, create it
		return user ?? this.create_42_user(dto);
	}

	async signin_42_token(
		@Res() response: Response,
		id: number,
		email: string,
	): Promise<Response> {
		// generate tokens
		const tokens = await this.signin_jwt(id, email);
		// generate URL for token
		const url = new URL(process.env.SITE_URL);
		url.port = process.env.FRONT_PORT;
		url.pathname = '/auth';
		url.searchParams.append('access_token', tokens['access_token']);
		// send response to frontend
		response.status(302).redirect(url.href);
		return response;
	}

	async create_42_user(dto: Auth42Dto): Promise<User> {
		// DTO
		const { id, email, username, avatar } = dto;
		const user = await this.userService.createUser(
			email,
			username,
			id
		);

		//todo save the avatar from 42
		return user;
	}

	/* JWT */

	/* GENERATE JASON WEB TOKENS */
	async signin_jwt(
		userId: number,
		email: string,
		is2FA = false,
	): Promise<AuthTokenDto> {
		// get login data
		const login_data = {
			sub: userId,
			email,
			is2FA,
		};
		// generate jwt secret
		const secret = process.env.JWT_SECRET;
		// Set expiration times
		const access_token_expiration = process.env.ACCESS_TOKEN_EXPIRATION;
		const refresh_token_expiration = process.env.REFRESH_TOKEN_EXPIRATION;

		// set Auth Token params
		const Atoken = await this.jwtService.signAsync(login_data, {
			expiresIn: access_token_expiration,
			secret: secret,
		});
		return {
			access_token: Atoken,
		};
	}


	// test route
	test_route() {
		return { msg: 'This route is functional' };
	}
}
