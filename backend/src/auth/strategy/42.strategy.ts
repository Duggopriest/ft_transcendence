
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-42';
import { AuthService } from '../auth.service';

import { Profile_42 } from '../interfaces';

@Injectable()
export class FOURTYTWOStrategy extends PassportStrategy(Strategy, '42auth') {
	private readonly authService: AuthService;

	/**
	 * 42 API Auth strategy object constructor
	 */
	constructor(authService: AuthService) {
		super({
			clientID: process.env.FOURTYTWO_ID,
			clientSecret: process.env.FOURTYTWO_SECRET,
			callbackURL: process.env.FOURTYTWO_CALLBACK,
			profileFields: {
				id: 'id',
				username: 'login',
				email: 'email',
				avatar: 'image_url',
			},
		});
		this.authService = authService;
	}

	validate(accessToken: string, refreshToken: string, profile: Profile_42) {
		return profile;
	}
}
