import { Injectable } from '@nestjs/common'

import { ValidateBankAccountOwnershipService } from '@/modules/bank-accounts/services/validate-bank-account-ownership.service'
import { ValidateTransactionCategoryOwnershipService } from '@/modules/transaction-categories/services/validate-transaction-category-ownership.service'
import { TransactionsRepository } from '@/shared/database/repositories/transactions.repositories'

import { CreateTransactionDto } from '../dto/create-transaction.dto'
import { UpdateTransactionDto } from '../dto/update-transaction.dto'
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service'

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateTransactionCategoryOwnershipService: ValidateTransactionCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, dto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = dto

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId })

    return this.transactionsRepo.create({
      data: {
        userId,
        transactionCategoryId: categoryId,
        bankAccountId,
        date,
        name,
        type,
        value,
      },
    })
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
      },
    })
  }

  async update(
    userId: string,
    transactionId: string,
    dto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } = dto

    await this.validateEntitiesOwnership({
      bankAccountId,
      categoryId,
      userId,
      transactionId,
    })

    return this.transactionsRepo.update({
      where: {
        id: transactionId,
      },
      data: {
        bankAccountId,
        transactionCategoryId: categoryId,
        date,
        name,
        type,
        value,
      },
    })
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId,
    })

    await this.transactionsRepo.delete({
      where: {
        id: transactionId,
      },
    })

    return null
  }

  private async validateEntitiesOwnership({
    bankAccountId,
    categoryId,
    userId,
    transactionId,
  }: {
    userId: string
    bankAccountId?: string
    categoryId?: string
    transactionId?: string
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateTransactionCategoryOwnershipService.validate(
          userId,
          categoryId,
        ),
    ])
  }
}
