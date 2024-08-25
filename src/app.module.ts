import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AuthModule } from './modules/auth/auth.module'
import { AuthGuard } from './modules/auth/guards/auth.guard'
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module'
import { TransactionCategoriesModule } from './modules/transaction-categories/transaction-categories.module'
import { TransactionsModule } from './modules/transactions/transactions.module'
import { UsersModule } from './modules/users/users.module'
import { DatabaseModule } from './shared/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    TransactionCategoriesModule,
    BankAccountsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
