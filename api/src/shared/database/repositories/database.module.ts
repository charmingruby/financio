import { Global, Module } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { TransactionCategoriesRepository } from './transaction-categories.repositories'
import { UsersRepository } from './users.repositories'

@Global()
@Module({
  exports: [UsersRepository, TransactionCategoriesRepository],
  providers: [PrismaService, UsersRepository, TransactionCategoriesRepository],
})
export class DatabaseModule {}
