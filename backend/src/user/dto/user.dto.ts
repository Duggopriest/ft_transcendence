import { IsNotEmpty, IsString, IsNumber, MaxLength } from 'class-validator';

export class UserDto {
	//Data transfer object
	@IsNumber()
	@IsNotEmpty()
	id: number;

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(65_000)
	avatar: string;
}
