/* GLOBAL MODULES */
import { Injectable } from '@nestjs/common';
/* AUTH PassportStrategy */
import { PassportStrategy } from '@nestjs/passport';
/* AUTH JWT */
import { ExtractJwt, Strategy } from 'passport-jwt';



@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	/**
	 * JWT strategy object constructor
	 */
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		});
	}

}
