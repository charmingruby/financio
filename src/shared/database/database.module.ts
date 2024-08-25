import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { BankAccountsRepository } from './repositories/bank-accounts.repositories'
import { TransactionCategoriesRepository } from './repositories/transaction-categories.repositories'
import { TransactionsRepository } from './repositories/transactions.repositories'
import { UsersRepository } from './repositories/users.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    TransactionCategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
  exports: [
    UsersRepository,
    TransactionCategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
})
export class DatabaseModule {}
