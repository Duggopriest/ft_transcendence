/* GLOBAL MODULES */
import {BadRequestException, ForbiddenException, Injectable,} from '@nestjs/common';
import {plainToClass} from 'class-transformer';

/* PRISMA */
import {PrismaService} from 'src/prisma/prisma.service';
import {UserDto} from './dto';
import {User} from '@prisma/client';

/* USER Modules */

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
	) {}

	/*	CREATE	*/

	async createUser(
		email: string,
		username: string,
		id = 0,
	): Promise<User> {
		return this.prisma.user.create({
			data: {
				email,
				username,
				id42: id,
			},
		});
	}

	async getUser(id: number) {
		if (id === undefined) {
			throw new BadRequestException('Undefined user ID');
		}
		// console.log('id', id);
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: id,
				},
				rejectOnNotFound: true,
			});
			return plainToClass(UserDto, user);
		} catch (error) {
			throw new ForbiddenException('getUser error : ' + error);
		}
	}

	async getUserfromUsername(username: string) {
		// console.log('username : ', username);
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					username: username,
				},
				rejectOnNotFound: true,
			});
			return plainToClass(UserDto, user);
		} catch (error) {
			throw new ForbiddenException('getUser error : ' + error);
		}
	}


}

