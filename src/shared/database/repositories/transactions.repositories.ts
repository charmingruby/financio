import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findFirst(dto: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(dto)
  }

  findMany(dto: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(dto)
  }

  create(dto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(dto)
  }

  update(dto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(dto)
  }

  delete(dto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(dto)
  }
}
