/* GLOBAL MODULES */
import { Injectable } from '@nestjs/common';
/* GUARDS */
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FOURTYTWOAuthGuard extends AuthGuard('42auth') {
	constructor() {
		super();
	}
}
