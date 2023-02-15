import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global() //Makes PrismaService available to all modules without needing to import
@Module({
	providers: [PrismaService],
	exports: [PrismaService], //needed so the modules accessing the PrismaModule have access to the PrismaService
})
export class PrismaModule {}
