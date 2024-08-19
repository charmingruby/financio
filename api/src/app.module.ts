import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AuthModule } from './modules/auth/auth.module'
import { AuthGuard } from './modules/auth/guards/auth.guard'
import { TransactionCategoriesModule } from './modules/transaction-categories/transaction-categories.module'
import { UsersModule } from './modules/users/users.module'
import { DatabaseModule } from './shared/database/repositories/database.module'

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    TransactionCategoriesModule,
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
