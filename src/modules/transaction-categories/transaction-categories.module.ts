import { Module } from '@nestjs/common'

import { TransactionCategoriesService } from './services/transaction-categories.service'
import { ValidateTransactionCategoryOwnershipService } from './services/validate-transaction-category-ownership.service'
import { TransactionCategoriesController } from './transaction-categories.controller'

@Module({
  controllers: [TransactionCategoriesController],
  providers: [
    TransactionCategoriesService,
    ValidateTransactionCategoryOwnershipService,
  ],
  exports: [ValidateTransactionCategoryOwnershipService],
})
export class TransactionCategoriesModule {}
