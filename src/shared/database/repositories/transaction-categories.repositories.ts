import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class TransactionCategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(dto: Prisma.TransactionCategoryFindManyArgs) {
    return this.prismaService.transactionCategory.findMany(dto)
  }

  findFirst(dto: Prisma.TransactionCategoryFindFirstArgs) {
    return this.prismaService.transactionCategory.findFirst(dto)
  }
}
