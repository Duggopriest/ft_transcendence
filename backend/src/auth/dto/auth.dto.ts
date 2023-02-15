import {
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator';

export class AuthTokenDto {
	@IsString()
	@IsNotEmpty()
	access_token: string;
}

export class Auth42Dto {
	@IsNumber()
	@IsNotEmpty()
	id: number;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	avatar: string;
}