import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findFirst(dto: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(dto)
  }

  findMany<T extends Prisma.BankAccountFindManyArgs>(
    dto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>,
  ) {
    return this.prismaService.bankAccount.findMany<T>(dto)
  }

  create(dto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(dto)
  }

  update(dto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(dto)
  }

  delete(dto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(dto)
  }
}
