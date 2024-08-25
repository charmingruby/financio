import { Module } from '@nestjs/common'

import { BankAccountsModule } from '../bank-accounts/bank-accounts.module'
import { TransactionCategoriesModule } from '../transaction-categories/transaction-categories.module'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'

@Module({
  imports: [BankAccountsModule, TransactionCategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
