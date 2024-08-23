import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { BankAccountsRepository } from './repositories/bank-accounts.repositories'
import { TransactionCategoriesRepository } from './repositories/transaction-categories.repositories'
import { UsersRepository } from './repositories/users.repositories'

@Global()
@Module({
  exports: [
    UsersRepository,
    TransactionCategoriesRepository,
    BankAccountsRepository,
  ],
  providers: [
    PrismaService,
    UsersRepository,
    TransactionCategoriesRepository,
    BankAccountsRepository,
  ],
})
export class DatabaseModule {}
