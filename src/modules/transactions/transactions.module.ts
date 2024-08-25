import { Module } from '@nestjs/common'

import { BankAccountsModule } from '../bank-accounts/bank-accounts.module'
import { TransactionCategoriesModule } from '../transaction-categories/transaction-categories.module'
import { TransactionsService } from './services/transactions.service'
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service'
import { TransactionsController } from './transactions.controller'

@Module({
  imports: [BankAccountsModule, TransactionCategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnershipService],
})
export class TransactionsModule {}
