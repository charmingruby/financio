import { Injectable } from '@nestjs/common'

import { BankAccountsRepository } from '@/shared/database/repositories/bank-accounts.repositories'

import { CreateBankAccountDto } from '../dto/create-bank-account.dto'
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto'
import { ValidateBankAccountsOwnershipService } from './validate-bank-account-ownership.service'

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountsOwnershipService,
  ) {}

  create(userId: string, dto: CreateBankAccountDto) {
    return this.bankAccountsRepo.create({
      data: { ...dto, userId },
    })
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: { userId },
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
