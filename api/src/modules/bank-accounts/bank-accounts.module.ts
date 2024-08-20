import { Module } from '@nestjs/common'

import { BankAccountsController } from './bank-accounts.controller'
import { BankAccountsService } from './services/bank-accounts.service'
import { ValidateBankAccountsOwnershipService } from './services/validate-bank-account-ownership.service'

@Module({
  exports: [ValidateBankAccountsOwnershipService],
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountsOwnershipService],
})
export class BankAccountsModule {}
