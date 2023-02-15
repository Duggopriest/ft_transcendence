import {Body, Controller, ForbiddenException, Get, Logger, Post,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {isNumber} from 'class-validator';
import {GetCurrentUserId} from 'src/decorators';
import {UserService} from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	logger = new Logger('UserController');

	@Get('me')
	getMe(@GetCurrentUserId() id: number) {
		this.logger.log('get current user');
		const userDto = this.userService.getUser(id);
		return userDto;
	}

	@Post('get_user')
	getUser(@Body('otherId') otherId: number | string) {
		this.logger.log('getUser by ID ' + otherId);
		try {
			if (isNumber(otherId)) {
				return this.userService.getUser(Number(otherId));
			} else {
				return this.userService.getUserfromUsername(
					String(otherId),
				);
			}
		} catch {
			throw new ForbiddenException('get_user error');
		}
	}

}
