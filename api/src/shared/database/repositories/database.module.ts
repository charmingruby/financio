import { Global, Module } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { UsersRepository } from './users.repositories'

@Global()
@Module({
  exports: [UsersRepository],
  providers: [PrismaService, UsersRepository],
})
export class DatabaseModule {}
