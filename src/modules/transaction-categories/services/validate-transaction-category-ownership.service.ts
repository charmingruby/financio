import { Injectable, NotFoundException } from '@nestjs/common'

import { TransactionCategoriesRepository } from '@/shared/database/repositories/transaction-categories.repositories'

@Injectable()
export class ValidateTransactionCategoryOwnershipService {
  constructor(
    private readonly transactionCategoriesRepo: TransactionCategoriesRepository,
  ) {}

  async validate(userId: string, transactionCategoryId: string) {
    const isOwner = await this.transactionCategoriesRepo.findFirst({
      where: {
        id: transactionCategoryId,
        userId,
      },
    })

    if (!isOwner) {
      throw new NotFoundException('Transaction category not found.')
    }
  }
}
