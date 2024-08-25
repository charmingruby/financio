import { Injectable } from '@nestjs/common'

import { TransactionsRepository } from '@/shared/database/repositories/transactions.repositories'

import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service'
import { ValidateTransactionCategoryOwnershipService } from '../transaction-categories/services/validate-transaction-category-ownership.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateTransactionCategoriesOwnershipService: ValidateTransactionCategoryOwnershipService,
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

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`
  }

  private async validateEntitiesOwnership({
    bankAccountId,
    categoryId,
    userId,
  }: {
    userId: string
    bankAccountId: string
    categoryId: string
  }) {
    Promise.all([
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateTransactionCategoriesOwnershipService.validate(
        userId,
        categoryId,
      ),
    ])
  }
}
