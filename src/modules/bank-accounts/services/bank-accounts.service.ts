import { Injectable } from '@nestjs/common'

import { BankAccountsRepository } from '@/shared/database/repositories/bank-accounts.repositories'

import { CreateBankAccountDto } from '../dto/create-bank-account.dto'
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto'
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service'

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, dto: CreateBankAccountDto) {
    return this.bankAccountsRepo.create({
      data: { ...dto, userId },
    })
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    })

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, t) => acc + (t.type === 'EXPENSE' ? -t.value : t.value),
        0,
      )

      const currentBalance = bankAccount.initialBalance + totalTransactions

      return {
        ...bankAccount,
        currentBalance,
      }
    })
  }

  async update(
    userId: string,
    bankAccountId: string,
    dto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    )

    const { color, initialBalance, name, type } = dto

    return this.bankAccountsRepo.update({
      where: {
        id: bankAccountId,
      },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    })
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    )
    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId,
      },
    })

    return null
  }
}
