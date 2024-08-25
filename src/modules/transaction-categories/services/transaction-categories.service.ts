import { Injectable } from '@nestjs/common'

import { TransactionCategoriesRepository } from '@/shared/database/repositories/transaction-categories.repositories'

@Injectable()
export class TransactionCategoriesService {
  constructor(
    private readonly transactionCategoriesRepo: TransactionCategoriesRepository,
  ) {}

  findAllByUserId(userId: string) {
    return this.transactionCategoriesRepo.findMany({
      where: {
        userId,
      },
    })
  }
}
