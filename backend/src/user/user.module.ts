import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [forwardRef(() => PrismaModule)],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
